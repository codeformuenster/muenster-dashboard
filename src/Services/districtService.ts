
import * as Elasticsearch from 'elasticsearch';

let client = new Elasticsearch.Client({
  host: 'https://elasticsearch.codeformuenster.org:443',
  log: 'trace'
});


export interface IDistrictResultSlim {
  name: string;
  number: number;
  id: number;
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
        "size" : 100,
        "_source": [ "properties" ]
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
            let results = body.hits.hits;
            for (let result of results) {
              const district = result._source.properties;

                districts.push({
                  id: result._id,
                  name: district.Name,
                  number: district.Nr,
                });

            }
          }
          console.log('districts', districts);

          callback(districts);

        })
      );
  }
}
