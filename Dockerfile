FROM node:14.18.2-alpine3.12

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile \
  && yarn compile \
  && npm link
