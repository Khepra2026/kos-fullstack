FROM node:20-alpine
WORKDIR /app
COPY package*.json./
RUN npm ci --ignore-scripts || npm install --ignore-scripts
COPY..
EXPOSE 8080
ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0
HEALTHCHECK --interval=10s --timeout=2s --start-period=30s --retries=3 CMD wget -qO- http://localhost:8080/health || exit 1
CMD ["npm", "start"]
