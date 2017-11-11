'use strict';

const request = require('request-promise-native'),
  queue = require('async/queue');

const { baseUrl, eSurl } = require('./config.json');

const parameters = 'REQUEST=GetFeature&SERVICE=WFS&VERSION=2.0.0&OUTPUTFORMAT=GEOJSON&EXCEPTIONS=XML&MAXFEATURES=10000&SRSNAME=EPSG:4326'

const handleGeoJSON = function handleGeoJSON ({ result, type }, cb) {
  const { features } = JSON.parse(result);

  const q = queue(postToElasticSearch, 5);

  for (const { geometry, properties } of features) {
    const { coordinates: [lon, lat] } = geometry;

    q.push({
      address: {
        geo: {
          lat, lon
        },
        geometry,
      },
      type: type,
      name: properties.NAME,
      properties
    });
  }
  return Promise.resolve();
};

const postToElasticSearch = function postToElasticSearch (json, cb) {
  return request.post({
    url: `${eSurl}`,
    json: true,
    body: json
  }).then(function (result) {
    console.log(`successfully created ${json.name}`);
    cb(null);
  })
  .catch(function (err) {
    console.log('-------------------------------');
    console.log(`Error for ${json.name}`);
    console.log(err.message);
    cb(err);
  })
};

module.exports = function worker ({ servName, typeName, type }) {
  const url = `${baseUrl}/${servName}?${parameters}&TYPENAME=${typeName}`;
  console.log(`Importing ${servName}/${typeName} from ${url}`);

  return request(url, { auth: { user: 'mshack', pass: 'jovelms' } })
    .then(function (result) {
      return handleGeoJSON({ result, type })
    })
    .catch(function (err) {
      console.log(err);
      cb(err);
    });
};
