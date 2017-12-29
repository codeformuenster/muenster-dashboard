FROM node:8-alpine as build

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run build

FROM abiosoft/caddy:0.10.10

COPY --from=build /usr/src/app/build /srv

