# syntax=docker/dockerfile:1

# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN corepack enable && \
    corepack prepare pnpm@latest --activate && \
    pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage - optimized for 1 CPU core
FROM node:20-alpine AS runner

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

# Copy built application from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables for production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Memory and performance optimizations for 1 CPU core
ENV NODE_OPTIONS="--max-old-space-size=512"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "server.js"]