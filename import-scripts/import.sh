#!/usr/bin/env bash

export ELASTICSEARCH_URL="http://127.0.0.1:9200"
# # export ELASTICSEARCH_INDEX_PREFIX="meinms-"
 export ELASTICSEARCH_INDEX_PREFIX=""
#
# export BUILD="--build"
# # export build=""

echo "deleting indices"
curl --request DELETE "$ELASTICSEARCH_URL/""$ELASTICSEARCH_INDEX_PREFIX""districts"
curl --request DELETE "$ELASTICSEARCH_URL/""$ELASTICSEARCH_INDEX_PREFIX""places"

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
