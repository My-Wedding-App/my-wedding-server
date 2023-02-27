FROM node:16.17-alpine3.15 as builder

WORKDIR /app

# assumes project has been build by executing yarn build:prod before create the docker image
COPY ./dist ./dist/

CMD ["yarn", "start:prod"]