# Simple Production Dockerfile for Portfolio Showcase
FROM node:18-alpine

# Install dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code (this layer will change when code changes)
COPY . .

# Add a build timestamp to force rebuild when needed
RUN echo "Build timestamp: $(date)" > /app/build-info.txt

# Build the application
RUN npm run build

# Install only production dependencies
RUN npm ci --only=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "dist/index.js"] 