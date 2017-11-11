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
              <span>{this.displayName(result.name)} &nbsp; </span>
              <span className="tag is-dark">Spielplatz</span> &nbsp;
              {result.properties.Groesse && <span className="tag is-dark"> {result.properties.Groesse} m<sup>2</sup></span>} &nbsp;
              {this.displayPitch(result.properties.Ball, result.properties.Streetball) && <span className="icon"> <i className="mdi mdi-soccer"></i> </span>} &nbsp;
              {this.displaySkater(result.properties.Skater) && <span> <img className="tag-image" src="/media/skateboard.png"/> </span>} &nbsp;
              {result.properties.Bereich && <span className="tag is-success"> {this.displayArea(result.properties.Bereich)} </span>} &nbsp;
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

  private displayName(name: string): string{
    let result = '';
    result = name.slice(3);

    return result.toLowerCase().replace(/\b\w/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  private displayArea(area: string): string {
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

  private displayPitch(ball: number, streetBall: string): boolean {
    return ball === 1 || ball === 2 || streetBall === 'ja'
  }

  private displaySkater(skater: string): boolean {
    return skater === 'ja';
  }
}

export default SearchResultsPlayground;
