FROM node:21-alpine3.17 AS base

WORKDIR /app

COPY . /app

RUN npm install

ENTRYPOINT [ "npm" ]

CMD [ "start" ]
