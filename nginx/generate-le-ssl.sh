#!/bin/sh

# Create directory if it doesn't exist
mkdir -p /etc/nginx/ssl/

# Check if Let's Encrypt certificate exists
if [ -f "/etc/letsencrypt/live/navyugam.com/fullchain.pem" ]; then
    # Create a configuration file with Let's Encrypt certificates
    cat > /etc/nginx/ssl/le-ssl.conf << 'EOL'
# Let's Encrypt SSL configuration
ssl_certificate /etc/letsencrypt/live/navyugam.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/navyugam.com/privkey.pem;

# Enable OCSP Stapling
ssl_stapling on;
ssl_stapling_verify on;
ssl_trusted_certificate /etc/letsencrypt/live/navyugam.com/chain.pem;
EOL
    
    # Copy certificates to persistent storage
    cp /etc/letsencrypt/live/navyugam.com/fullchain.pem /etc/nginx/ssl/
    cp /etc/letsencrypt/live/navyugam.com/privkey.pem /etc/nginx/ssl/
    cp /etc/letsencrypt/live/navyugam.com/chain.pem /etc/nginx/ssl/
    
    echo "Let's Encrypt SSL configuration updated"
else
    # Create an empty file if no Let's Encrypt certs
    echo "" > /etc/nginx/ssl/le-ssl.conf
    echo "Using self-signed certificate"
fi
