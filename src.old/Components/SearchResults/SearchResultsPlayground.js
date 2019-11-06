import * as React from 'react'
import { SearchResultsBase } from './SearchResultsBase'

class SearchResultsPlayground extends SearchResultsBase {
  render() {
    const { result } = this.props
    return (
      <div className="media">
        <div className="media-left">
          <p>
            <span className="icon is-large">
              <i className="mdi mdi-48px mdi-castle" />
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
              {this.displayPitch(result.properties.Ball, result.properties.Streetball)
            && (
            <span data-balloon="Mit Ballspielplatz" data-balloon-pos="up" className="icon">
              <i className="mdi mdi-soccer" />
            </span>
            )} &nbsp;
              {this.displaySkater(result.properties.Skater) && <span> <img className="tag-image" src="/media/skateboard.png" /> </span>} &nbsp;
              {result.properties.Bereich && <span className="tag is-success"> {this.displayArea(result.properties.Bereich)} </span>} &nbsp;
            </span>
            <div className="is-clearfix">
              {result.description}
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

  displayName(name) {
    let result = ''
    result = name.slice(3)
    return result.toLowerCase().replace(/\b\w/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  displayArea(area) {
    let result = ''
    switch (area) {
      case 'A':
        result = 'Großer Spielplatz'
        break
      case 'B/C':
        result = 'Wohngebiets-Spielplatz'
        break
      case 'C':
        result = 'Für Kleinkinder'
        break
      case 'A+B/C':
        result = 'Groß, und extra Kleinkinderbereich'
        break
      default:
    }
    return result
  }

  displayPitch(ball, streetBall) {
    return ball === 1 || ball === 2 || streetBall === 'ja'
  }

  displaySkater(skater) {
    return skater === 'ja'
  }
}
export default SearchResultsPlayground
