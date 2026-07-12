FROM node:22-alpine

WORKDIR /judge_Service

RUN apk add --no-cache docker-cli

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm","run","dev"]