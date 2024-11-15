FROM node:alpine

WORKDIR /app

RUN npm update
RUN npm audit fix --force

RUN npm install --global pm2
COPY ./package*.json ./

RUN npm install --production
COPY ./ ./
RUN npm run build
EXPOSE 3000
USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]