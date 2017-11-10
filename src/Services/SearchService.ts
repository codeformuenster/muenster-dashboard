
import * as Elasticsearch from 'elasticsearch';
import { ISearchParams, ISearchResult } from '../App';

let client = new Elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

/**
 * General search handling
 */
class SearchService {

  /*
   * Execute search
   */
  public sendSearchToServer(searchParams: ISearchParams, callback: any) {

    const latitude = searchParams.latitude;
    const longitude = searchParams.longitude;

    let searchQuery: any = {
      index: 'lunchtimer',
      body: {
        query: {
          // q: (searchParams.searchQuery === undefined ? '' : searchParams.searchQuery) + '*',
          bool: {
            filter: {
              geo_distance: {
                distance: '20km',
                'address.geo': {
                  lat: latitude,
                  lon: longitude
                }
              }
            },
            must: [
              {
                nested: {
                  path: 'times',
                  query: {
                    bool: {
                      must: [
                        { term: { 'times.type': 'lunch'} },
                  /*      { match: { 'times.day': 'weekday' }} */
                      ]
                    }
                  },
                  inner_hits: {}
                }
              } ,
              {
                wildcard: {
                  _all: (searchParams.searchQuery === undefined ? '' : searchParams.searchQuery) + '*'
                }
              }
            ]
          }
        },
        'sort': [
          {
            '_geo_distance': {
              'address.geo': {
                'lat': latitude,
                'lon': longitude
              },
              'order':         'asc',
              'unit':          'm',
              'distance_type': 'plane'
            }
          }
        ]
      }
    };
    if (searchParams.searchQuery !== undefined) {
      // searchQuery.body.q = searchParams.searchQuery + '*';
    }

    client
      .search(
        searchQuery,
        ((error: any, body: any) => {
          if (error) {
            console.trace('error', error.message);
          }

          let locations: Array<ISearchResult> = [];

          if (body && body.hits) {
            console.log('hits', body.hits.total);
            let results = body.hits.hits;
            for (let result of results) {
              const location = result._source;
              let features = location.payment_methods;
              if (location.wifi) {
                features.push('wifi');
              }
              if (location.name) {
                locations.push({
                  id: result._id,
                  lat: location.address.geo.lat,
                  lon: location.address.geo.lon,
                  name: location.name,
                  distance: result.sort[0],
                  type: location.type,
                  minPrice: location.min_price,
                  url: location.url,
                  menuUrl: location.menu_url,
                  menuDesc: location.lunch_desc,
                  phone: location.phone,
                  features: features,
                  openToday: location.times[0].start + ' - ' + location.times[0].end
                });
              }
            }
          }
          console.log('locations', locations);

          callback(locations);

        })
      );
  }
}

export default SearchService;
