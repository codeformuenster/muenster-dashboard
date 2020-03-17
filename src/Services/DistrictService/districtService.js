import * as Elasticsearch from 'elasticsearch'

import { getBaseUrl, districtIndex } from 'Constants/Elasticsearch'

const client = new Elasticsearch.Client({
  host: getBaseUrl(),
  // log: 'trace', // un-comment to see full Elasticsearch trace
})
/**
 * General search handling. This class acts as a wrapper around the Elasticsearch client.
 */
export class DistrictService {
  /**
     * Query the first 100 entries on the district index.
     * @param callback a function with one parameter, that will be called when the results are ready. The first parameter
     * will be an array containing the district results of type IDistrictResultSlim.
     */
  loadDistricts(callback) {
    const searchQuery = {
      index: districtIndex,
      body: {
        size: 100,
        _source: ['properties', 'center', 'geometry'],
      },
    }
    client
      .search(searchQuery, ((error, body) => {
        if (error) {
          console.trace('error', error.message)
        }
        let districts = []
        if (body && body.hits) {
          const results = body.hits.hits
          for (const { _id, _source: { properties: district, center: { coordinates }, geometry } } of results) {
            districts.push({
              id: _id,
              name: district.Name,
              number: district.Nr,
              centerLat: coordinates[1],
              centerLon: coordinates[0],
              polygon: geometry,
            })
          }
        }
        // sort
        districts = districts.sort((a, b) => a.name.localeCompare(b.name))
        callback(districts)
      }))
  }

  /**
     * Query the district index for the geometry that contains the given geo position.
     *
     * @return a Promise that will return the one matching district name or an empty string, if no matching district
     * was found
     */
  queryDistrictByCoordinates({ latitude, longitude }) {
    const searchQuery = {
      index: districtIndex,
      body: {
        size: 1,
        _source: ['properties.Name'],
        query: {
          geo_shape: {
            geometry: {
              relation: 'contains',
              shape: {
                type: 'point',
                coordinates: [
                  longitude, latitude,
                ],
              },
            },
          },
        },
      },
    }

    return new Promise(((resolve, reject) => {
      client
        .search(searchQuery, ((error, body) => {
          if (error) {
            console.trace('error', error.message)
            return reject(error)
          }
          if (body && body.hits) {
            const result = body.hits.hits[0]
            if (result) {
              return resolve(result._source.properties.Name)
            }
          }
          return resolve('')
        }))
    }))
  }
}
