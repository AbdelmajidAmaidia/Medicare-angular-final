# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 – Build the Angular application
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (layer-cache friendly)
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline

# Copy the rest of the source and build for production
COPY . .
RUN npm run build -- --configuration production

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 – Serve with Nginx
# ─────────────────────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runtime

# Remove default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled Angular app from builder stage
COPY --from=builder /app/dist/medicare-angular/browser /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
