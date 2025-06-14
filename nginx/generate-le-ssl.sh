#!/bin/sh

# Create directory if it doesn't exist
mkdir -p /etc/nginx/ssl/

# Check if Let's Encrypt certificate exists
if [ -f "/etc/letsencrypt/live/navyugam.com/fullchain.pem" ]; then
    # Start creating the SSL configuration
    echo "# Let's Encrypt SSL configuration" > /etc/nginx/ssl/le-ssl.conf
    
    # Use fullchain.pem which includes all necessary certificates
    echo "ssl_certificate /etc/letsencrypt/live/navyugam.com/fullchain.pem;" >> /etc/nginx/ssl/le-ssl.conf
    echo "ssl_certificate_key /etc/letsencrypt/live/navyugam.com/privkey.pem;" >> /etc/nginx/ssl/le-ssl.conf
    
    # Add intermediate certificate
    echo "" >> /etc/nginx/ssl/le-ssl.conf
    echo "# Trusted certificate chain" >> /etc/nginx/ssl/le-ssl.conf
    echo "ssl_trusted_certificate /etc/letsencrypt/live/navyugam.com/chain.pem;" >> /etc/nginx/ssl/le-ssl.conf
    
    # OCSP Stapling configuration
    echo "" >> /etc/nginx/ssl/le-ssl.conf
    echo "# Enable OCSP Stapling" >> /etc/nginx/ssl/le-ssl.conf
    echo "ssl_stapling on;" >> /etc/nginx/ssl/le-ssl.conf
    echo "ssl_stapling_verify on;" >> /etc/nginx/ssl/le-ssl.conf
    
    # Copy certificates to persistent storage if they exist
    cp /etc/letsencrypt/live/navyugam.com/fullchain.pem /etc/nginx/ssl/
    cp /etc/letsencrypt/live/navyugam.com/privkey.pem /etc/nginx/ssl/
    
    # Only copy chain.pem if it exists
    if [ -f "/etc/letsencrypt/live/navyugam.com/chain.pem" ]; then
        cp /etc/letsencrypt/live/navyugam.com/chain.pem /etc/nginx/ssl/
    fi
    
    echo "Let's Encrypt SSL configuration updated"
else
    # Create an empty file if no Let's Encrypt certs
    echo "" > /etc/nginx/ssl/le-ssl.conf
    echo "Using self-signed certificate"
fi
