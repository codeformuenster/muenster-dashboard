'use strict';

const request = require('request-promise-native');
const elasticsearchUrlPrefix = process.env.ELASTICSEARCH_URL_PREFIX;
const indices = {}

indices["places"] = {
  "mappings": {
    "_doc": {
      "properties": {
        "date_start": {
          "type": "date"
        },
        "date_end": {
          "type": "date"
        },
        "address": {
          "properties": {
            "geo": {
              "type": "geo_point"
            },
            "geometry": {
              "type": "geo_shape"
            }
          }
        }
      }
    }
  }
};

indices["districts"] = {
  "mappings": {
    "_doc": {
      "properties": {
        "geometry": { "type": "geo_shape" },
        "center": { "type": "geo_shape" }
      }
    }
  }
};


console.log("Deleting and recreating indices with mapping..");

for (const [indexName, mapping] of Object.entries(indices)) {
  const indexUrl = `${elasticsearchUrlPrefix}${indexName}`

  request.delete({
      url: `${indexUrl}`,
      json: true
    })
    .then(function (response) {
      // console.log(`Success: ${indexUrl}`);
      // console.log(response);
    })
    .catch(function (err) {
      console.log(`Error deleting: ${indexUrl}`);
      console.log(err.message);
    });

  request.put({
      url: `${indexUrl}`,
      json: true,
      body: mapping
    })
    .then(function (response) {
      console.log(`Success: ${indexUrl}`);
      // console.log(response);
    })
    .catch(function (err) {
      console.log(`Error: ${indexUrl}`);
      console.log(err.message);
    });
}
