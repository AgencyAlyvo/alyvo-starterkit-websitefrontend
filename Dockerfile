# Set version latest LTS
FROM node:24.20.0

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .