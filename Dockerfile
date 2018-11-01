FROM node:10-alpine as dev

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
# COPY package-lock.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

CMD ["npm", "start"]

# ---

FROM node:10-alpine as prod
WORKDIR /usr/src/app
COPY --from=dev /usr/src/app /usr/src/app

ARG elasticsearch_url_prefix
RUN REACT_APP_ELASTICSEARCH_URL_PREFIX=$elasticsearch_url_prefix npm run build

# ---

FROM giantswarm/caddy:v0.11.0-test2-slim
COPY --from=prod /usr/src/app/build /var/www
