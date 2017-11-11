import * as React from 'react';
import { SearchResults } from './SearchResults';

import './SearchResultsPool.css';

class SearchResultsEvent extends SearchResults {

  render() {
    console.log('Rendering pool search result');

    const result = this.props.result;

    return (
      <div className="media">
        <div className="media-left">
          <p>
            <span className="icon is-large">
              <i className="mdi mdi-48px mdi-calendar-text"></i>
            </span>
          </p>
          <div className="distanceDiv has-text-centered">
            <span className="tag is-white">{this.distancePrettifier(result.distance)}</span>
          </div>
        </div>
        <div className="media-content">
          <div className="content">
            <span className="title">
              <span>{result.name} &nbsp; </span>
              <span className="tag is-dark">Termin</span> &nbsp;
            </span>
            <div className="is-clearfix">
              <a href={result.url} target="_blank">
                <span className="icon is-large">
                  <i className="mdi mdi-16px mdi-web"></i>
                </span>
                Webseite besuchen</a>

                <p className="has-text-danger">
                  <span className="icon">
                    <i className="mdi mdi-timetable"></i>
                  </span>
                  am {this.toHumanReadableDate(result.dateStart)}
                </p>

            </div>
          </div>
        </div>
      </div>
    );
  }

  protected isRunning(wlanStatus: string): boolean {
    return wlanStatus === 'in Bearbeitung';
  }
}

export default SearchResultsEvent;
