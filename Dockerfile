# Stage 1: Build
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files
COPY package.json ./

# Install ALL dependencies (including devDependencies for esbuild)
RUN npm install

# Copy source code
COPY src ./src
COPY tsconfig.json ./

# Build with esbuild (creates single bundled file)
RUN npm run build

# Stage 2: Production
FROM node:20-slim

WORKDIR /app

# Copy package.json for production dependencies
COPY package.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy bundled output from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]
