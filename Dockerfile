# Stage 1: Build
FROM node:20-slim AS builder

WORKDIR /app

# Install all dependencies (including devDependencies for build)
COPY package.json ./
RUN npm install

# Copy source code
COPY src ./src
COPY tsconfig.json ./

# Build TypeScript
RUN npm run build

# Stage 2: Production
FROM node:20-slim

WORKDIR /app

# Copy package.json and install production dependencies only
COPY package.json ./
RUN npm install --omit=dev

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]
