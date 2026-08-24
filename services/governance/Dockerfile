FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production && npm cache clean --force
COPY app.js ./
EXPOSE 3004
HEALTHCHECK --interval=15s --timeout=5s --retries=3 CMD wget --spider -q http://localhost:3004/health || exit 1
CMD ["node", "app.js"]