#!/bin/sh

# Create directory if it doesn't exist
mkdir -p /etc/nginx/ssl/

echo "Generating SSL configuration..."

# Check if Let's Encrypt certificate exists and is valid
if [ -f "/etc/letsencrypt/live/navyugam.com/fullchain.pem" ]; then
    echo "Using Let's Encrypt certificates"
    
    # Create Let's Encrypt SSL configuration
    cat > /etc/nginx/ssl/le-ssl.conf << 'EOL'
# Let's Encrypt SSL configuration
ssl_certificate /etc/letsencrypt/live/navyugam.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/navyugam.com/privkey.pem;
ssl_trusted_certificate /etc/letsencrypt/live/navyugam.com/chain.pem;

# Enable OCSP Stapling
ssl_stapling on;
ssl_stapling_verify on;
EOL

    # Copy certificates to persistent storage
    cp -f /etc/letsencrypt/live/navyugam.com/fullchain.pem /etc/nginx/ssl/ 2>/dev/null || true
    cp -f /etc/letsencrypt/live/navyugam.com/privkey.pem /etc/nginx/ssl/ 2>/dev/null || true
    cp -f /etc/letsencrypt/live/navyugam.com/chain.pem /etc/nginx/ssl/ 2>/dev/null || true
    
    echo "Let's Encrypt SSL configuration updated"
else
    echo "Using self-signed certificate"
    
    # Create self-signed certificate if it doesn't exist
    if [ ! -f "/etc/nginx/ssl/selfsigned.crt" ] || [ ! -f "/etc/nginx/ssl/selfsigned.key" ]; then
        echo "Generating new self-signed certificate..."
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout /etc/nginx/ssl/selfsigned.key \
            -out /etc/nginx/ssl/selfsigned.crt \
            -subj "/CN=navyugam.com"
    fi
    
    # Create self-signed SSL configuration
    cat > /etc/nginx/ssl/le-ssl.conf << 'EOL'
# Self-signed SSL configuration
ssl_certificate /etc/nginx/ssl/selfsigned.crt;
ssl_certificate_key /etc/nginx/ssl/selfsigned.key;

# Disable OCSP Stapling for self-signed
ssl_stapling off;
ssl_stapling_verify off;
EOL
    
    echo "Self-signed SSL configuration updated"
fi

# Set proper permissions
chmod 644 /etc/nginx/ssl/* 2>/dev/null || true
chmod 600 /etc/nginx/ssl/*.key 2>/dev/null || true
