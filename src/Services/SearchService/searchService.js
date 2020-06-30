import * as Elasticsearch from 'elasticsearch'

import { getBaseUrl, placesIndex } from 'Constants/Elasticsearch'

const client = new Elasticsearch.Client({
  host: getBaseUrl(),
  // log: 'trace', // un-comment to see full Elasticsearch trace
})

/**
 * General search handling
 */
export class SearchService {
  /**
     * News has a modified search query
     */
  sendNewsSearchToServer(searchParams, callback) {
    this.sendSearchToServer(searchParams, callback, true)
  }

  /*
     * Execute search
     */
  sendSearchToServer(searchParams, callback, isNewsSearch = false) {
    const { latitude, longitude } = searchParams
    const { centerLat, centerLon } = searchParams
    const searchQuery = {
      index: placesIndex,
      body: {
        size: isNewsSearch ? 15 : 200,
        query: {
          bool: {
            // filter: {},
            must: [],
            must_not: [],
            should: [],
          },
        },
        sort: [
          { date_start: { order: 'asc' } },
          {
            _geo_distance: {
              'address.geo': {
                lat: centerLat || latitude,
                lon: centerLon || longitude,
              },
              order: 'asc',
              unit: 'm',
              distance_type: 'plane',
            },
          },
        ],
      },
    }
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
    // if (searchParams.searchQuery) {
    //   searchQuery.body.query.bool.must.push({ query_string: { query: searchParams.searchQuery } })
    // }
    if (searchParams.searchQuery) {
      searchQuery.body.query.bool.must.push({
        wildcard: { type: {
          value: searchParams.searchQuery,
        } }
      })
      // searchQuery.body.query.bool.must.push({
      //   fuzzy: { query: searchParams.searchQuery }
      // })
    }
    if (searchParams.category) {
      searchQuery.body.query.bool.must.push({ term: { type: searchParams.category } })
    } else {
      // searchQuery.body.query.bool.should.push(
      if (!searchQuery.body.query.bool.should) {
        searchQuery.body.query.bool.should = []
      }
      // searchQuery.body.query.bool.should.push(
      searchQuery.body.query.bool.should.push({
        bool: {
          must: [
            {
              term: {
                type: 'event',
              },
            },
            {
              range: {
                date_start: {
                  gte: 'now-1d',
                  lte: 'now+2d',
                },
              },
            },
            {
              geo_distance: {
                distance: '2km',
                'address.geo': {
                  lat: centerLat || latitude,
                  lon: centerLon || longitude,
                },
              },
            },
          ],
        },
      }, {
        bool: {
          must_not: [
            {
              "terms": {
                "type": [
                   "event",
                   "papierkorb"
                ]
             }
            },
          ],
          must: [
            {
              geo_distance: {
                distance: '2km',
                'address.geo': {
                  lat: centerLat || latitude,
                  lon: centerLon || longitude,
                },
              },
            }
          ]
        },
      })
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
    console.log({ searchQuery });
    
    client
      .search(searchQuery, ((error, body) => {
        if (error) {
          console.trace('error #239 -- ', error.message)
        }
        const locations = []
        if (body && body.hits) {
          const results = body.hits.hits
          for (const result of results) {
            const location = result._source
            const features = location.payment_methods
            
            if (location.wifi) {
              features.push('wifi')
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
              })
            }
          }
        }
        callback(locations)
      }))
  }
}
