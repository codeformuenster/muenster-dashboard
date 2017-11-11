
import * as Elasticsearch from 'elasticsearch';

let client = new Elasticsearch.Client({
  host: 'https://elasticsearch.codeformuenster.org:443',
  log: 'trace'
});

export interface IDistrictResultSlim {
  name: string;
  number: number;
  id: number;
  centerLat: number;
  centerLon: number;
}

/**
 * General search handling
 */
export class DistrictService {

  /*
   * Execute search
   */
  public loadDistricts(callback: any) {

    let searchQuery: any = {
      index: 'stadtteile',
      body: {
        'size' : 100,
        '_source': [ 'properties', 'center' ]
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
            for (const { _id, _source: { properties: district, center: { coordinates } } } of results) {
              districts.push({
                id: _id,
                name: district.Name,
                number: district.Nr,
                centerLat: coordinates[1],
                centerLon: coordinates[0]
              });
            }
          }
          // sort
          districts = districts.sort((a, b) => { return a.name.localeCompare(b.name) });
          console.log('districts', districts);

          callback(districts);
        })
      );
  }
}
