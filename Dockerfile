FROM node:lts-bullseye-slim

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --production --silent && mv node_modules ../

COPY . ./

RUN chown -R node /app

USER node

CMD ["npm", "start"]
