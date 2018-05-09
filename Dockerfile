FROM node:8-alpine
LABEL maintainer chernyakov@decanet.ru

ARG APP_ENV

WORKDIR /app
COPY package.json /app/
RUN npm i

COPY . .
RUN cp ./${APP_ENV}.env ./.env
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]