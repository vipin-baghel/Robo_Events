#!/bin/sh
set -e

echo "Starting Nginx with SSL configuration..."

# Function to check if certbot is installed
certbot_installed() {
    command -v certbot > /dev/null 2>&1
}

# Function to validate certificate
validate_certificate() {
    local cert_file="$1"
    if [ ! -f "$cert_file" ]; then
        echo "Certificate file not found: $cert_file"
        return 1
    fi
    
    # Check if certificate is valid and not expired
    if ! openssl x509 -checkend 86400 -noout -in "$cert_file" 2>/dev/null; then
        echo "Certificate is expired or will expire within 24 hours: $cert_file"
        return 1
    fi
    
    echo "Certificate is valid: $cert_file"
    return 0
}

# Function to request certificates
request_certificates() {
    echo "Requesting Let's Encrypt certificates..."
    
    # Stop any running nginx
    if pgrep "nginx" > /dev/null; then
        nginx -s stop
        sleep 2
    fi
    
    # Create necessary directories
    mkdir -p /var/www/certbot
    
    # Start temporary nginx for HTTP-01 challenge
    echo "Starting temporary nginx for HTTP-01 challenge..."
    nginx -c /etc/nginx/nginx.conf
    
    # Request certificates
    echo "Running certbot to obtain certificates..."
    if certbot certonly --webroot -w /var/www/certbot \
        --email bhanupratapsingh9188@gmail.com \
        --agree-tos \
        --no-eff-email \
        --non-interactive \
        --keep-until-expiring \
        --preferred-challenges http \
        -d navyugam.com \
        -d www.navyugam.com; then
        echo "Certificates obtained successfully!"
        # Stop temporary nginx
        nginx -s stop
        return 0
    else
        echo "Failed to obtain certificates. Will use self-signed certificates."
        nginx -s stop
        return 1
    fi
}

# Function to renew certificates
renew_certificates() {
    echo "Checking for certificate renewal..."
    if certbot renew --quiet --no-self-upgrade --non-interactive; then
        echo "Certificates renewed successfully"
        return 0
    else
        echo "Certificate renewal failed"
        return 1
    fi
}

# Function to start nginx with SSL configuration
start_nginx() {
    echo "Generating SSL configuration..."
    /generate-le-ssl.sh
    
    # Test nginx configuration
    echo "Testing nginx configuration..."
    if ! nginx -t; then
        echo "ERROR: Invalid nginx configuration. Exiting."
        exit 1
    fi
    
    echo "Starting Nginx with SSL configuration..."
    exec nginx -g 'daemon off;'
}

# Main execution
if [ "$1" = "nginx" ]; then
    # Create necessary directories
    mkdir -p /etc/letsencrypt/live/navyugam.com \
             /etc/nginx/ssl \
             /var/www/certbot \
             /var/log/nginx
    
    # Set proper permissions
    chown -R nginx:nginx /etc/letsencrypt /var/www/certbot /etc/nginx/ssl /var/log/nginx
    chmod -R 755 /etc/letsencrypt /var/www/certbot /etc/nginx/ssl /var/log/nginx
    
    # Check if we have valid certificates
    if [ -f "/etc/letsencrypt/live/navyugam.com/fullchain.pem" ]; then
        echo "Existing Let's Encrypt certificates found."
        
        # Validate certificates
        if validate_certificate "/etc/letsencrypt/live/navyugam.com/fullchain.pem"; then
            # Try to renew if needed
            if ! renew_certificates; then
                echo "Certificate renewal failed, using existing certificates"
            fi
        else
            echo "Invalid or expired certificates found, requesting new ones..."
            if ! request_certificates; then
                echo "Falling back to self-signed certificates"
            fi
        fi
    else
        echo "No Let's Encrypt certificates found, requesting new ones..."
        if ! request_certificates; then
            echo "Falling back to self-signed certificates"
        fi
    fi
    
    # Start nginx with the final configuration
    start_nginx
else
    exec "$@"
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
