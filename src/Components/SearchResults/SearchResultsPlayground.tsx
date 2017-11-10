import * as React from 'react';
import { SearchResults } from './SearchResults';

import './SearchResultsPlayground.css';

class SearchResultsPlayground extends SearchResults {

  render() {
    console.log('Rendering wifi search result');

    const result = this.props.result;

    return (
      <div className="media">
        <div className="media-left">
          <p>
            <span className="icon is-large">
              <i className="mdi mdi-48px mdi-castle"></i>
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
              <span className="tag is-dark">Spielplatz</span> &nbsp;
              <span className="tag is-success">
                {this.displayArea(result.properties.Bereich)}
      {/*}
      Ball 2
      Bereich A
      Groesse 2069qm
      Skater
      Streetball */}

              </span> &nbsp;
              {this.displayPitch(result.properties.Ball) && <span className="icon"> <i className="mdi mdi-soccer"></i> </span>}
              <span> <img className="tag-image" src="/media/skateboard.png"/> </span>
            </span>
            <div className="is-clearfix">
              {result.description}
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

  protected displayArea(area: string): string {
    let result = '';

    switch (area) {
    case 'A':
        result = 'Für alle Altersklassen';
        break;
    case 'B/C':
        result = 'Für Kleinkinder und schulpflichtige Kinder und Jugendliche';
        break;
    case 'C':
        result = 'Für Kleinkinder';
        break;
    case 'A+B/C':
        result = 'Für alle Altersklassen';
    default:
    }

    return result;
  }

  protected displayPitch(pitch: number): boolean {
    return pitch == 1 || pitch == 2
  }
  //private distancePrettifier(dist: number): string {

    //return '' + Math.round(dist) + 'm';
  //}

  /**
   * Onclick handler for search result row, updates selectedId in searchParams
   */
  //private toggleSelection = (event: any, id: number) => {

    //let searchParams = this.props.searchParams;
    //if (searchParams.selectedId === id) {
      //searchParams.selectedId = 0;
    //} else {
      //searchParams.selectedId = id;
    //}
    //this.props.updateHandler(searchParams);
  //}

  /**
   * get the feature icons html
   */
  //private renderFeatures(features: string[]) {
    //let iconRows = [];

    //for (let feature of features) {
      //iconRows.push(this.getFeatureIcon(feature));
    //}
    //return iconRows;
  //}

  /**
   * Get icon html for the feature named $feature
   */
  //private getFeatureIcon(feature: string) {

    //const iconList = {
      //wifi: ['wifi', 'W-Lan'],
      //cash: ['money', 'Barzahlung'],
      //debit_card: ['credit-card', 'EC-Karte'],
      //credit_card: ['cc-visa', 'Kreditkarte'],
      //special_card: ['warning', 'Bezahlen nur mit spezieller Karte. Automat am Eingang.']
    //};
    //const iconSettings = iconList[feature] ? iconList[feature] : null;
    //if (iconSettings) {
      //return (
        //<span className="icon" data-balloon={iconSettings[1]} data-balloon-pos="up">
          //<i className={'fa fa-' + iconSettings[0]}></i>
        //</span>
      //);
    //}
    //console.log('Unrecognized feature', feature);
    //return null;
  //}
}

export default SearchResultsPlayground;
