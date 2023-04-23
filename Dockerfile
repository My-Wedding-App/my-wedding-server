FROM node:16.17-alpine3.15 as builder

WORKDIR /app

# assumes project has been build by executing yarn build:prod before create the docker image
COPY ./dist ./dist/
COPY ./node_modules ./node_modules
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY .env .env

EXPOSE 80

CMD ["yarn", "start:prod"]