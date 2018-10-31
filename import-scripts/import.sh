#!/usr/bin/env bash

# export COMPOSE_PROJECT_NAME="familiendashboard"
# export ELASTICSEARCH_URL_PREFIX="http://elasticsearch:9200/mein-ms-"
# export BUILD="--build"

echo
echo "importing mappings"
cd mapping; \
  docker-compose up $BUILD; cd ..

# docker build -t mapping_app .
# docker run --env ELASTICSEARCH_URL_PREFIX --network ${COMPOSE_PROJECT_NAME}_default mapping_app

echo
echo "importing districts"
cd districts; \
  docker-compose up $BUILD ; cd ..

echo
echo "importing geojsonwfs"
cd geojsonwfs; \
  docker-compose up $BUILD; cd ..

echo
echo "importing stillplaetze"
cd stillplaetze; \
  docker-compose up $BUILD; cd ..

echo
echo "importing container"
cd container; \
  docker-compose up $BUILD; cd ..
