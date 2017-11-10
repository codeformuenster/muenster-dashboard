import * as React from 'react';
import { ISearchResult } from '../../App';

interface ISearchResultsProps {
    result: ISearchResult;
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
}

export default SearchResults;
