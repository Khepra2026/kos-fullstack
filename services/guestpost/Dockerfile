FROM node:22-alpine

WORKDIR /app

# Install dependencies
RUN npm install express axios @supabase/supabase-js

COPY app.js ./

EXPOSE 3500

CMD ["node", "app.js"]