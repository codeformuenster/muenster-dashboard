"use strict";
exports.__esModule = true;
var Elasticsearch = require("elasticsearch");
console.log('Creating Index');
var DatabaseInit = (function () {
    function DatabaseInit() {
        this.indexName = 'lunchtimer';
        this.typeName = 'place';
        this.dataDirectory = '../../data/';
        var client = new Elasticsearch.Client({
            host: 'localhost:9200',
            apiVersion: '5.6',
            log: 'trace'
        });
        this.esClient = client;
    }
    DatabaseInit.prototype.run = function () {
        var _this = this;
        // Step 1: delete all indices
        //
        this.esClient.indices["delete"]({
            index: '_all'
        }, function (err, resp, status) {
            if (err) {
                console.log('Index was not there or some error during delete.');
            }
            else {
                console.log('Delete Index ', resp);
            }
            _this.createIndex();
        });
    };
    DatabaseInit.prototype.insertData = function () {
        this.readDataFiles();
    };
    /**
     * Step 2: create the index
     */
    DatabaseInit.prototype.createIndex = function () {
        var _this = this;
        console.log('Creating Index ' + this.indexName);
        this.esClient.indices.create({
            index: this.indexName
        }, function (err, resp, status) {
            if (err) {
                console.log('Error during index create: ', err);
            }
            else {
                _this.createMapping();
            }
        });
    };
    /**
     * Step 3: add the mappings,
     *  - for geo type
     *  - for the "times" array we need to set "nested" type, @see https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html
     */
    DatabaseInit.prototype.createMapping = function () {
        var _this = this;
        console.log('===> Creating Index Mapping for geo, etc');
        this.esClient.indices.putMapping({
            index: this.indexName,
            type: this.typeName,
            body: {
                _all: {
                    enabled: true,
                    index: 'not_analyzed'
                },
                properties: {
                    min_price: {
                        type: 'float'
                    },
                    times: {
                        type: 'nested'
                    },
                    'address': {
                        'properties': {
                            'geo': {
                                'type': 'geo_point'
                            }
                        }
                    }
                }
            }
        }, function (err, resp, status) {
            _this.readDataFiles();
        });
    };
    /**
     * Read data files and put them into elasticsearch
     */
    DatabaseInit.prototype.readDataFiles = function () {
        var _this = this;
        console.log('===> Processing location data files .. ');
        var fs = require('fs');
        var directory = this.dataDirectory;
        fs.readdir(directory, function (err, files) {
            var _loop_1 = function (file) {
                fs.readFile(directory + file, function (ferr, data) {
                    console.log('==> file', file);
                    if (ferr) {
                        throw ferr;
                    }
                    var json = JSON.parse(data);
                    _this.esClient.index({
                        index: _this.indexName,
                        type: _this.typeName,
                        // id: '1',
                        body: json
                    }, function (error, response) {
                        if (error) {
                            console.log('error', error);
                        }
                        else {
                            console.log('===> good', json.name);
                        }
                    });
                });
            };
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                _loop_1(file);
            }
        });
    };
    return DatabaseInit;
}());
var dbInit = new DatabaseInit();
dbInit.run();
