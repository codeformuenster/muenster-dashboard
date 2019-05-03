
import * as Elasticsearch from 'elasticsearch';
import { ISearchParams, ISearchResult } from '../App';
import { getBaseUrl, switchElasticSearchHost, placesIndex } from '../Constants/Elasticsearch';

let client = new Elasticsearch.Client({
  host: getBaseUrl(),
  log: 'trace'
});

/**
 * General search handling
 */
class SearchService {

  /**
   * News has a modified search query
   */
  public sendNewsSearchToServer(searchParams: ISearchParams, callback: any) {
    this.sendSearchToServer(searchParams, callback, true);
  }

  /*
   * Execute search
   */
  public sendSearchToServer(searchParams: ISearchParams, callback: any, isNewsSearch: boolean = false) {

    const { latitude, longitude } = searchParams;
    const { centerLat, centerLon } = searchParams;

    let searchQuery: any = {
      index: placesIndex,
      body: {
        size : isNewsSearch ? 15 : 100,
        query: {
          bool: {
            // filter: {},
            must: [],
            must_not: []
          }
        },
        'sort': [
          { 'date_start': {'order': 'asc'}},
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

    // if (!searchParams.district)  {
    //   searchQuery.body.query.bool.filter.geo_distance = {
    //     distance: '7km',
    //     'address.geo': {
    //       lat: latitude,
    //       lon: longitude
    //     }
    //   };
    // }
    // else
    // if (centerLat && centerLon) {
    //   console.log('TEST');
    //   if (!searchQuery.body.query.bool.must) {
    //     searchQuery.body.query.bool.must = []
    //   };
    //   if (!searchQuery.body.query.bool.should) {
    //     searchQuery.body.query.bool.should = []
    //   };
    //   searchQuery.body.query.bool.should.push({'geo_distance' : {
    //     distance: '1km',
    //     'address.geo': {
    //       lat: centerLat,
    //       lon: centerLon
    //     }
    //   }
    // });
    //
    //   // )
    //   // filter.geo_distance = {
    //   //   distance: '1km',
    //   //   'address.geo': {
    //   //     lat: centerLat,
    //   //     lon: centerLon
    //   //   }
    //   // };
    // }

    // if (searchParams.searchQuery !== undefined && searchParams.searchQuery !== '')  {
    if (searchParams.searchQuery)  {
      searchQuery.body.query.bool.must.push({query_string: {'query': searchParams.searchQuery}});
    }

    if (searchParams.category) {
      searchQuery.body.query.bool.must.push({term: {'type': searchParams.category}});
    } else {

      // searchQuery.body.query.bool.should.push(
      if (!searchQuery.body.query.bool.should) {
        searchQuery.body.query.bool.should = [];
      }
      // searchQuery.body.query.bool.should.push(
      searchQuery.body.query.bool.should.push(
            {
              'bool': {
                'must': [
                  {
                    'term': {
                      'type': 'event'
                    }
                  },
                  {
                    'range': {
                      'date_start': {
                        'gte': 'now-1d',
                        'lte': 'now+10d'
                      }
                    }
                  },
                  {
                    'geo_distance': {
                      'distance': '2km',
                      'address.geo': {
                        'lat': centerLat ? centerLat : latitude,
                        'lon': centerLon ? centerLon : longitude
                      }
                    }
                  }
                ]
              }
            },
            {
              'bool': {
                'must_not': [
                  {
                    'term': {
                      'type': 'event'
                    }
                  },
                ],
                'must': [
                  {
                    'geo_distance': {
                      'distance': '2km',
                      'address.geo': {
                        'lat': centerLat ? centerLat : latitude,
                        'lon': centerLon ? centerLon : longitude
                      }
                    }
                  }
                ]
              }
            });

      // searchQuery.body.query.bool.filter = {
      //   'bool': {
      //     'should': [
      //       {
      //         'bool': {
      //           'must': [
      //             {
      //               'term': {
      //                 'type': 'construction'
      //               }
      //             },
      //             {
      //               'range': {
      //                 'date_start': {
      //                   'gte': 'now',
      //                   'lte': 'now+10d'
      //                 }
      //               }
      //             }
      //           ]
      //         }
      //       },
      //       {
      //         'bool': {
      //           'must_not': [
      //             {
      //               'term': {
      //                 'type': 'construction'
      //               }
      //             }
      //           ]
      //         }
      //       }
      //     ]
      //   }
      // }
    }

    client
      .search(
        searchQuery,
        ((error: any, body: any) => {
          if (error) {
            console.trace('error', error.message);
            switchElasticSearchHost();
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
                  distance: result.sort[1],
                  type: location.type,
                  dateStart: location.date_start,
                  url: location.url,
                  dateEnd: location.date_end,
                  description: location.description,
                  properties: location.properties,
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
