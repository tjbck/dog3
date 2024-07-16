# syntax=docker/dockerfile:1
FROM node:latest

ENV DISCORD_TOKEN 'TOKEN'
ENV DB_URL 'DB_URL'

ENV ENV prod

WORKDIR /app

COPY package.json package-lock.json ./ 

RUN npm install

COPY . .

CMD [ "npm", "run", "start"]

