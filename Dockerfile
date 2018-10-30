FROM node:10.12-alpine as dev

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
# COPY package-lock.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

CMD ["npm", "start"]

# ---

FROM node:10.12-alpine as prod
WORKDIR /usr/src/app
COPY --from=dev /usr/src/app /usr/src/app

ARG elasticsearch_url
ARG elasticsearch_index_prefix
RUN REACT_APP_ELASTICSEARCH_URL=$elasticsearch_url REACT_APP_ELASTICSEARCH_INDEX_PREFIX=$elasticsearch_index_prefix npm run build

# ---

FROM giantswarm/caddy:0.11.0-test1-slim
COPY --from=prod /usr/src/app/build /var/www
