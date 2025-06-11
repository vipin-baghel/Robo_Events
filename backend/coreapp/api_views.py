from rest_framework import viewsets, generics, response, status, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Championship, Event, NewsUpdate, Team, TeamRank, SiteConfiguration, TeamMember, EventRegistration, Testimonial
from .serializers import (
    ChampionshipSerializer, EventListSerializer, EventDetailSerializer, NewsUpdateSerializer,
    TeamSerializer, TeamRankSerializer, SiteConfigurationSerializer,
    TeamRegistrationSerializer, EventRegistrationSerializer, TestimonialSerializer, PublicTestimonialSerializer
)
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

# Read-only ModelViewSets (for future use or admin)
class ChampionshipViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Championship.objects.all()
    serializer_class = ChampionshipSerializer

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'list':
            return EventListSerializer
        return EventDetailSerializer
    
    def get_queryset(self):
        if self.action == 'list':
            return self.queryset.only('id', 'name')
        return self.queryset

class NewsUpdateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NewsUpdate.objects.all()
    serializer_class = NewsUpdateSerializer

class TeamViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class TeamRankViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamRank.objects.all()
    serializer_class = TeamRankSerializer

class SiteConfigurationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteConfiguration.objects.all()
    serializer_class = SiteConfigurationSerializer


class RegisterTeamAPIView(APIView):
    permission_classes = []  # Open to all

    def post(self, request, *args, **kwargs):
        serializer = TeamRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            team = serializer.save()
            return response.Response(TeamRegistrationSerializer(team).data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventRegistrationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        team_id = request.data.get('team')
        event_id = request.data.get('event')
        if not team_id or not event_id:
            return response.Response({'detail': 'team and event are required.'}, status=status.HTTP_400_BAD_REQUEST)
        # Check user is a member of the team
        try:
            team_member = TeamMember.objects.get(user=user, team_id=team_id)
        except TeamMember.DoesNotExist:
            return response.Response({'detail': 'You are not a member of this team.'}, status=status.HTTP_403_FORBIDDEN)
        # Create event registration
        data = {'team': team_id, 'event': event_id}
        serializer = EventRegistrationSerializer(data=data)
        if serializer.is_valid():
            registration = serializer.save()
            return response.Response(EventRegistrationSerializer(registration).data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TestimonialViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing testimonials.
    """
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['event', 'is_approved', 'rating']
    search_fields = ['name', 'role', 'content']
    ordering_fields = ['created_at', 'rating']
    ordering = ['-created_at']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        This view should return a list of all testimonials for admins,
        but only approved ones for unauthenticated users.
        """
        queryset = super().get_queryset()
        if not self.request.user.is_staff:
            queryset = queryset.filter(is_approved=True)
        return queryset

    def get_serializer_class(self):
        """
        Use different serializers for list/retrieve vs create/update/delete
        """
        if self.action in ['list', 'retrieve']:
            return PublicTestimonialSerializer
        return TestimonialSerializer

    def perform_create(self, serializer):
        """
        Set the created_by field to the current user when creating a testimonial.
        """
        if self.request.user.is_authenticated:
            serializer.save(created_by=self.request.user)
        else:
            serializer.save()


