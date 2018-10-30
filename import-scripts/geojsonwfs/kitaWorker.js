'use strict';

const request = require('request-promise-native'),
  queue = require('async/queue');

const { sourceUrl } = require('./config.json');
const elasticsearchUrlPrefix = process.env.ELASTICSEARCH_URL_PREFIX;
// const baseUrl = process.env.ELASTICSEARCH_URL;
// const prefix = process.env.ELASTICSEARCH_INDEX_PREFIX;

const parameters = 'REQUEST=GetFeature&SERVICE=WFS&VERSION=2.0.0&OUTPUTFORMAT=GEOJSON&EXCEPTIONS=XML&MAXFEATURES=10000&SRSNAME=EPSG:4326'

const handleGeoJSON = function handleGeoJSON ({ result, type }) {
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
      name: properties.E_NAME,
      id: properties.KITA_ID,
      properties
    });
  }
};

const postToElasticSearch = function postToElasticSearch (json, cb) {
  return request.put({
    url: `${elasticsearchUrlPrefix}places/_doc/${json.id}`,
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
  const url = `${sourceUrl}/${servName}?${parameters}&TYPENAME=${typeName}`;
  console.log(`Importing ${servName}/${typeName} from ${url}`);

  return request(url, { auth: { user: 'mshack', pass: 'jovelms' } })
    .then(function (result) {
      return handleGeoJSON({ result, type })
    })
    .catch(function (err) {
      console.log(err);
    });
};
