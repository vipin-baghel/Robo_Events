#!/bin/sh

# Create directories if they don't exist
mkdir -p /etc/letsencrypt/live/navyugam.com
mkdir -p /var/www/certbot

# Request certificate if it doesn't exist
if [ ! -f "/etc/letsencrypt/live/navyugam.com/fullchain.pem" ]; then
  echo "Requesting new certificate..."
  
  # Try to get a certificate from Let's Encrypt
  certbot certonly --webroot -w /var/www/certbot \
    --email bhanupratapsingh9188@gmail.com \
    --agree-tos \
    --no-eff-email \
    -d navyugam.com \
    -d www.navyugam.com \
    --force-renewal \
    --non-interactive || true
  
  # Copy certificates to persistent storage if they exist
  if [ -f "/etc/letsencrypt/live/navyugam.com/fullchain.pem" ]; then
    echo "Certificate obtained successfully"
    cp /etc/letsencrypt/live/navyugam.com/fullchain.pem /etc/nginx/ssl/
    cp /etc/letsencrypt/live/navyugam.com/privkey.pem /etc/nginx/ssl/
  else
    echo "Using self-signed certificate"
    # Use self-signed certificate if Let's Encrypt fails
    cp /etc/nginx/ssl/selfsigned.crt /etc/letsencrypt/live/navyugam.com/fullchain.pem
    cp /etc/nginx/ssl/selfsigned.key /etc/letsencrypt/live/navyugam.com/privkey.pem
  fi
else
  echo "Certificate exists, attempting renewal..."
  # Try to renew existing certificate
  certbot renew --quiet --no-self-upgrade --deploy-hook "\
    cp /etc/letsencrypt/live/navyugam.com/fullchain.pem /etc/nginx/ssl/ && \
    cp /etc/letsencrypt/live/navyugam.com/privkey.pem /etc/nginx/ssl/" || true
  
  # Ensure we have valid certificates after renewal attempt
  if [ ! -f "/etc/letsencrypt/live/navyugam.com/fullchain.pem" ]; then
    echo "Renewal failed, using self-signed certificate"
    cp /etc/nginx/ssl/selfsigned.crt /etc/letsencrypt/live/navyugam.com/fullchain.pem
    cp /etc/nginx/ssl/selfsigned.key /etc/letsencrypt/live/navyugam.com/privkey.pem
  fi
fi

# Start Nginx
echo "Starting Nginx..."
exec nginx -g "daemon off;"
