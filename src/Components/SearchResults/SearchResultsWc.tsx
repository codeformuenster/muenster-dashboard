import * as React from 'react';
import { SearchResults } from './SearchResults';

class SearchResultsWc extends SearchResults {

  render() {
    // console.log('Rendering wc search result');

    const result = this.props.result;

    return (
      <div className="media">
        <div className="media-left">
          <p>
            <span className="icon is-large">
              <i className="mdi mdi-48px mdi-human-male-female" />
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
              <span className="tag is-dark">WC</span> &nbsp;
              {this.isAccessibleWithWheelchair(result.properties.BARRIEREFREI) && <span className="tag is-success">
                <span className="icon"> <i className="mdi mdi-24px mdi-wheelchair-accessibility" /> </span>
              </span>}
            </span>
            <div className="is-clearfix">
              Friedenssaal, Prinzipalmarkt 10
            </div>
            <p className="has-text-danger">
              <span className="icon">
                <i className="mdi mdi-walk" />
              </span>
              {this.getMinutesByFeet(result.distance)}
              &bull;
              <span className="icon">
                <i className="mdi mdi-car" />
              </span>
              {this.getMinutesByCar(result.distance)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  private isAccessibleWithWheelchair(accessible: string): boolean {
    return accessible === 'J';
  }
}

export default SearchResultsWc;
