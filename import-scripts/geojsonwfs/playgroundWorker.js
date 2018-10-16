'use strict';

const request = require('request-promise-native'),
  queue = require('async/queue');

const { sourceUrl } = require('./config.json');
const baseUrl = process.env.ELASTICSEARCH_URL;
const prefix = process.env.ELASTICSEARCH_INDEX_PREFIX;

const parameters = 'REQUEST=GetFeature&SERVICE=WFS&VERSION=2.0.0&OUTPUTFORMAT=GEOJSON&EXCEPTIONS=XML&MAXFEATURES=10000&SRSNAME=EPSG:4326'

const handleGeoJSON = function handleGeoJSON ({ result, type }) {
  const { features } = JSON.parse(result);

  const q = queue(postToElasticSearch, 5);

  for (const { geometry, properties } of features) {

    const { coordinates: [lon, lat] } = geometry;
    const propName = properties.Name;

    q.push({
      address: {
        geo: {
          lat, lon
        },
        geometry,
      },
      type: type,
      name: propName.string.charAt(0).toUpperCase() + propName.slice(1).toLowerCase(),
      id: properties.ID,
      properties
    });
  }
};

const postToElasticSearch = function postToElasticSearch (json, cb) {
  return request.put({
    url: `${baseUrl}/${prefix}places/_doc/${json.id}`,
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
