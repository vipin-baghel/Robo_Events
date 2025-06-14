FROM nginx:1.23-alpine

# Install certbot and openssl for SSL certificate management
RUN apk add --no-cache certbot openssl

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Create necessary directories
RUN mkdir -p /var/log/nginx/app /var/log/nginx/static \
    && mkdir -p /etc/letsencrypt/live/navyugam.com \
    && mkdir -p /var/www/certbot \
    && mkdir -p /etc/nginx/ssl

# Create a self-signed certificate as fallback
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/selfsigned.key \
    -out /etc/nginx/ssl/selfsigned.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=navyugam.com"

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Set proper permissions
RUN chown -R nginx:nginx /var/log/nginx /var/cache/nginx/ /var/www/certbot /etc/letsencrypt/ /etc/nginx/ssl/ \
    && chmod -R 755 /var/log/nginx/ \
    && chmod -R 755 /var/cache/nginx/ \
    && chmod -R 755 /var/www/certbot/ \
    && chmod -R 755 /etc/letsencrypt/

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# Run the entrypoint script
CMD ["/docker-entrypoint.sh"]
