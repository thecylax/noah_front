FROM node:alpine

WORKDIR /app

RUN npm install --global pm2
COPY ./package*.json ./

RUN npm update && npm audit fix --force && npm install --production
COPY ./ ./
RUN npm run build
EXPOSE 3000
USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]