
import * as Elasticsearch from 'elasticsearch';

console.log('Creating Index');

class DatabaseInit {

  private esClient: Elasticsearch.Client;
  private indexName = 'lunchtimer';
  private typeName = 'place';
  private dataDirectory = '../../data/';

  public constructor() {

      let client = new Elasticsearch.Client({
        host: 'elasticsearch:9200',
        apiVersion: '5.6',
        log: 'trace'
      });
      this.esClient = client;
  }

  public run() {

    // Step 1: delete all indices
    //
    this.esClient.indices.delete(
      {
          index: '_all'
      },
      (err: any, resp: any, status: any) => {
        if (err) {
          console.log('Index was not there or some error during delete.');
        } else {
          console.log('Delete Index ', resp);
        }
        this.createIndex();
      }
    );
  }

  public insertData() {
    this.readDataFiles();
  }

  /**
   * Step 2: create the index
   */
  private createIndex() {

    console.log('Creating Index ' + this.indexName);

    this.esClient.indices.create(
      {
        index: this.indexName
      },
      (err: any, resp: any, status: any) => {
        if (err) {
          console.log('Error during index create: ', err);
        } else {
          this.createMapping();
        }
      }
    );
  }

  /**
   * Step 3: add the mappings,
   *  - for geo type
   *  - for the "times" array we need to set "nested" type, @see https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html
   */
  private createMapping() {

    console.log('===> Creating Index Mapping for geo, etc');

    this.esClient.indices.putMapping(
    {
      index: this.indexName,
      type: this.typeName,
      body: {
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
    },
    (err: any, resp: any, status: any) => {
      this.readDataFiles();
    });
  }

  /**
   * Read data files and put them into elasticsearch
   */
  private readDataFiles() {

    console.log('===> Processing location data files .. ');

    const fs = require('fs');
    const directory = this.dataDirectory;

    fs.readdir(directory, (err: any, files: string[]) => {
      for (let file of files) {

        fs.readFile(directory + file, (ferr: any, data: any) => {
          console.log('==> file', file);
          if (ferr) {
            throw ferr;
          }
          const json = JSON.parse(data);

          this.esClient.index(
            {
              index: this.indexName,
              type: this.typeName,
              // id: '1',
              body: json
            },
            function (error: any, response: any) {
              if (error) {
                console.log('error', error);
              } else {
                console.log('===> good', json.name);
              }
            }
          );
        });

      }
    });
  }
}

const dbInit = new DatabaseInit();
dbInit.run();
