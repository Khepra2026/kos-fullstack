FROM node:22-alpine
WORKDIR /app
COPY package.json./
COPY package-lock.json./
RUN npm ci --ignore-scripts
COPY..
EXPOSE 4000
ENV NODE_ENV=production
ENV PORT=4000
ENV HOST=0.0.0.0
CMD ["npm", "start"]