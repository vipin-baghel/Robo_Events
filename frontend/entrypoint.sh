#!/bin/sh
set -e

# Create or update the runtime environment configuration
cat > /app/public/runtime-env.js <<EOL
window._env_ = {
  API_BASE_URL: "${NEXT_PUBLIC_API_BASE_URL}",
  MEDIA_BASE_URL: "${NEXT_PUBLIC_MEDIA_BASE_URL}"
};
EOL

# Set proper permissions
chmod 444 /app/public/runtime-env.js
chown nextjs:nodejs /app/public/runtime-env.js

# Print environment for debugging
echo "=== Environment Variables ==="
echo "NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}"
echo "NEXT_PUBLIC_MEDIA_BASE_URL=${NEXT_PUBLIC_MEDIA_BASE_URL}"
echo "==========================="

# Execute the CMD command
exec "$@"
