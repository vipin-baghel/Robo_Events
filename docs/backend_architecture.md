# Backend Architecture

This document outlines the architecture and design patterns used in the Robo Events Platform backend.

## Technology Stack

- **Framework**: Django 5.1.3
- **Language**: Python 3.10+
- **Database**: PostgreSQL 14+
- **API**: Django REST Framework (DRF)
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Caching**: Redis
- **Task Queue**: Celery
- **Search**: Django Haystack with Elasticsearch
- **Storage**: AWS S3 (via django-storages)
- **Monitoring**: Sentry
- **Documentation**: DRF Spectacular (OpenAPI 3.0)
- **Testing**: pytest-django, factory_boy

## Project Structure

```
backend/
├── core/                      # Core application
│   ├── __init__.py
│   ├── admin.py               # Admin site configuration
│   ├── apps.py                # App config
│   ├── models/                # Data models
│   │   ├── __init__.py
│   │   ├── base.py            # Abstract base models
│   │   ├── user.py            # User model
│   │   ├── event.py           # Event model
│   │   └── ...
│   ├── serializers/          # DRF serializers
│   ├── services/              # Business logic
│   ├── tasks.py               # Celery tasks
│   ├── tests/                 # Tests
│   ├── urls.py                # URL routing
│   └── views/                 # View classes
│       ├── __init__.py
│       ├── auth.py
│       ├── event.py
│       └── ...
├── config/                    # Project configuration
│   ├── __init__.py
│   ├── asgi.py
│   ├── celery.py
│   ├── settings/
│   │   ├── __init__.py
│   │   ├── base.py           # Base settings
│   │   ├── development.py    # Development settings
│   │   ├── production.py     # Production settings
│   │   └── test.py          # Test settings
│   ├── urls.py
│   └── wsgi.py
└── manage.py
```

## Key Components

### 1. Models

#### Base Model
```python
# core/models/base.py
from django.db import models
from django.utils import timezone

class BaseModel(models.Model):
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True
        ordering = ['-created_at']
```

#### Example Model
```python
# core/models/event.py
from django.db import models
from core.models.base import BaseModel

class Event(BaseModel):
    class EventStatus(models.TextChoices):
        DRAFT = 'draft', 'Draft'
        PUBLISHED = 'published', 'Published'
        CANCELLED = 'cancelled', 'Cancelled'
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    location = models.CharField(max_length=255)
    max_participants = models.PositiveIntegerField()
    status = models.CharField(
        max_length=20,
        choices=EventStatus.choices,
        default=EventStatus.DRAFT
    )
    created_by = models.ForeignKey(
        'User',
        on_delete=models.PROTECT,
        related_name='created_events'
    )
    
    def __str__(self):
        return self.title
    
    @property
    def is_upcoming(self):
        return self.start_date > timezone.now()
    
    class Meta:
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['start_date']),
        ]
```

### 2. Serializers

```python
# core/serializers/event.py
from rest_framework import serializers
from core.models import Event

class EventSerializer(serializers.ModelSerializer):
    is_upcoming = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'start_date', 'end_date',
            'location', 'max_participants', 'status', 'is_upcoming',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at', 'created_by']
    
    def validate(self, data):
        if data['start_date'] >= data['end_date']:
            raise serializers.ValidationError(
                "End date must be after start date"
            )
        return data
```

### 3. Views

#### ViewSet Example
```python
# core/views/event.py
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from core.models import Event
from core.serializers import EventSerializer
from core.permissions import IsOwnerOrReadOnly

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by status
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
            
        # Filter by date range
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        if start_date and end_date:
            queryset = queryset.filter(
                start_date__gte=start_date,
                end_date__lte=end_date
            )
            
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    @action(detail=True, methods=['post'])
    def register(self, request, pk=None):
        event = self.get_object()
        # Registration logic here
        return Response({"status": "registered"})
```

### 4. Services

Business logic is separated into service classes:

```python
# core/services/event_service.py
from django.utils import timezone
from django.db import transaction
from core.models import Event, EventRegistration

class EventService:
    @staticmethod
    def create_event(created_by, **data):
        """Create a new event with validation."""
        if data['start_date'] > data['end_date']:
            raise ValueError("End date must be after start date")
            
        return Event.objects.create(created_by=created_by, **data)
    
    @staticmethod
    def register_for_event(event_id, user):
        """Register a user for an event."""
        with transaction.atomic():
            event = Event.objects.select_for_update().get(id=event_id)
            
            # Check capacity
            current_registrations = event.registrations.count()
            if current_registrations >= event.max_participants:
                raise ValueError("Event is at capacity")
                
            # Check if already registered
            if event.registrations.filter(user=user).exists():
                raise ValueError("Already registered for this event")
                
            return EventRegistration.objects.create(
                event=event,
                user=user,
                registered_at=timezone.now()
            )
```

### 5. Authentication

#### JWT Authentication
```python
# config/settings/base.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}
```

#### Custom Permissions
```python
# core/permissions.py
from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
            
        # Write permissions are only allowed to the owner
        return obj.created_by == request.user
```

## API Documentation

### API Endpoints

#### Events

- `GET /api/events/` - List all events
  - Query Params:
    - `status`: Filter by status (draft, published, cancelled)
    - `start_date`: Filter events after this date
    - `end_date`: Filter events before this date
    
- `POST /api/events/` - Create a new event
  - Required Fields: `title`, `description`, `start_date`, `end_date`, `location`, `max_participants`
  
- `GET /api/events/{id}/` - Retrieve an event
- `PUT /api/events/{id}/` - Update an event
- `DELETE /api/events/{id}/` - Delete an event
- `POST /api/events/{id}/register/` - Register for an event

