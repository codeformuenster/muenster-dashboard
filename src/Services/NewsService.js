import * as Elasticsearch from 'elasticsearch';
import { getBaseUrl } from '../Constants/Elasticsearch';
let client = new Elasticsearch.Client({
    host: getBaseUrl(),
    log: 'trace'
});
/**
 * General search handling
 */
export class NewsService {
    /*
     * Execute search
     */
    loadNews(callback) {
        let searchQuery = {
            index: 'news',
            body: {
                'size': 4
            }
        };
        client
            .search(searchQuery, ((error, body) => {
            if (error) {
                console.trace('error', error.message);
            }
            let districts = [];
            if (body && body.hits) {
                console.log('hits', body.hits.total);
                let results = body.hits.hits;
                for (let result of results) {
                    const district = result._source;
                    districts.push({
                        id: result._id,
                        title: district.title.replace('Münster: ', ''),
                        description: district.description,
                        url: district.url,
                        date: district.date
                    });
                }
            }
            console.log('news', districts);
            callback(districts);
        }));
    }
}
