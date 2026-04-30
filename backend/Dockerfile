# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
#RUN pnpm install --no-frozen-lockfile
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build
#RUN pnpm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
#COPY package.json pnpm-lock.yaml ./
COPY package.json package-lock.json ./


# Install production dependencies only
# RUN pnpm install --prod --no-frozen-lockfile
RUN npm install --omit=dev


# Copy built assets from builder
COPY --from=builder /app/dist ./dist

# Copy .env if it exists (for forcibly reading from .env)
COPY .env* ./

# Expose port — change if you use different port!
ENV PORT=3001
EXPOSE 3001

# Start the server
CMD ["npm", "start"]


