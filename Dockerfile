FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production || npm install --only=production
COPY . .
RUN ls -lh public/ && ls -lh public/index.html
EXPOSE 4000
CMD ["node","server.js"]