
import * as Elasticsearch from 'elasticsearch';

let client = new Elasticsearch.Client({
  host: 'https://elasticsearch.codeformuenster.org:443',
  log: 'trace'
});

export interface INewsResult {
  id: number;
  title: string;
  description: string;
  url: string;
  date: string;
}

/**
 * General search handling
 */
export class NewsService {

  /*
   * Execute search
   */
  public loadNews(callback: any) {

    let searchQuery: any = {
      index: 'news',
      body: {
        'size' : 100
      }
    };

    client
      .search(
        searchQuery,
        ((error: any, body: any) => {
          if (error) {
            console.trace('error', error.message);
          }

          let districts: Array<INewsResult> = [];

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

        })
      );
  }
}
