import * as Elasticsearch from 'elasticsearch';
import { Polygon } from 'geojson';

const client = new Elasticsearch.Client({
  host: 'https://elasticsearch.codeformuenster.org:443',
  log: 'trace'
});

/**
 * Data about one district
 */
export interface IDistrictResultSlim {
  name: string;
  number: number;
  id: number;
  centerLat: number;
  centerLon: number;
  polygon: Polygon;
}

/**
 * General search handling. This class acts as a wrapper around the Elasticsearch client.
 */
export class DistrictService {

    /**
     * Query the first 100 entries on the 'stadtteile'-index.
     * @param callback a function with one parameter, that will be called when the results are ready. The first parameter
     * will be an array containing the district results of type IDistrictResultSlim.
     */
  public loadDistricts(callback: any) {

    let searchQuery: any = {
      index: 'stadtteile',
      body: {
        'size' : 100,
        '_source': [ 'properties', 'center', 'geometry' ]
      }
    };

    client
      .search(
        searchQuery,
        ((error: any, body: any) => {
          if (error) {
            console.trace('error', error.message);
          }

          let districts: Array<IDistrictResultSlim> = [];

          if (body && body.hits) {
            console.log('hits', body.hits.total);
            const results = body.hits.hits;
            for (const { _id, _source: { properties: district, center: { coordinates }, geometry } } of results) {
              districts.push({
                id: _id,
                name: district.Name,
                number: district.Nr,
                centerLat: coordinates[1],
                centerLon: coordinates[0],
                polygon: geometry
              });
            }
          }
          // sort
          districts = districts.sort((a, b) => { return a.name.localeCompare(b.name); });
          console.log('districts', districts);

          callback(districts);
        })
      );
  }

    /**
     * Query the 'stadtteile'-index for the geometry that contains the given geo position.
     *
     * @return a Promise that will return the one matching district name or an empty string, if no matching district
     * was found
     */
  public queryDistrictByCoordinates({ latitude, longitude }: { latitude: number, longitude: number }) {
    const searchQuery: any = {
      index: 'stadtteile',
      body: {
        'size' : 1,
        '_source': [ 'properties.Name' ],
        'query': {
          'geo_shape': {
            'geometry': {
              'relation': 'contains',
              'shape': {
                'type': 'point',
                'coordinates': [
                    longitude, latitude
                  ]
              }
            }
          }
        }
      }
    };

    return new Promise(function (resolve: (value?: any | PromiseLike<any>) => void, reject: (reason?: any) => void) {
      client
        .search(
          searchQuery,
          ((error: any, body: any) => {
            if (error) {
              console.trace('error', error.message);
              return reject(error);
            }

            if (body && body.hits) {
              const result = body.hits.hits[0];
              if (result) {
                return resolve(result._source.properties.Name);
              }
            }
            return resolve('');
          })
        );
    });
  }
}
