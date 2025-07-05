# Install dependencies only when needed
FROM node:20-alpine as deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Install curl for healthcheck
RUN apk add --no-cache curl

# Rebuild the source code only when needed
FROM node:20-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy necessary files and run next
FROM node:20-alpine as runner
WORKDIR /app
ENV NODE_ENV production

# Don't run as root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set environment variables with defaults if not provided
ENV NEXT_PUBLIC_API_BASE_URL=""
ENV NEXT_PUBLIC_MEDIA_BASE_URL=""

# Copy entrypoint script and set permissions
COPY --chown=nextjs:nodejs entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Ensure the nextjs user has write access to necessary directories
RUN chown -R nextjs:nodejs /app

USER nextjs

# Create public directory as nextjs user
RUN mkdir -p /app/public
EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["npm", "start"]