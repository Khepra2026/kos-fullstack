# ============================================================
# KOS Cognitive OS - Frontend Production Dockerfile
# Big Four Grade Build Pipeline
# React + Vite + Nginx
# ============================================================


# ------------------------------------------------------------
# Stage 1 : Build React/Vite
# ------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app


# Variables Supabase publiques (build-time)
ARG VITE_PUBLIC_SUPABASE_URL
ARG VITE_PUBLIC_SUPABASE_ANON_KEY


ENV VITE_PUBLIC_SUPABASE_URL=$VITE_PUBLIC_SUPABASE_URL
ENV VITE_PUBLIC_SUPABASE_ANON_KEY=$VITE_PUBLIC_SUPABASE_ANON_KEY


# Augmentation mémoire Node pour gros build KOS
# nécessaire pour Knowledge Graph + Regulatory Engine
ENV NODE_OPTIONS="--max-old-space-size=8192"


# Installation dépendances
COPY package*.json ./

RUN npm ci --ignore-scripts


# Copie application
COPY . .


# Build production
RUN npm run build



# ------------------------------------------------------------
# Stage 2 : Nginx Production Runtime
# ------------------------------------------------------------
FROM nginx:1.27-alpine AS production


# Healthcheck support
RUN apk add --no-cache curl


# Assets compilés React
COPY --from=builder /app/dist /usr/share/nginx/html


# Configuration Nginx sécurité Big Four
COPY nginx.conf /etc/nginx/nginx.conf


# Ports HTTP / HTTPS
EXPOSE 80 443


# Monitoring container
HEALTHCHECK \
    --interval=30s \
    --timeout=3s \
    --start-period=10s \
    CMD curl -f http://localhost/health || exit 1



# Démarrage Nginx
CMD ["nginx", "-g", "daemon off;"]