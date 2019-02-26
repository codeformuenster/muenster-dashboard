import * as React from 'react';
// import { SearchResults } from './SearchResults/SearchResults';
import { ISearchParams, ISearchResult } from '../App';
import './SearchResultDetailled.css';
import { MeinItems } from './SearchResults/MeinItem';

interface ISearchResultDetailledProps {
  result: ISearchResult;
  updateHandler: any;
  searchParams: ISearchParams;
}

/**
 * This component displays detailed information about one search result, like the distance and approximate arrival times.
 */
class SearchResultDetailled extends React.Component<ISearchResultDetailledProps, any> {

  render() {
    const result = this.props.result;
    console.log('Detailled result:', result);
    const meinItem = MeinItems.getItem(result.type);

    return (
      <article
        key={result.id}
        className={'notification detailedItem'}
      >
        <div className="media">
          <div className="media-left">
            <p>
              <span className={'icon detailIcon notification is-large ' + meinItem.color}>
                <i className={'mdi mdi-48px ' + meinItem.icon} />
              </span>
            </p>
            <div className="distanceDiv has-text-centered">

              <span className={'tag ' + meinItem.color}>{meinItem.name}</span>
              <br />
              <span className="tag is-white">{this.distancePrettifier(result.distance)}</span>
            </div>
          </div>
          <div className="media-content">
            <div className="content">
              <div className="pull-right closeBtn">
                <button onClick={e => this.toggleSelection()} className="delete" aria-label="delete" />
              </div>
              <span className="title">
                <span>{result.name} &nbsp; </span>

              </span>
              <div className="is-clearfix">

                {result.url && (
                  <a href={result.url} target="_blank">
                    <span className="icon is-large">
                      <i className="mdi mdi-16px mdi-web" />
                    </span>
                    Webseite besuchen
                    </a>
                )}

                {result.dateStart && (
                  <div>
                    <p className="has-text-danger">
                      <span className="icon">
                        <i className="mdi mdi-timetable" />
                      </span>
                      Startdatum: {this.toHumanReadableDate(result.dateStart)}
                    </p>
                    <p className="has-text-danger">
                      <span className="icon">
                        <i className="mdi mdi-timetable" />
                      </span>
                      Enddatum: {result.dateEnd ? this.toHumanReadableDate(result.dateEnd) : 'unbekannt'}
                    </p>
                  </div>
                )}

                <div className="properties">
                  <span><i>Typ:</i> {meinItem.name}</span>
                  {this.renderProperties(result.properties)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   */
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  protected isoDateStringToDate(date: string): any {
    return new Date(Date.parse(date));
  }

  protected toHumanReadableDate(date: any): string {
    let isoDate = this.isoDateStringToDate(date);
    if (isoDate.getHours() > 0) {
      return isoDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
    } else {
      return isoDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' });
    }
  }

  protected distancePrettifier(dist: number): string {
    return '' + Math.round(dist) + 'm';
  }

  protected getMinutesByFeet(dist: number): string {
    return Math.round(dist / 80) + ' Min.';
  }

  protected getMinutesByCar(dist: number): string {
    return Math.round(dist / 250) + ' Min.';
  }

  protected isRunning(wlanStatus: string): boolean {
    return wlanStatus === 'in Bearbeitung';
  }

  private capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  private renderProperties(properties: any) {
    const response = [];

    for (const key in properties) {
      if (key) {
        switch (key.toLowerCase()) {
          case 'rechtswert':
          case 'hochwert':
          case 'kita_id':
          case 'e_name':
          case 'rechts':
          case 'lfdnr':
          case 'hoch':
          case 'id':
            continue;
          default:
        }
        response.push(<span><i>{this.capitalizeFirstLetter(key)}:</i> {properties[key]}</span>);
      }
    }
    return response;
  }

  private toggleSelection() {
    const sp = this.props.searchParams;
    sp.selectedId = 0;
    this.props.updateHandler(sp);
  }
}

export default SearchResultDetailled;
