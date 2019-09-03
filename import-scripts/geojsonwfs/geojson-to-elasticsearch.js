
const request = require('request-promise-native')
const centerOfMass = require('@turf/center-of-mass')
const queue = require('async/queue')

const servName = 'poiserv'
const typeName = 'ms:baeder'

const baseUrl = 'https://www.stadt-muenster.de/ows/mapserv706'
const parameters = 'REQUEST=GetFeature&SERVICE=WFS&VERSION=2.0.0&OUTPUTFORMAT=GEOJSON&EXCEPTIONS=XML&MAXFEATURES=10000&SRSNAME=EPSG:4326'

const url = `${baseUrl}/${servName}?${parameters}&TYPENAME=${typeName}`
console.log(`Importing ${servName}/${typeName} from ${url}`)

const elasticsearchUrlPrefix = process.env.ELASTICSEARCH_URL_PREFIX
// const esBaseUrl = process.env.ELASTICSEARCH_URL;
// const eSurl = esBaseUrl + '/places/place';

const handleGeoJSON = function handleGeoJSON(result) {
  const { features } = JSON.parse(result)

  const q = queue(postToElasticSearch, 15)

  for (const { geometry, properties } of features) {
    console.log()
    const { coordinates: [lon, lat] } = geometry

    q.push({
      address: {
        geo: {
          lat, lon,
        },
        geometry,
      },
      type: 'pool',
      name: properties.NAME,
      properties,
    })
  }
}

const postToElasticSearch = function postToElasticSearch(json, cb) {
  request.post({
    url: `${elasticsearchUrlPrefix}places/_doc`,
    json: true,
    body: json,
  }).then((result) => {
    console.log(`successfully created ${json.name}`)
    cb(null)
  })
    .catch((err) => {
      console.log('-------------------------------')
      console.log(`Error for ${json.name}`)
      console.log(err.message)
      cb(err)
    })
}

request(url, { auth: { user: 'mshack', pass: 'jovelms' } })
  .then(handleGeoJSON)
  .catch((err) => {
    console.log(err)
  })
