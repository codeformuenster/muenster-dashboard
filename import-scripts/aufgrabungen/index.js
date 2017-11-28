'use strict';

const request = require('request-promise-native'),
  parse = require('csv-parse'),
  wkt = require('wellknown'),
  centerOfMass = require('@turf/center-of-mass'),
  queue = require('async/queue');

const { url, eSurl } = require('./config.json');

const handleCSV = function handleCSV (err, rows) {
  if (err) {
    console.log(err);
    return;
  }

  const q = queue(postToElasticSearch, 15);

  for (const { WKT, id, beginn, spuren, vtraeger, strassen } of rows) {
    const geometry = wkt.parse(WKT);

    const { geometry: { coordinates: [lon, lat] }} = centerOfMass(geometry);

    const lanes = spuren.split(',').map(t => t.trim());

    let  [ year, month, day ]  = beginn.split(" ")[0].split("/");
    year = Number(year);
    month = Number(month);
    day = Number(day);

    q.push({
      address: {
        geo: {
          lat, lon
        },
        geometry,
      },
      type: 'construction',
      id: parseInt(id, 10),
      date_start: new Date(Date.UTC(year, month, day)).toISOString(),
      lanes,
      name: vtraeger,
      description: strassen
    });
  }

};

const postToElasticSearch = function postToElasticSearch (json, cb) {
  request.put({
    url: `${eSurl}/${json.id}`,
    json: true,
    body: json
  }).then(function (result) {
    console.log(`successfully created ${json.id}`);
    cb(null);
  })
  .catch(function (err) {
    console.log('-------------------------------');
    console.log(`Error for ${json.id}`);
    console.log(err.message);
    cb(err);
  })
};

request(url)
  .then(function (result) {
    parse(result,
      { columns: true },
      handleCSV);
  })
  .catch(function (err) {
    console.log(err);
  });



