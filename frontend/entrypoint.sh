#!/bin/sh

# Create or update the runtime environment configuration
echo "window._env_ = { 
  API_BASE_URL: \"$NEXT_PUBLIC_API_BASE_URL\", 
  MEDIA_BASE_URL: \"$NEXT_PUBLIC_MEDIA_BASE_URL\" 
};" > /app/public/runtime-env.js

# Execute the CMD command
exec "$@"
