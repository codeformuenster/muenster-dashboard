import * as React from 'react';
import { SearchResults } from './SearchResults';

class SearchResultsKindergarden extends SearchResults {

  render() {
    console.log('Rendering pool search result');

    const result = this.props.result;

    return (
      <div className="media">
        <div className="media-left">
          <p>
            <span className="icon is-large">
              <i className="mdi mdi-48px mdi-baby-buggy"></i>
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
              <span className="tag is-dark">Kita</span> &nbsp;
            </span>
            <div className="is-clearfix">
              {result.properties.ADRESSE}
              <a href={result.properties.HOMEPAGE} target="_blank">
                <span className="icon is-large">
                  <i className="mdi mdi-16px mdi-web"></i>
                </span>
                Website besuchen
              </a>
            </div>
            <p className="has-text-danger">
              <span className="icon">
                <i className="mdi mdi-walk"></i>
              </span>
              {this.getMinutesByFeet(result.distance)}
              &bull;
              <span className="icon">
                <i className="mdi mdi-car"></i>
              </span>
              {this.getMinutesByCar(result.distance)}
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

export default SearchResultsKindergarden;
