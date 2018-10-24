#!/usr/bin/env bash

export ELASTICSEARCH_URL="http://elasticsearch:9200"
export ELASTICSEARCH_INDEX_PREFIX="mein-ms-"

export BUILD="--build"
# export build=""


echo "deleting indices"
docker run --network familiendashboard_default buildpack-deps:18.10-curl sh -c "
  curl -sSf --request DELETE $ELASTICSEARCH_URL/${ELASTICSEARCH_INDEX_PREFIX}districts ;
  curl -sSf --request DELETE $ELASTICSEARCH_URL/${ELASTICSEARCH_INDEX_PREFIX}places"


echo
echo "importing mappings"
cd mapping; \
  docker-compose up $BUILD; cd ..

echo
echo "importing districts"
cd districts; \
  docker-compose up $BUILD ; cd ..

echo
echo "importing geojsonwfs"
cd geojsonwfs; \
  docker-compose up $BUILD; cd ..

echo
echo "importing various"
cd various; \
  docker-compose up $BUILD; cd ..
