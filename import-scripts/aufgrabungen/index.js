'use strict';

const { url, eSurl } = require('./config.json');

console.log('https://elasticsearch.codeformuenster.org')

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'https://elasticsearch.codeformuenster.org',
  log: 'trace'
});

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

client.search({
  index: 'places',
  type: 'place',
  body: {
    query: {
      match: {
        body: '*'
      }
    }
  }
}).then(function (resp) {
    var hits = resp.hits.hits;
}, function (err) {
    console.trace(err.message);
});


module.exports = () => 'Hello world'
