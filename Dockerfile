# Stage 1: Build the frontend and compile the backend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package config files
COPY package*.json ./

# Install all dependencies (including devDependencies required for tailwind/vite build)
RUN npm ci

# Copy all the project source files
COPY . .

# Compile target bundles (Vite front-end build & esbuild backend server combination)
RUN npm run build

# Stage 2: Clean, optimized production runtime
FROM node:20-alpine AS runner

WORKDIR /app

# Force production environment configuration
ENV NODE_ENV=production

# Copy package blueprints
COPY package*.json ./

# Install only production dependencies for minor disk footprint and high security
RUN npm ci --only=production

# Copy compiled bundles from the builder stage
COPY --from=builder /app/dist ./dist

# Declare port target (usually governed by process.env.PORT at container startup)
EXPOSE 3000

# Start command running CJS bundle matching packscript definition
CMD ["npm", "start"]
