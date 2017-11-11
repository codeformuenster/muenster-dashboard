const request = require('request-promise-native');

const { eSurl } = require('./config.json');

const stadtteile = require('./data/stadtteile.json');

for (const feature of stadtteile.features) {
  request.put({
    url: `${eSurl}/${feature.properties.Nr}`,
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
