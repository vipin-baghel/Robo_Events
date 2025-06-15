FROM nginx:1.23-alpine

# Install required packages
RUN apk add --no-cache \
    certbot \
    openssl \
    tzdata \
    curl \
    bash \
    && rm -rf /var/cache/apk/*

# Set timezone
ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Remove default nginx config
RUN rm -f /etc/nginx/conf.d/default.conf

# Create necessary directories
RUN mkdir -p /var/log/nginx /var/cache/nginx /var/www/certbot \
    /etc/letsencrypt/live/navyugam.com \
    /etc/nginx/ssl \
    /var/run/nginx

# Generate DH parameters for stronger key exchange
RUN openssl dhparam -dsaparam -out /etc/nginx/ssl/dhparam.pem 2048

# Create a self-signed certificate as fallback
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/selfsigned.key \
    -out /etc/nginx/ssl/selfsigned.crt \
    -subj "/CN=navyugam.com" \
    -addext "subjectAltName=DNS:navyugam.com,DNS:www.navyugam.com"

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the entrypoint script and SSL generation script
COPY docker-entrypoint.sh /docker-entrypoint.sh

# Set proper permissions
RUN chmod +x /docker-entrypoint.sh \
    && chown -R nginx:nginx /var/log/nginx /var/cache/nginx /var/www/certbot /etc/letsencrypt /etc/nginx/ssl \
    && chmod -R 755 /var/log/nginx /var/cache/nginx /var/www/certbot /etc/letsencrypt /etc/nginx/ssl \
    && chmod 640 /etc/nginx/ssl/*.key 2>/dev/null || true

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# Run the entrypoint script
CMD ["/docker-entrypoint.sh"]
