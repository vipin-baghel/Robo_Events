#!/bin/sh
set -euo pipefail

# Configuration
DOMAIN="navyugam.com"
EMAIL="bhanupratapsingh9188@gmail.com"
CERT_DIR="/etc/letsencrypt/live/${DOMAIN}"
WEBROOT="/var/www/certbot"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging functions
log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check if certbot is installed
certbot_installed() {
    command -v certbot >/dev/null 2>&1 || {
        log_error "Certbot not found. Please install certbot."
        exit 1
    }
}

# Validate Let's Encrypt certificate
validate_certificate() {
    local cert_file="${CERT_DIR}/fullchain.pem"
    
    if [ ! -f "$cert_file" ]; then
        log_error "Let's Encrypt certificate not found: $cert_file"
        return 1
    fi
    
    if ! openssl x509 -checkend 86400 -noout -in "$cert_file" 2>/dev/null; then
        log_warn "Let's Encrypt certificate is expired or will expire within 24 hours"
        return 1
    fi
    
    log_info "Let's Encrypt certificate is valid: $(openssl x509 -in "$cert_file" -noout -subject)"
    return 0
}

# Request new Let's Encrypt certificates
request_certificates() {
    log_info "Requesting new Let's Encrypt certificates..."
    
    # Stop any running nginx
    if pgrep -x "nginx" >/dev/null; then
        nginx -s stop
        sleep 2
    fi
    
    # Create necessary directories
    mkdir -p "${WEBROOT}" "${CERT_DIR%/*}"
    
    # Start temporary nginx for HTTP-01 challenge
    log_info "Starting temporary nginx for HTTP-01 challenge..."
    nginx -c /etc/nginx/nginx.conf
    
    # Request certificates
    log_info "Running certbot to obtain certificates..."
    if certbot certonly --webroot -w "${WEBROOT}" \
        --email "${EMAIL}" \
        --agree-tos \
        --no-eff-email \
        --non-interactive \
        --keep-until-expiring \
        --preferred-challenges http \
        -d "${DOMAIN}" \
        -d "www.${DOMAIN}"; then
        log_info "Let's Encrypt certificates obtained successfully!"
        nginx -s stop
        return 0
    else
        log_error "Failed to obtain Let's Encrypt certificates. Please check your DNS and try again."
        nginx -s stop
        exit 1
    fi
}

# Renew existing Let's Encrypt certificates
renew_certificates() {
    log_info "Checking for Let's Encrypt certificate renewal..."
    if certbot renew --quiet --no-self-upgrade --non-interactive; then
        log_info "Let's Encrypt certificates renewed successfully"
        return 0
    else
        log_error "Let's Encrypt certificate renewal failed"
        return 1
    fi
}

# Test and start nginx
start_nginx() {
    log_info "Testing nginx configuration..."
    if ! nginx -t >/dev/null 2>&1; then
        log_error "Invalid nginx configuration"
        nginx -t  # Show actual error
        exit 1
    fi
    
    log_info "Starting Nginx with Let's Encrypt SSL..."
    exec nginx -g 'daemon off; error_log /dev/stderr info;'
}

# Main execution
main() {
    if [ "$1" != "nginx" ]; then
        exec "$@"
    fi
    
    # Ensure required directories exist
    mkdir -p "${CERT_DIR}" "/etc/nginx/ssl" "${WEBROOT}" "/var/log/nginx"
    
    # Set proper permissions
    chown -R nginx:nginx "/etc/letsencrypt" "${WEBROOT}" "/etc/nginx/ssl" "/var/log/nginx"
    chmod -R 755 "/etc/letsencrypt" "${WEBROOT}" "/etc/nginx/ssl" "/var/log/nginx"
    
    # Ensure certbot is installed
    certbot_installed
    
    # Certificate management
    if [ -f "${CERT_DIR}/fullchain.pem" ]; then
        log_info "Existing Let's Encrypt certificates found"
        
        if validate_certificate; then
            renew_certificates || {
                log_warn "Failed to renew certificates, using existing ones"
            }
        else
            log_warn "Invalid or expired certificates found, requesting new ones..."
            request_certificates
        fi
    else
        log_info "No Let's Encrypt certificates found, requesting new ones..."
        request_certificates
    fi
    
    # Start nginx
    start_nginx
}

# Run main function
main "$@"
