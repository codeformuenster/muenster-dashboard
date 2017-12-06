import * as React from 'react';
import { ISearchResult } from '../../App';

export interface ISearchResultsProps {
    result: ISearchResult;
    icon?: string;
}

export abstract class SearchResults extends React.Component<ISearchResultsProps, any> {
  protected isoDateStringToDate(date: string): any {
    return new Date(Date.parse(date));
  }

  protected toHumanReadableDate(date: any): string {
    return this.isoDateStringToDate(date).toLocaleDateString('de-DE');
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
}

export default SearchResults;
