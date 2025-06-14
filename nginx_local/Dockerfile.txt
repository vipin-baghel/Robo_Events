FROM nginx:1.23-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create necessary directories
RUN mkdir -p /var/log/nginx/app /var/log/nginx/static

# Set proper permissions
RUN chown -R nginx:nginx /var/log/nginx /var/cache/nginx/ \
    && chmod -R 755 /var/log/nginx/ \
    && chmod -R 755 /var/cache/nginx/

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
