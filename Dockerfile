FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

COPY . .

ENV API_URL https://api.prod.makeorg.tech

EXPOSE 80
