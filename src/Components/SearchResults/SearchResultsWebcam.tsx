import * as React from 'react';
import { SearchResults } from './SearchResults';

class SearchResultsWebcam extends SearchResults {

  render() {
    console.log('Rendering webcams search result');

    const result = this.props.result;

    return (
      <div className="media">
        <div className="media-left">
          <p>
            <span className="icon is-large">
              <i className="mdi mdi-48px mdi-camera"></i>
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
              <span className="tag is-dark">Webcam</span> &nbsp;
            </span>
            <div className="content">
              <a href={result.url} title={result.name} target="_blank">Gehe zu Webcam</a>
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
}

export default SearchResultsWebcam;
