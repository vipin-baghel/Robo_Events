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

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate --noinput || {
    echo "Failed to run migrations"
    exit 1
}

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

# python manage.py runserver 0.0.0.0:8000

# Start Gunicorn
echo "Starting Gunicorn..."
exec gunicorn project.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --log-level=info \
    --access-logfile - \
    --error-logfile -