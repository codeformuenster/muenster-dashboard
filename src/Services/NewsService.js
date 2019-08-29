import * as Elasticsearch from 'elasticsearch'
import { getBaseUrl } from '../Constants/Elasticsearch'

const client = new Elasticsearch.Client({
  host: getBaseUrl(),
  log: 'trace',
})
/**
 * General search handling
 */
export class NewsService {
  /*
     * Execute search
     */
  loadNews(callback) {
    const searchQuery = {
      index: 'news',
      body: {
        size: 4,
      },
    }
    client
      .search(searchQuery, ((error, body) => {
        if (error) {
          console.trace('error', error.message)
        }
        const districts = []
        if (body && body.hits) {
          console.log('hits', body.hits.total)
          const results = body.hits.hits
          for (const result of results) {
            const district = result._source
            districts.push({
              id: result._id,
              title: district.title.replace('Münster: ', ''),
              description: district.description,
              url: district.url,
              date: district.date,
            })
          }
        }
        console.log('news', districts)
        callback(districts)
      }))
  }
}
