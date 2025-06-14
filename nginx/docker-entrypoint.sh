#!/bin/sh
set -e

echo "Starting Nginx with SSL configuration..."

# Create necessary directories
mkdir -p /etc/letsencrypt/live/navyugam.com
mkdir -p /var/www/certbot
mkdir -p /etc/nginx/ssl

# Function to request Let's Encrypt certificate
request_certificate() {
    echo "Requesting new certificate from Let's Encrypt..."
    
    # First, start nginx in background to pass the HTTP-01 challenge
    nginx -g 'daemon on;'
    
    # Request the certificate
    if certbot certonly --webroot -w /var/www/certbot \
        --email bhanupratapsingh9188@gmail.com \
        --agree-tos \
        --no-eff-email \
        -d navyugam.com \
        -d www.navyugam.com \
        --force-renewal \
        --non-interactive; then
        
        echo "Certificate obtained successfully"
        return 0
    else
        echo "Failed to obtain certificate from Let's Encrypt"
        return 1
    fi
}

# Function to renew certificates
renew_certificates() {
    echo "Checking for certificate renewal..."
    
    # Renew certificates if they exist and are near expiry
    if certbot renew --quiet --no-self-upgrade; then
        echo "Certificates renewed successfully"
        return 0
    else
        echo "Certificate renewal failed"
        return 1
    fi
}

# Function to reload nginx
reload_nginx() {
    echo "Reloading nginx configuration..."
    nginx -s reload || true
}

# Main logic
if [ ! -f "/etc/letsencrypt/live/navyugam.com/fullchain.pem" ]; then
    # No certificate exists, try to get one
    if ! request_certificate; then
        echo "Using self-signed certificate"
    fi
else
    # Certificate exists, try to renew
    if ! renew_certificates; then
        echo "Using existing certificate"
    fi
fi

# Generate SSL configuration
echo "Generating SSL configuration..."
/generate-le-ssl.sh

# Ensure proper permissions
chown -R nginx:nginx /etc/nginx/ssl
chmod -R 755 /etc/nginx/ssl
chmod 640 /etc/nginx/ssl/*.key 2>/dev/null || true

# Start nginx in the foreground
echo "Starting Nginx..."
nginx -g 'daemon off;'

# Start Nginx
echo "Starting Nginx..."
exec nginx -g "daemon off;"
