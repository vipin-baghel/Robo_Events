# Robo Events Platform

A modern web platform for robotics events management and community engagement.

## Overview

This is a full-stack web application that provides a comprehensive platform for managing robotics competitions, events, and community engagement. It features a modern, responsive frontend built with Next.js and a robust backend powered by Django.

## Features

- **Event Management**
  - Browse and register for robotics events
  - View event schedules and details
  - Event registration system

- **Team Management**
  - Team registration and management
  - Team ranking system
  - Points tracking

- **News & Updates**
  - Latest news and announcements
  - Featured updates
  - Event highlights

- **Community Features**
  - User authentication
  - Team profiles
  - Event participation tracking

## Tech Stack

### Frontend
- Next.js 15.3.2
- React 19
- TailwindCSS for styling
- TypeScript for type safety
- SWR for data fetching
- Radix UI components

### Backend
- Django 5.1.3
- PostgreSQL database
- RESTful API with Django REST Framework
- CORS support for frontend integration

## Project Structure

```
Robo_Events/
├── backend/              # Django backend
│   ├── coreapp/         # Main application
│   │   ├── models.py    # Database models
│   │   ├── views.py     # API views
│   │   └── serializers.py   # API serializers
│   ├── project/         # Django project settings
│   └── manage.py        # Django management script
├── frontend/            # Next.js frontend
│   ├── src/             # Source code
│   │   ├── app/         # Next.js app directory
│   │   └── components/  # React components
│   └── package.json     # Frontend dependencies
├── docker-compose.yml   # Docker configuration
└── docs/               # Documentation
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (for frontend development)
- Python 3.8+ (for backend development)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd Robo_Events
```

2. Start the development environment using Docker:
```bash
docker-compose up --build
```

3. Access the application:
- Frontend: http://localhost
- Backend API: http://localhost/api
- Admin panel: http://localhost/admin

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Backend Environment Variables
# Django settings
SECRET_KEY=your-very-strong-secret-key
DEBUG=True
ALLOWED_HOSTS=*

# PostgreSQL settings (must match your docker-compose.yml)
POSTGRES_DB=robodb
POSTGRES_USER=robouser
POSTGRES_PASSWORD=POSTGRES123
POSTGRES_HOST=db
POSTGRES_PORT=5432

# Frontend CORS/CSRF settings
CORS_ALLOWED_ORIGINS=https://localhost.com
CSRF_TRUSTED_ORIGINS=https://localhost.com

# Superuser settings
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=admin@example.com
DJANGO_SUPERUSER_PASSWORD=admin
```
Create a `.env` file in the frontend directory with the following variables:

```env
# Frontend Environment Variables
NEXT_PUBLIC_API_BASE_URL=http://localhost/api/
NEXT_PUBLIC_MEDIA_BASE_URL=http://localhost/media/
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```


## Reverse Proxy Setup

The project uses Nginx as a reverse proxy to handle SSL termination and route requests to the appropriate services.

### Nginx Configuration

The Nginx configuration is located in the `nginx` directory and includes:

- SSL configuration for secure connections
- Load balancing between frontend and backend services
- Caching for static files
- Rate limiting for API endpoints
- Security headers for enhanced protection

### SSL Certificates

The project supports SSL/TLS encryption using Let's Encrypt certificates. The certificates are automatically managed through Docker Compose.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- Thanks to all contributors and users who have helped shape this project
- Special thanks to the open-source community for the tools and libraries used in this project

## Contact

For any questions or inquiries, please contact:
- Email: [vipinbaghel1999@gmail.com](mailto:vipinbaghel1999@gmail.com)
- GitHub: [vipin-baghel](https://github.com/vipin-baghel)
- LinkedIn: [vipinbaghel1999](https://www.linkedin.com/in/vipinbaghel1999/)



