FROM node:alpine

WORKDIR /app

RUN npm install --global pm2
COPY ./package*.json ./

RUN npm install --production --force

COPY ./ ./
RUN npm run build
# Ensure Next.js image cache directory exists and is writable by the `node` user
RUN mkdir -p /app/.next/cache/images \
 && chown -R node:node /app
EXPOSE 3000
USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]