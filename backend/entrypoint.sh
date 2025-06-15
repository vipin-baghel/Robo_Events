#!/bin/bash
set -e

# Load environment variables
set -a
source /app/.env || echo "Warning: .env file not found"
set +a

# Wait for the database to be ready
echo "Waiting for database..."
until nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  sleep 1
done

echo "Database is ready!"

# make migrations
python manage.py makemigrations

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate --noinput || {
    echo "Failed to run migrations"
    exit 1
}

# Create/update site domain
echo "Updating site domain..."
python manage.py shell << EOF
from django.contrib.sites.models import Site
site, created = Site.objects.get_or_create(pk=1)
site.domain = '$SITE_DOMAIN'
site.name = '$SITE_NAME'
site.save()
print(f"Site updated: {site.domain}")
EOF

# Create superuser if it doesn't exist
echo "Creating superuser if needed..."
if [ -z "$DJANGO_SUPERUSER_USERNAME" ] || [ -z "$DJANGO_SUPERUSER_EMAIL" ] || [ -z "$DJANGO_SUPERUSER_PASSWORD" ]; then
    echo "Warning: Superuser environment variables not set. Skipping superuser creation."
else
    python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='$DJANGO_SUPERUSER_USERNAME').exists() or User.objects.create_superuser('$DJANGO_SUPERUSER_USERNAME', '$DJANGO_SUPERUSER_EMAIL', '$DJANGO_SUPERUSER_PASSWORD')"
    echo "Superuser created/verified"
fi

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput || {
    echo "Warning: Failed to collect static files"
}

# Check if database is empty and load test data if needed
echo "Checking if database needs test data..."
if python manage.py shell -c "from coreapp.models import Championship; exit(0 if Championship.objects.exists() else 1)"; then
    echo "Database has data, skipping test data loading"
else
    echo "Loading test data..."
    python manage.py load_test_data || {
        echo "Warning: Failed to load test data"
    }
fi

# python manage.py runserver 0.0.0.0:8000

# Start Gunicorn
echo "Starting Gunicorn..."
exec gunicorn project.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --log-level=info \
    --access-logfile - \
    --error-logfile -