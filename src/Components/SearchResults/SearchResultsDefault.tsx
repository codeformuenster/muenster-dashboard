import * as React from 'react';
import { SearchResultsBase } from './SearchResultsBase';
import { MeinItems } from './MeinItem';

class SearchResultsDefault extends SearchResultsBase {

  render() {
    const result = this.props.result;
    let icon = this.props.icon;

    if (!icon) {
      icon = 'mdi-home';
    }

    let iconClassName = 'mdi mdi-48px ' + icon.trim();

    return (
      <div className="media">
        <div className="media-left">
          <p>
            <span className="icon is-large">
              <i className={iconClassName} />
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
              <span className="tag is-dark">{result.type ? capitalizeFirstLetter(MeinItems.getItem(result.type).name) : result.name}</span> &nbsp;
            </span>
            <div className="is-clearfix">
              <a href={result.url} target="_blank">
                <span className="icon is-large">
                  <i className="mdi mdi-16px mdi-web" />
                </span>
                Webseite besuchen</a>
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

  protected isRunning(wlanStatus: string): boolean {
    return wlanStatus === 'in Bearbeitung';
  }
}

/*
  * This JavaScript function takes string as input parameter
  * and capitalizes the first letter
  * @parameter : string
  */
function capitalizeFirstLetter(word: String) {
  if (!word) {
    return;
  }
  const [firstLetter, ...rest] = word.split('');
  return [firstLetter.toUpperCase(), ...rest].join('');
}

export default SearchResultsDefault;
