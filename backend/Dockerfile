# Use official Python image
FROM python:3.13-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    python3-dev \
    netcat-openbsd \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip \
    && pip install -r requirements.txt \
    && pip install gunicorn

# Create app user
ARG UID=1000
ARG GID=1000

RUN groupadd -g $GID appuser && \
    useradd -u $UID -g $GID -m appuser && \
    mkdir -p /app/media /app/staticfiles && \
    chown -R $UID:$GID /app

# Copy project
COPY --chown=$UID:$GID . /app/

# Set up entrypoint
COPY --chown=$UID:$GID entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Switch to appuser
USER appuser

# Create necessary directories with correct permissions at runtime
RUN mkdir -p /app/media/banner_videos && \
    chmod -R 755 /app/media

EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]
