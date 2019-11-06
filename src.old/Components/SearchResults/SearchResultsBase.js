import * as React from 'react'
/**
 * Base class for the various types of possible search results.
 */
export class SearchResultsBase extends React.Component {
  isoDateStringToDate(date) {
    return new Date(Date.parse(date))
  }

  toHumanReadableDate(date) {
    return this.isoDateStringToDate(date).toLocaleDateString('de-DE')
  }

  /**
     * Add 'm' to the end of the number and return as string
     */
  distancePrettifier(dist) {
    return `${Math.round(dist)}m`
  }

  /**
     * Get the approximate time to arrive via foot in minutes, assuming a speed of 80 metres / minute.
     */
  getMinutesByFeet(dist) {
    return `${Math.round(dist / 80)} Min.`
  }

  /**
     * Get the approximate time to arrive via car in minutes, assuming a speed of 250 metres / minute.
     */
  getMinutesByCar(dist) {
    return `${Math.round(dist / 250)} Min.`
  }
}
export default SearchResultsBase
