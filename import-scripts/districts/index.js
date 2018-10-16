'use strict';

const request = require('request-promise-native'),
  center = require('@turf/center-of-mass');

const districts = require('./data/districts.json');

const baseUrl = process.env.ELASTICSEARCH_URL;
const prefix = process.env.ELASTICSEARCH_INDEX_PREFIX;


console.log(`${baseUrl}/${prefix}`);

for (const feature of districts.features) {
  feature.center = center(feature).geometry;
  request.put({
    url: `${baseUrl}/${prefix}districts/_doc/${feature.properties.Nr}`,
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
