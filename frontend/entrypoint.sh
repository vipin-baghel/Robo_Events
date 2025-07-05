#!/bin/sh
set -e

# Create the runtime environment configuration directly in the public directory
# Using a subshell to avoid permission issues with the heredoc
(
  cd /app
  cat > public/runtime-env.js <<EOL
window._env_ = {
  API_BASE_URL: "${NEXT_PUBLIC_API_BASE_URL}",
  MEDIA_BASE_URL: "${NEXT_PUBLIC_MEDIA_BASE_URL}"
};
EOL
)

# Print environment for debugging
echo "=== Environment Variables ==="
echo "NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}"
echo "NEXT_PUBLIC_MEDIA_BASE_URL=${NEXT_PUBLIC_MEDIA_BASE_URL}"
echo "==========================="

# Verify the file was created
if [ -f "/app/public/runtime-env.js" ]; then
  echo "Successfully created runtime-env.js"
  cat /app/public/runtime-env.js
else
  echo "Warning: Failed to create runtime-env.js"
  ls -la /app/public/
fi

# Execute the CMD command
exec "$@"
