'use strict';

const request = require('request-promise-native'),
  center = require('@turf/center-of-mass');

// const { eSurl } = require('./config.json');
// "eSurl": "https://elasticsearch.codeformuenster.org/stadtteile/place"

const stadtteile = require('./data/stadtteile.json');

const baseUrl = process.env.ELASTICSEARCH_URL;
const prefix = process.env.ELASTICSEARCH_INDEX_PREFIX;


console.log(`${baseUrl}/${prefix}`);

for (const feature of stadtteile.features) {
  feature.center = center(feature).geometry;
  request.put({
    url: `${baseUrl}/${prefix}stadtteile/_doc/${feature.properties.Nr}`,
    json: true,
    body: feature
  }).then(function (result) {
    console.log(`successfully created ${feature.properties.Nr}`);
  })
  .catch(function (err) {
    console.log('-------------------------------');
    console.log(`Error for ${feature.properties.Nr}`);
    console.log(err);
  })
}
