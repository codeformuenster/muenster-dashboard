import * as React from 'react';
import { ISearchParams, ISearchResult } from '../../App';

import './SearchResultsPlayground.css';

interface ISearchResultsProps {
    result: ISearchResult;
    updateHandler: any;
    searchParams: ISearchParams;
}

class SearchResultsPlayground extends React.Component<ISearchResultsProps, any> {

  render() {
    console.log('Rendering wifi search result');
    return (
      <article
        className={'media notification'}
      >
        <div className="media-left">
          <p className="image is-64x64">
            <img className="previewImage" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNC45ODQsNDA3LjU1MmMtNC40ODYtNC4zNy0xMC41NDctNi43MzktMTYuODA5LTYuNTc4Yy0zMy4xODcsMC44NTUtNjQuMjE5LTYuNDc4LTkyLjIyLTI2LjcxICAgIGMtMjUuMy0xOC4yNzktNDUuMDc1LTQ0Ljg0OS02MS41NDctNzEuNDc5Yy05LjIwOS0xNC44ODgtMTcuODk0LTMzLjQ0My00Mi43NDUtNTIuMjFjLTMwLjc2NC0yMy4yMzYtNzEuODk4LTMzLjUzNy0xMDkuNTMxLTMzLjYzICAgIHYtNTAuOTEybDU1LjYxMSw0MS43NTFjMjUuMjM1LDYuNDUyLDQ5LjYzMywxNy42ODcsNzAuMDc3LDM0LjkxNWMxOC41MDYsMTUuNTk1LDI3LjU0MiwzMC4wOTMsMzUuMzM5LDQzLjIyM2wxMC4wNTEtNC40MjMgICAgbDUuOTgsMjkuNjk3YzEyLjIyMywxNy44MjgsMjQuOTY0LDMyLjg2NywzOS4yODcsNDQuNjE1YzEuNjg1LTMuMjU1LDIuMzIxLTcuMDgsMS41NDEtMTAuOTUybC0xOC4xNC05MC4wODQgICAgYy0wLjk5My00LjkyNi00LjE1Mi05LjE0My04LjYwMS0xMS40ODFjLTQuNDQ5LTIuMzM2LTkuNzE0LTIuNTQ0LTE0LjMzMy0wLjU2NmwtMjMuNDU3LDEwLjA0OSAgICBjLTYuMjgtMjUuMjM4LTguNDM2LTMzLjkwMi0xNC41OC01OC41OTZsNTYuNTA1LTc3LjE1MmM0LjUzOC02LjE5NiwzLjE5NC0xNC45LTMuMDAzLTE5LjQzOSAgICBjLTYuMTk3LTQuNTM5LTE0Ljg5OC0zLjE5NC0xOS40NCwzLjAwM2wtNTcuMTMzLDc4LjAxbC0zOC45NTYsMTAuMjY2bC03Ni43NDctNTcuNjE5di05LjJjMC01LjIwMi0yLjM1Mi0xMC4xMjYtNi4zOTktMTMuMzk1ICAgIGwtNzUuNTM2LTYxLjAwOWMtNS4zMjctNC4zMDItMTIuOTM1LTQuMzAyLTE4LjI2MywwTDYuMzk5LDEwOC42NTVDMi4zNTMsMTExLjkyNSwwLDExNi44NDgsMCwxMjIuMDV2MzM3LjAzMyAgICBjMCw0LjY5MywzLjgwNSw4LjQ5Nyw4LjQ5Nyw4LjQ5N2gyMC4zNjZjNC42OTMsMCw4LjQ5OC0zLjgwNSw4LjQ5OC04LjQ5N3YtOTAuMDc0aDEwNy40MTF2OTAuMDc0ICAgIGMwLDQuNjkzLDMuODA1LDguNDk3LDguNDk3LDguNDk3aDQuMTc5YzAuMjEsMCwwLjI3NSwwLDAuMjY2LDBoMTUuOTIxYzQuNjkzLDAsOC40OTgtMy44MDUsOC40OTgtOC40OTdWMjg0LjUzNyAgICBjMTguOTg2LDIuMDUyLDQzLjMyNCw3LjQwNyw2NS43OSwyMC40NzljMTguNTY1LDEwLjgwMywzMy4zMDksMjUuNDI0LDQzLjg3OSw0My41MjNjMjMuMzExLDM5LjkxNyw0NC4wOSw2NS45NjgsNjcuMzczLDg0LjQ3MSAgICBjMzguNjQ1LDMwLjcxMSw4My4wNzksMzguNjU3LDEzMi40OTUsMzIuNTExYzAuMDA5LTAuMDAxLDAuMDE5LTAuMDAyLDAuMDI5LTAuMDAzQzUwMy4zMjYsNDY0LjA2Miw1MTIsNDU0LjIwMSw1MTIsNDQyLjQ4MnYtMTguMyAgICBDNTEyLDQxNy45MTksNTA5LjQ2OSw0MTEuOTIyLDUwNC45ODQsNDA3LjU1MnogTTE0NC43NzIsMzM5LjgyMkwxNDQuNzcyLDMzOS44MjJIMzcuMzYxdi00MC44NjNoMTA3LjQxMVYzMzkuODIyeiAgICAgTTE0NC43NzIsMjY5Ljc3MUwxNDQuNzcyLDI2OS43NzFIMzcuMzYxdi00Mi4wMDdoMTA3LjQxMVYyNjkuNzcxeiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ0OC42MTksMjk0LjIwM2MtNTguMDgzLTQ2LjM3MS01My45NzgtNDMuMTczLTU1LjM1Ni00NC4wMTZjMC40ODYsMS43MTktMC4zMzktMi4xOCwxMC4zMjUsNTAuNzc3bDI0LjIwNiwxOS4zMjUgICAgYzcuMjA0LDUuNzUyLDE3LjcwNiw0LjU3MSwyMy40NTYtMi42MzFDNDU3LjAwMSwzMTAuNDU2LDQ1NS44MjMsMjk5Ljk1NCw0NDguNjE5LDI5NC4yMDN6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8Y2lyY2xlIGN4PSIyNzEuMjYyIiBjeT0iMTQ2LjU3IiByPSIzMi40NSIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />
          </p>
          <div className="distanceDiv has-text-centered">
            <span className="tag is-white">140m</span>
          </div>
        </div>
        <div className="media-content">
          <div className="content">
            <span className="title">
              <span> Vogelrohrsheide &nbsp; </span>
              <span className="tag is-dark">Spielplatz</span> &nbsp;
              <span className="tag is-success">mit integriertem Ballspielplatz</span> &nbsp;
              <span className="icon"> <i className="mdi mdi-soccer"></i> </span>
              <span> <img className="tag-image" src="/media/skateboard.png"/> </span>
            </span>
            <div className="is-clearfix">
              Spielplatz für Kleinkinder sowie schulpflichtige Kinder und Jugendliche zur Versorgung eines Wohnbereiches
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

export default SearchResultsPlayground;
