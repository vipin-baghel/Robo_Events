# Deployment Guide

This document outlines the steps to deploy the Robo Events Platform to production.

## Prerequisites

- Docker and Docker Compose installed on the server
- Domain name configured with DNS settings
- SSL certificate (recommended)
- SMTP server for email notifications

## Server Requirements

- Minimum:
  - 2 CPU cores
  - 4GB RAM
  - 20GB disk space
- Recommended:
  - 4+ CPU cores
  - 8GB+ RAM
  - 50GB+ disk space (SSD recommended)

## Production Deployment Steps

1. **Server Setup**
   ```bash
   # Update system packages
   sudo apt update && sudo apt upgrade -y
   
   # Install Docker and Docker Compose
   sudo apt install -y docker.io docker-compose
   
   # Add your user to the docker group
   sudo usermod -aG docker $USER
   ```

2. **Configure Environment**
   ```bash
   # Copy production environment file
   cp .env.production .env
   
   # Update environment variables for production
   # Important variables to set:
   # - SECRET_KEY
   # - DEBUG=False
   # - ALLOWED_HOSTS
   # - DATABASE_URL
   # - EMAIL_* settings
   # - CORS_ALLOWED_ORIGINS
   ```

3. **Start Services**
   ```bash
   # Build and start containers in detached mode
   docker-compose -f docker-compose.prod.yml up -d --build
   
   # Run database migrations
   docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate
   
   # Collect static files
   docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput
   ```

4. **Set Up SSL (Recommended)**
   ```bash
   # Install Certbot
   sudo apt install -y certbot python3-certbot-nginx
   
   # Obtain SSL certificate
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

## CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automates:
- Running tests
- Building Docker images
- Deploying to production

## Backup and Recovery

### Database Backups

```bash
# Create a database backup
docker-compose -f docker-compose.prod.yml exec db pg_dump -U robouser robodb > backup_$(date +%Y%m%d).sql

# Restore from backup
cat backup_20230608.sql | docker-compose -f docker-compose.prod.yml exec -T db psql -U robouser robodb
```

### Media Files Backup

```bash
# Backup media files
tar -czvf media_backup_$(date +%Y%m%d).tar.gz /path/to/media

# Restore media files
tar -xzvf media_backup_20230608.tar.gz -C /path/to/restore
```

## Monitoring and Maintenance

- **Logs**: View logs with `docker-compose -f docker-compose.prod.yml logs -f`
- **Updates**: Regularly update dependencies and rebuild containers
- **Monitoring**: Set up monitoring for disk space, memory, and CPU usage

## Scaling

For higher traffic, consider:
1. Increasing container resources
2. Setting up a load balancer
3. Using a managed database service
4. Implementing caching with Redis

## Rollback Procedure

1. Stop the current deployment:
   ```bash
   docker-compose -f docker-compose.prod.yml down
   ```

2. Checkout the previous version:
   ```bash
   git checkout <previous-commit-hash>
   ```

3. Restart services:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d --build
   ```
