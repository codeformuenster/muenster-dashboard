import * as React from 'react';
import { ISearchParams, ISearchResult } from '../../App';

import './SearchResultsConstruction.css';

interface ISearchResultsProps {
    result: ISearchResult;
    updateHandler: any;
    searchParams: ISearchParams;
}

class SearchResultsConstruction extends React.Component<ISearchResultsProps, any> {

  render() {
    console.log('Rendering construction search result');
    return (
      <article
        className={'media notification'}
      >
        <div className="media-left">
          <p>
            <span className="icon is-large">
              <i className="mdi mdi-48px mdi-vlc"></i>
            </span>
          </p>
          <div className="distanceDiv has-text-centered">
            <span className="tag is-white">140m</span>
          </div>
        </div>
        <div className="media-content">
          <div className="content">
            <span className="title">
              <span>Stadtwerke Münster GmbH &nbsp; </span>
              <span className="tag is-dark">Baustelle</span> &nbsp;
              <span className="tag is-danger">in Bebauung</span>
            </span>
            <div className="is-clearfix">
              An der Meerwiese, Hoher Heckenweg K 8, Volbachweg
            </div>
            <p className="has-text-danger">
              <span className="icon">
                <i className="mdi mdi-timetable"></i>
              </span>
              ab 10. Nov. 2017
            </p>
          </div>
        </div>
      </article>
    );
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

export default SearchResultsConstruction;
