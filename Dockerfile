FROM keymetrics/pm2:latest-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV API_URL https://api.prod.makeorg.tech

EXPOSE 80

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
