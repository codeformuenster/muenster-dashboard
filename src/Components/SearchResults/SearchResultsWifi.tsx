import * as React from 'react';
import { SearchResults } from './SearchResults';

import './SearchResultsWifi.css';

class SearchResultsWifi extends SearchResults {

  render() {
    console.log('Rendering wifi search result');

    const result = this.props.result;

    return (
      <div className="media">
        <div className="media-left">
          <p>
            <span className="icon is-large">
              <i className="mdi mdi-48px mdi-wifi"></i>
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
              <span className="tag is-dark">W-LAN</span> &nbsp;
              <span className={'tag ' + (this.isRunning(result.properties.WLAN_STATUS) ? 'is-success' : 'is-danger')}>
                {result.properties.WLAN_STATUS}
              </span>
            </span>
            <div className="is-clearfix">
              Friedenssaal, Prinzipalmarkt 10
            </div>
            <p className="has-text-danger">
              <span className="icon">
                <i className="mdi mdi-walk"></i>
              </span>
              12 Min.
              &bull;
              <span className="icon">
                <i className="mdi mdi-car"></i>
              </span>
              5 Min.
            </p>
          </div>
        </div>
      </div>
    );
  }

  protected isRunning(wlanStatus: string): boolean {
    return wlanStatus === 'in Bearbeitung';
  }
}

export default SearchResultsWifi;
