FROM node:16.17-alpine3.15 as builder

WORKDIR /app

# assumes project has been build by executing yarn build:prod before create the docker image
COPY ./src ./src/
# COPY ./node_modules ./node_modules
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY .env .env

RUN yarn install
RUN yarn build

CMD ["yarn", "start:prod"]