#### Authentication

- `POST /api/auth/login/` - Obtain JWT token
  - Required Fields: `username`, `password`
  
- `POST /api/auth/refresh/` - Refresh JWT token
  - Required Fields: `refresh`
  
- `POST /api/auth/register/` - Register a new user
  - Required Fields: `username`, `email`, `password`, `password_confirm`

### Error Responses

#### 400 Bad Request
```json
{
  "error": "Validation Error",
  "details": {
    "field_name": [
      "This field is required."
    ]
  }
}
```

#### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

#### 403 Forbidden
```json
{
  "detail": "You do not have permission to perform this action."
}
```

#### 404 Not Found
```json
{
  "detail": "Not found."
}
```

## Testing

### Unit Tests

```python
# core/tests/test_models.py
from django.test import TestCase
from django.utils import timezone
from core.models import Event
from core.factories import UserFactory

class EventModelTest(TestCase):
    def setUp(self):
        self.user = UserFactory()
        self.event = Event.objects.create(
            title="Test Event",
            description="Test Description",
            start_date=timezone.now(),
            end_date=timezone.now() + timezone.timedelta(days=1),
            location="Test Location",
            max_participants=10,
            created_by=self.user
        )
    
    def test_event_creation(self):
        self.assertEqual(str(self.event), "Test Event")
        self.assertEqual(self.event.status, "draft")
    
    def test_is_upcoming_property(self):
        self.assertTrue(self.event.is_upcoming)
```

### API Tests

```python
# core/tests/test_views.py
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from core.factories import UserFactory, EventFactory

class EventAPITest(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.client.force_authenticate(user=self.user)
        self.event = EventFactory(created_by=self.user)
    
    def test_list_events(self):
        url = reverse('event-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
    
    def test_create_event(self):
        url = reverse('event-list')
        data = {
            'title': 'New Event',
            'description': 'New Event Description',
            'start_date': '2025-07-01T10:00:00Z',
            'end_date': '2025-07-02T18:00:00Z',
            'location': 'Test Location',
            'max_participants': 50,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Event.objects.count(), 2)
```

## Performance Optimization

### Database Optimization

1. **Select Related**
   ```python
   # Bad: N+1 query problem
   events = Event.objects.all()
   for event in events:
       print(event.created_by.username)  # New query for each event
   
   # Good: Use select_related
   events = Event.objects.select_related('created_by').all()
   ```

2. **Prefetch Related**
   ```python
   # Bad: N+1 query problem for many-to-many
   events = Event.objects.all()
   for event in events:
       print(event.participants.all())  # New query for each event
   
   # Good: Use prefetch_related
   events = Event.objects.prefetch_related('participants').all()
   ```

### Caching

1. **View Caching**
   ```python
   from django.views.decorators.cache import cache_page
   from rest_framework.decorators import api_view
   
   @api_view(['GET'])
   @cache_page(60 * 15)  # Cache for 15 minutes
   def event_list(request):
       events = Event.objects.all()
       serializer = EventSerializer(events, many=True)
       return Response(serializer.data)
   ```

2. **Template Fragment Caching**
   ```html
   {% load cache %}
   {% cache 300 event_details event.id %}
       <div class="event">
           <h2>{{ event.title }}</h2>
           <p>{{ event.description }}</p>
       </div>
   {% endcache %}
   ```

## Security

### 1. Input Validation
- Use Django forms and DRF serializers for input validation
- Sanitize all user inputs
- Use parameterized queries to prevent SQL injection

### 2. Authentication & Authorization
- Use JWT with secure settings
- Implement proper permission classes
- Rate limiting for authentication endpoints

### 3. CORS & CSRF
- Configure CORS properly
- Use CSRF protection for session-based authentication
- Set secure flags on cookies

### 4. Security Headers
```python
# config/settings/production.py
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

## Monitoring & Logging

### Logging Configuration
```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'debug.log',
        },
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': True,
        },
        'core': {
            'handlers': ['file', 'console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}
```

### Error Tracking with Sentry
```python
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn=os.getenv('SENTRY_DSN'),
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
    send_default_pii=True
)
```

## Deployment

### Docker

```dockerfile
# Dockerfile
FROM python:3.10-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc python3-dev && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
```

### Environment Variables

```env
# .env
DEBUG=0
SECRET_KEY=your-secret-key
DATABASE_URL=postgres://user:password@db:5432/dbname
ALLOWED_HOSTS=.yourdomain.com,localhost
CORS_ALLOWED_ORIGINS=https://yourdomain.com,http://localhost:3000
```

### Health Check Endpoint

```python
# core/views/health.py
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import connection

class HealthCheck(APIView):
    authentication_classes = []
    permission_classes = []
    
    def get(self, request):
        try:
            # Check database connection
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                cursor.fetchone()
                
            return Response({
                'status': 'healthy',
                'timestamp': timezone.now().isoformat(),
                'database': 'connected'
            })
        except Exception as e:
            return Response(
                {'status': 'unhealthy', 'error': str(e)},
                status=500
            )
```

## Scaling Considerations

### 1. Database
- Use read replicas for read-heavy operations
- Implement database sharding if needed
- Regular maintenance (VACUUM, ANALYZE)

### 2. Caching Layer
- Redis for caching
- Cache invalidation strategy

### 3. Background Tasks
- Use Celery for long-running tasks
- Rate limiting for external API calls

### 4. Static & Media Files
- Use CDN for static and media files
- Configure proper cache headers

## Future Improvements

1. Implement GraphQL API
2. Add WebSocket support for real-time updates
3. Implement API versioning
4. Add rate limiting
5. Implement feature flags
6. Add more comprehensive monitoring
7. Implement A/B testing framework
