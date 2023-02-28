FROM node:18.14-alpine3.17 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "dev" ]