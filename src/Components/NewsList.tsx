import * as React from 'react';
import { ISearchParams } from '../App';
import { NewsService, INewsResult } from '../Services/NewsService';
import './NewsList.css';

interface INewsListProps {
    searchParams: ISearchParams;
}
interface INewsListState {
    news: Array<INewsResult>;
}

/**
 * This component displays the various news results as retrieved from the newspaper WN.
 */
class NewsList extends React.Component<INewsListProps, INewsListState> {

  constructor(props: INewsListProps) {
    super(props);

    this.state = {
      news: []
    };
    new NewsService().loadNews(
      (results: Array<INewsResult>) => {
        this.setState({
          news: results
        });
      }
    );
  }

  render() {
    console.log('Rendering results');
    return (
      <div className="wn_news">
      <h2 className="title">WN Aktuell</h2>
      <div className="columns">
          {this.state.news.map((result: INewsResult) => {

            return (
              <div key={result.id} className="column">
                <article
                  className="box"
                >
                <div className="content ">
                  <a className="subtitle" href={result.url}>{result.title}</a>
                  <div className="content">
                   {result.description}
                   </div>
                 </div>
                </article>
              </div>
            );
          })}
      </div>
      </div>
    );
  }
}

export default NewsList;
