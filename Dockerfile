FROM node:alpine
LABEL maintainer chernyakov@decanet.ru

ENV APP_ENV ${APP_ENV}

WORKDIR /app
COPY package.json /app/
RUN npm i

COPY . .
COPY ${APP_ENV}.env .env
RUN npm run clean
RUN webpack -p

EXPOSE 3000
CMD [ "npm", "start" ]