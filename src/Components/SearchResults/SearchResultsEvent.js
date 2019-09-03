import * as React from 'react'
import { SearchResultsBase } from './SearchResultsBase'

class SearchResultsEvent extends SearchResultsBase {
  render() {
    const { result } = this.props
    return (
      <div className="media">
        <div className="media-left">
          <p>
            <span className="icon is-large">
              <i className="mdi mdi-48px mdi-calendar-text" />
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
              <span className="tag is-dark">Termin</span> &nbsp;
            </span>
            <div className="is-clearfix">
              <a href={result.url} target="_blank">
                <span className="icon is-large">
                  <i className="mdi mdi-16px mdi-web" />
                </span>
                Webseite besuchen
              </a>

              <p className="has-text-danger">
                <div>
                  <span className="icon">
                    <i className="mdi mdi-timetable" />
                  </span>
                  am {this.toHumanReadableDate(result.dateStart)}
                </div>
                <div className="has-text-danger">
                  <span className="icon">
                    <i className="mdi mdi-walk" />
                  </span>
                  {this.getMinutesByFeet(result.distance)}
                  &bull;
                  <span className="icon">
                    <i className="mdi mdi-car" />
                  </span>
                  {this.getMinutesByCar(result.distance)}
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  isRunning(wlanStatus) {
    return wlanStatus === 'in Bearbeitung'
  }
}
export default SearchResultsEvent
