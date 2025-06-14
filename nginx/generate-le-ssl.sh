#!/bin/sh

# Create directory if it doesn't exist
mkdir -p /etc/nginx/ssl/

echo "Generating SSL configuration..."

# Check if Let's Encrypt certificate exists and is valid
if [ -f "/etc/letsencrypt/live/navyugam.com/fullchain.pem" ]; then
    echo "Using Let's Encrypt certificates"
    
    # Create Let's Encrypt SSL configuration
    echo "Creating Let's Encrypt SSL configuration..."
    
    # Create a combined certificate chain file if it doesn't exist
    if [ ! -f "/etc/letsencrypt/live/navyugam.com/chain.pem" ]; then
        echo "Creating missing chain.pem file..."
        # Extract the chain from fullchain.pem (everything except the first certificate)
        openssl x509 -in /etc/letsencrypt/live/navyugam.com/fullchain.pem -outform PEM | \
            grep -A 1000 'BEGIN CERTIFICATE' | \
            tail -n +2 | \
            grep -B 1000 'END CERTIFICATE' > /etc/letsencrypt/live/navyugam.com/chain.pem
    fi

    # Create the SSL configuration
    cat > /etc/nginx/ssl/le-ssl.conf << 'EOL'
# Let's Encrypt SSL configuration
ssl_certificate /etc/letsencrypt/live/navyugam.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/navyugam.com/privkey.pem;

# OCSP Stapling configuration
ssl_stapling on;
ssl_stapling_verify on;

# Use the chain file if it exists, otherwise use fullchain.pem
ssl_trusted_certificate /etc/letsencrypt/live/navyugam.com/chain.pem;

# DNS resolvers for OCSP
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;

# SSL session settings
ssl_session_timeout 1d;
ssl_session_cache shared:SSL:50m;
ssl_session_tickets off;

# Modern configuration
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;

# HSTS (uncomment after testing)
# add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
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
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;
EOL
    
    echo "Self-signed SSL configuration updated"
fi

# Set proper permissions
chmod 644 /etc/nginx/ssl/* 2>/dev/null || true
chmod 600 /etc/nginx/ssl/*.key 2>/dev/null || true
