import * as React from 'react';
import { ISearchParams, ISearchResult } from '../App';

import './SearchResults.css';

interface ISearchResultsProps {
    results: Array<ISearchResult>;
    updateHandler: any;
    searchParams: ISearchParams;
}

class SearchResults extends React.Component<ISearchResultsProps, any> {

  render() {
    const results = this.props.results || [];
    const searchParams = this.props.searchParams;

    console.log('Rendering results');
    return (
      <div className="search_results">
          {results.map((result: ISearchResult) => {
            return (
              <article
                key={result.id}
                className={'media notification' + ((searchParams.selectedId === result.id) ? ' is-primary' : '')}
                onClick={e => this.toggleSelection(e, result.id)}
              >
                <div className="media-left">
                  <p className="image is-64x64">
                {/*  <img src="https://bulma.io/images/placeholders/128x128.png" /> */}
                    <img className="previewImage" src="/media/cafe-garbo.jpg" />
                  </p>
                  <div className="distanceDiv has-text-centered">
                    <span className="tag is-white">{this.distancePrettifier(result.distance)}</span>
                  </div>
                </div>
                <div className="media-content">
                  <div className="content">

                      <span className="lunchtitle">{result.name} &nbsp;   <span className="tag is-dark">{result.type}</span></span>

                      <div className="is-clearfix">
                        {result.description}
                      </div>
                    </div>
                      <div className="tags is-pulled-left">

                        <span className="tag is-success">ab {result.dateEnd}€</span>

                        <div className="tag is-warning">
                          <span className="icon" data-balloon={result.url} data-balloon-pos="up">
                            <i className="fa fa-cutlery"></i>
                          </span> {result.dateStart}
                        </div>

                      </div>
                      <div className="is-pulled-right columns is-mobile is-1 is-variable">

                        {result.url && (
                            <div className="column">
                              <a className="button is-link" href={result.url}>
                                <i className="fa fa-home"></i>
                                <span className="is-hidden-mobile">&nbsp;Homepage</span>
                              </a>
                            </div>
                        )}

                        {result.url && (
                            <div className="column">
                              <a className="button is-link" href={result.url}>Menu</a>
                            </div>
                        )}
                      </div>

                  </div>
                {/*<div className="media-right">
                  <button className="delete"></button>
                </div>*/}
              </article>
            );
          })}
      </div>
    );
  }

  private distancePrettifier(dist: number): string {

    return '' + Math.round(dist) + 'm';
  }

  /**
   * Onclick handler for search result row, updates selectedId in searchParams
   */
  private toggleSelection = (event: any, id: number) => {

    let searchParams = this.props.searchParams;
    if (searchParams.selectedId === id) {
      searchParams.selectedId = 0;
    } else {
      searchParams.selectedId = id;
    }
    this.props.updateHandler(searchParams);
  }
}

export default SearchResults;
