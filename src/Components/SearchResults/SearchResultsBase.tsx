import * as React from 'react';
import { ISearchResult } from '../../App';

export interface ISearchResultsProps {
  result: ISearchResult;
  icon?: string;
}

/**
 * Base class for the various types of possible search results.
 */
export abstract class SearchResultsBase extends React.Component<ISearchResultsProps, any> {
  protected isoDateStringToDate(date: string): any {
    return new Date(Date.parse(date));
  }

  protected toHumanReadableDate(date: any): string {
    return this.isoDateStringToDate(date).toLocaleDateString('de-DE');
  }

  /**
   * Add 'm' to the end of the number and return as string
   */
  protected distancePrettifier(dist: number): string {
    return '' + Math.round(dist) + 'm';
  }

  /**
   * Get the approximate time to arrive via foot in minutes, assuming a speed of 80 metres / minute.
   */
  protected getMinutesByFeet(dist: number): string {
    return Math.round(dist / 80) + ' Min.';
  }

  /**
   * Get the approximate time to arrive via car in minutes, assuming a speed of 250 metres / minute.
   */
  protected getMinutesByCar(dist: number): string {
    return Math.round(dist / 250) + ' Min.';
  }
}

export default SearchResultsBase;
