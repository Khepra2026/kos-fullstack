FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache curl

COPY package.json package-lock.json* ./
RUN npm install --omit=dev 2>/dev/null || npm init -y && npm install pg redis

COPY . .

USER node

CMD ["node", "worker.js"]