# Development Environment Setup

This guide will help you set up your local development environment for the Robo Events Platform.

## Prerequisites

- Docker and Docker Compose
- Node.js (v18 or later)
- Python (3.9+)
- PostgreSQL (if not using Docker)

## Local Setup with Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Robo_Events
   ```

2. Copy the example environment file:
   ```bash
   cp backend/.env.example backend/.env
   ```

3. Build and start the services:
   ```bash
   docker-compose up --build
   ```

4. Apply database migrations:
   ```bash
   docker-compose exec backend python manage.py migrate
   ```

5. Create a superuser (admin):
   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

## Manual Setup

### Backend Setup

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Set up environment variables in `.env` file.

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

### Frontend Setup

1. Install Node.js dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Common Development Tasks

- Run tests:
  ```bash
  # Backend tests
  docker-compose exec backend python manage.py test
  
  # Frontend tests
  cd frontend
  npm test
  ```

- Access services:
  - Frontend: http://localhost:3000
  - Backend API: http://localhost:8000
  - Admin interface: http://localhost:8000/admin

## Troubleshooting

- If you encounter port conflicts, check and update the ports in `docker-compose.yml`
- For database connection issues, verify your `.env` file settings
- Check logs using `docker-compose logs <service_name>`
