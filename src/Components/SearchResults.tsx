import * as React from 'react';
import { ISearchParams, ISearchResult } from '../App';

import SearchResultsConstruction from './SearchResults/SearchResultsConstruction';
import SearchResultsKindergarden from './SearchResults/SearchResultsKindergarden';
import SearchResultsPlayground from './SearchResults/SearchResultsPlayground';
import SearchResultsPool from './SearchResults/SearchResultsPool';
import SearchResultsWc from './SearchResults/SearchResultsWc';
import SearchResultsWifi from './SearchResults/SearchResultsWifi';
import SearchResultsWebcam from './SearchResults/SearchResultsWebcam';
import SearchResultsDefault from './SearchResults/SearchResultsDefault';
import SearchResultsEvent from './SearchResults/SearchResultsEvent';

import './SearchResults.css';

interface ISearchResultsProps {
    results: Array<ISearchResult>;
    updateHandler: any;
    searchParams: ISearchParams;
    limit?: number;
}

class SearchResults extends React.Component<ISearchResultsProps, any> {

  render() {
    let results = this.props.results || [];
    const searchParams = this.props.searchParams;

    const limit = this.props.limit ? this.props.limit : 100;
    if (results && results.length > limit) {
      results = results.slice(0, this.props.limit);
    }

    console.log('Rendering results');
    return (
      <div className="search_results">
          {results.map((result: ISearchResult) => {
            let searchResultComponent;

            switch (result.type) {
            case 'construction':
                searchResultComponent = <SearchResultsConstruction result={result}/>;
                break;
            case 'kindergarden':
                searchResultComponent = <SearchResultsKindergarden result={result}/>;
                break;
            case 'playground':
                searchResultComponent = <SearchResultsPlayground result={result}/>;
                break;
            case 'pool':
                searchResultComponent = <SearchResultsPool result={result}/>;
                break;
            case 'wc':
                searchResultComponent = <SearchResultsWc result={result}/>;
                break;
            case 'wifi':
                searchResultComponent = <SearchResultsWifi result={result}/>;
                break;
            case 'webcam':
                searchResultComponent = <SearchResultsWebcam result={result}/>;
                break;
            case 'event':
                searchResultComponent = <SearchResultsEvent result={result}/>;
                break;
            default:
                searchResultComponent = <SearchResultsDefault result={result}/>;
            }

            return (
              <article
                key={result.id}
                className={'notification' + ((searchParams.selectedId === result.id) ? ' ' + this.getSearchResultColor(result.type) : '')}
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

  private getSearchResultColor(type: string): string {
    let result = '';

    switch (type) {
    case 'construction':
        result = 'is-danger'
        break;
    case 'kindergarden':
        result = 'is-primary'
        break;
    case 'playground':
        result = 'is-warning'
        break;
    case 'pool':
        result = 'is-info'
        break;
    case 'wc':
        result = 'is-light'
        break;
    case 'wifi':
        result = 'is-dark'
        break;
    case 'webcam':
        result = 'is-success'
        break;
    default:
    }

    return result;
  }
}

export default SearchResults;
