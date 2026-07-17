FROM node:22-alpine

WORKDIR /app

# Installer les dépendances de build si nécessaire
RUN apk add --no-cache curl

COPY package.json package-lock.json* ./
RUN npm install --omit=dev 2>/dev/null || npm init -y && npm install express pg redis @qdrant/js-client-rest minio

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

USER node

CMD ["node", "app.js"]