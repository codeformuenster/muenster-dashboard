import * as React from 'react';
import { SearchResultsBase } from './SearchResultsBase';
class SearchResultsConstruction extends SearchResultsBase {
    render() {
        console.log('Rendering construction search result');
        const result = this.props.result;
        return (<div className="media">
        <div className="media-left">
          <p>
            <span className="icon is-large">
              <i className={'mdi mdi-48px ' + this.props.icon}/>
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
              <span className="tag is-dark">Baustelle</span> &nbsp;
              <span className={'tag ' + (this.isUnderConstruction(result.dateStart) ? 'is-danger' : 'is-success')}>
                {this.isUnderConstruction(result.dateStart) ? 'in Bebauung' : 'geplant'}
              </span>
            </span>
            <div className="is-clearfix">
              {result.description}
            </div>
            <p className="has-text-danger">
              <span className="icon">
                <i className="mdi mdi-timetable"/>
              </span>
              ab {this.toHumanReadableDate(result.dateStart)}
            </p>
          </div>
        </div>
      </div>);
    }
    isUnderConstruction(constructionStartDate) {
        let currentDate = new Date();
        return this.isoDateStringToDate(constructionStartDate) <= currentDate;
    }
}
export default SearchResultsConstruction;
