import * as React from 'react';
import { ISearchParams, ISearchResult } from '../App';

import { MeinItems } from './SearchResults/MeinItem';
import SearchResultDetailled from './SearchResultDetailled';

import './SearchResults.css';

interface ISearchResultsProps {
    results: Array<ISearchResult>;
    updateHandler: any;
    searchParams: ISearchParams;
    limit?: number;
}

/**
 * This component contains the various search results, displaying one SearchResults-component (not this one, but the one in sub folder SearchResults) for each one.
 * If a result was selected, display a SearchResultDetailled for that result.
 *
 * TODO: class name is used twice. Consider renaming one of them
 */
class SearchResults extends React.Component<ISearchResultsProps, any> {

  render() {
    let results = this.props.results || [];
    const searchParams = this.props.searchParams;

    if (searchParams.selectedId) {
      const result = results.find((element: ISearchResult) => searchParams.selectedId === element.id);
      if (result) {
        return (
          <SearchResultDetailled
            result={result}
            searchParams={this.props.searchParams}
            updateHandler={this.props.updateHandler}
          />
        );
      }
    }

    results = results.filter(element => {
        let date = null;
        if (element.dateStart !== null) {
            date = new Date(element.dateStart);
        }

        return element.type !== 'event' || (date === null || date.getDay() === new Date().getDay());
    });

    // limit the number of displayed results. If none was given display the first 200
    const limit = this.props.limit ? this.props.limit : 200;
    if (results && results.length > limit) {
      results = results.slice(0, this.props.limit);
    }

    return (
      <div className="search_results">
          {results.map((result: ISearchResult) => {

            const meinItem = MeinItems.getItem(result.type);
            const ComponentClass = meinItem.component;
            const searchResultComponent = <ComponentClass result={result} icon={meinItem.icon}/>;

            return (
              <article
                key={result.id}
                className={'notification' + ((searchParams.selectedId === result.id) ? ' ' + meinItem.color : '')}
                onClick={e => this.toggleSelection(e, result.id)}
              >
                {searchResultComponent}
                {/*
                <div className="media-left">
                  <p className="image is-64x64">
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

                  </div>*/}
              </article>
            );
          })}
      </div>
    );
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
