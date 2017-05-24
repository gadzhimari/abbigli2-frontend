FROM node:alpine
LABEL maintainer chernyakov@decanet.ru

ENV APP_ENV ${APP_ENV}

WORKDIR /app
COPY package.json /app/
RUN npm i

COPY . .
RUN cp ./${APP_ENV}.env ./.env
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]