'use strict';

const request = require('request-promise-native'),
  center = require('@turf/center-of-mass');

const districts = require('./data/districts.json');
const elasticsearchUrlPrefix = process.env.ELASTICSEARCH_URL_PREFIX;


console.log(`${elasticsearchUrlPrefix}`);

for (const feature of districts.features) {
  feature.center = center(feature).geometry;
  request.put({
    url: `${elasticsearchUrlPrefix}districts/_doc/${feature.properties.Nr}`,
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
