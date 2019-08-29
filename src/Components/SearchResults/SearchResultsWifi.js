import * as React from 'react'
import { SearchResultsBase } from './SearchResultsBase'

class SearchResultsWifi extends SearchResultsBase {
  render() {
    const { result } = this.props
    return (
      <div className="media">
        <div className="media-left">
          <p>
            <span className="icon is-large">
              <i className="mdi mdi-48px mdi-wifi" />
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
              <span className="tag is-dark">W-LAN</span> &nbsp;
              <span className={`tag ${this.isRunning(result.properties.WLAN_STATUS) ? 'is-success' : 'is-danger'}`}>
                {result.properties.WLAN_STATUS}
              </span>
            </span>
            <div className="is-clearfix">
              {result.properties.ADRESSE}
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
    )
  }

  isRunning(wlanStatus) {
    return wlanStatus === 'in Betrieb'
  }
}
export default SearchResultsWifi
