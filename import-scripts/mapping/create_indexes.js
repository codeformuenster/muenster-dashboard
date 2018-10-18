'use strict';

const request = require('request-promise-native');

const baseUrl = process.env.ELASTICSEARCH_URL;
const prefix = process.env.ELASTICSEARCH_INDEX_PREFIX;

// console.log(`baseUrl: ${baseUrl}`);
// console.log(`prefix: ${prefix}`);

const placesIndex = {
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

const districtIndex = {
  "mappings": {
    "_doc": {
      "properties": {
        "geometry": { "type": "geo_shape" },
        "center": { "type": "geo_shape" }
      }
    }
  }
};

const indexes = {
  [`${prefix}places`]: placesIndex,
  [`${prefix}districts`]: districtIndex,
};
console.log(Object.keys(indexes));


for (const [indexName, mapping] of Object.entries(indexes)) {
  console.log(`${baseUrl}/${indexName}`);

  request.put({
      url: `${baseUrl}/${indexName}`,
      json: true,
      body: mapping
    })
    .then(function (response) {
      console.log(`Successfully created index ${indexName}`);
      console.log(response);
    })
    .catch(function (err) {
      console.log(`Error creating index ${indexName}`);
      console.log(err.message);
    });
}
