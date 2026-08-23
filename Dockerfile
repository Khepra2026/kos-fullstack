# Stage 1: Build Vite
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Nginx durci + headers sécurité
FROM nginx:1.27-alpine AS runtime
LABEL maintainer="KHEPRA Security Team"
LABEL org.opencontainers.image.description="KOS Frontend - ISO 27001 Ready"

RUN rm -rf /usr/share/nginx/html/* && \
    apk add --no-cache curl

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN addgroup -g 1001 -S kos && \
    adduser -S kos -u 1001 -G kos && \
    chown -R kos:kos /usr/share/nginx/html && \
    chown -R kos:kos /var/cache/nginx && \
    chown -R kos:kos /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R kos:kos /var/run/nginx.pid

USER kos

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

