import * as React from 'react';
import { SearchResults } from './SearchResults';

class SearchResultsLunch extends SearchResults {

  render() {
    console.log('Rendering lunch search result');

    const result = this.props.result;

    return (
      <div className="media">
        <div className="media-left">
          <p>
            <span className="icon is-large">
              <i className="mdi mdi-48px mdi-food" />
            </span>
          </p>
          <div className="distanceDiv has-text-centered">
            <span className="tag is-white">{this.distancePrettifier(result.distance)}</span>
          </div>
        </div>

        <div className="media-content">
          <div className="content">

              <span className="title">{result.name} &nbsp;   <span className="tag is-dark">{result.type}</span></span>

              <div className="is-clearfix">
                {result.description}
              </div>
            </div>
              <div className="tags is-pulled-left">

                <span className="tag is-success">ab {result.properties.minPrice.toFixed(2)} €</span>

                <div className="tag is-warning">
                  <span className="icon" data-balloon={result.properties.phone} data-balloon-pos="up">
                    <i className="fa fa-cutlery" />
                  </span> {result.properties.openToday}
                </div>

                <div className="tag is-warning">
                  {this.renderFeatures(result.properties.paymentMethods)}
                </div>

                {result.properties.phone && (
                  <div className="tag is-warning">
                    <span className="icon" data-balloon={result.properties.phone} data-balloon-pos="up">
                      <i className="fa fa-phone" />
                    </span>
                    <span className="is-hidden-mobile">
                      {result.properties.phone}
                    </span>
                  </div>
                )}

              </div>
              <div className="is-pulled-right columns is-mobile is-1 is-variable">

                {result.properties.url && (
                    <div className="column">
                      <a className="button is-link" href={result.properties.url} target="_blank">
                        <i className="fa fa-home" />
                        <span className="is-hidden-mobile">&nbsp;Homepage</span>
                      </a>
                    </div>
                )}

                {result.properties.menu_url && (
                    <div className="column">
                      <a className="button is-link" href={result.properties.menu_url} target="_blank">Menu</a>
                    </div>
                )}
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
    );
  }

  private renderFeatures(features: string[]) {
    let iconRows = [];

    for (let feature of features) {
      iconRows.push(this.getFeatureIcon(feature));
    }
    return iconRows;
  }

  private getFeatureIcon(feature: string) {
    const iconList = {
      wifi: ['wifi', 'W-Lan'],
      cash: ['money', 'Barzahlung'],
      debit_card: ['credit-card', 'EC-Karte'],
      credit_card: ['cc-visa', 'Kreditkarte'],
      special_card: ['warning', 'Bezahlen nur mit spezieller Karte. Automat am Eingang.']
    };
    const iconSettings = iconList[feature] ? iconList[feature] : null;
    if (iconSettings) {
      return (
        <span className="icon" data-balloon={iconSettings[1]} data-balloon-pos="up">
          <i className={'fa fa-' + iconSettings[0]} />
        </span>
      );
    }
    console.log('Unrecognized feature', feature);
    return null;
  }
}

export default SearchResultsLunch;
