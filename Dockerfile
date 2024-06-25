FROM node:20-alpine
WORKDIR /app
COPY package*.json app.js ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]