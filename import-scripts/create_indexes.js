'use strict';

const request = require('request-promise-native');

// const baseUrl = '';
const baseUrl = 'https://elasticsearch.codeformuenster.org';

const placesIndex = {
  "mappings": {
    "place": {
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
    "stadtteil": {
      "properties": {
        "geometry": { "type": "geo_shape" },
        "center": { "type": "geo_shape" }
      }
    }
  }
};

const indexes = {
  "places": placesIndex,
  "stadtteile": districtIndex
};

for (const [indexName, mapping] of Object.entries(indexes)) {
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
