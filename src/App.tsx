import * as React from 'react';
import SearchResults from './Components/SearchResults';
import SearchBar from './Components/SearchBar';
import LunchMap from './Components/LunchMap';
import GeoSelector from './Components/GeoSelector';

import SearchService from './Services/SearchService';
import './App.css';

export interface ISearchParams {
  latitude: number;
  longitude: number;
  datetime: string;
  searchQuery: string;
  selectedId: number;
}

export interface ISearchResult {
  id: number;
  lat: number;
  lon: number;
  distance: number;
  name: string;
  address?: string;
  type: string;
  minPrice: number;
  url: string;
  menuUrl: string;
  menuDesc: string;
  phone: string;
  features: Array<string>;
  openToday: string;
}

interface IAppProps {
}

class App extends React.Component<IAppProps, any> {

  private lastSearchHash = '-';
  private searchService: SearchService;
  private hasGeoSelector = false;

  constructor(props: IAppProps) {
    super(props);
    this.searchService = new SearchService();
    this.state = {
      results: [],
      searchParams: {}
    };
  }

  public render() {
    return (
      <div>
        <LunchMap results={this.state.results} updateHandler={this.updateSearchParams} searchParams={this.state.searchParams} />
        <div className="container">

          {/* Geoselector will only be shown if you forbid GEO position access in your browser */}
          {this.hasGeoSelector
            && <GeoSelector updateHandler={this.updateSearchParams} searchParams={this.state.searchParams} />}

          <SearchBar updateHandler={this.updateSearchParams} searchParams={this.state.searchParams} />
          <SearchResults updateHandler={this.updateSearchParams} results={this.state.results} searchParams={this.state.searchParams} />
        </div>
      </div>
    );
  }

  public componentDidMount() {

    this.getBrowserLocation();
  }

  /*
   * Update search params in this.state
   * - and restart search if necessary
   * - and also update this.state.results
   */
  private updateSearchParams = (searchParams: ISearchParams) => {

    this.setState({ searchParams: searchParams });

    const searchHash = '' + searchParams.searchQuery + searchParams.latitude + searchParams.longitude;

    if (searchHash !== this.lastSearchHash) {
      this.searchService.sendSearchToServer(
        searchParams,
        (locations: ISearchResult[]) => {
          this.setState({ results: locations });
        }
      );
    }
    this.lastSearchHash = searchHash;
  }

  private getBrowserLocation() {

    if (!navigator.geolocation) {
      console.log('<p>Geolokation wird von ihrem Browser nicht unterstützt</p>');
      return;
    }

    let success = (position: any) => {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      let searchParams = this.state.searchParams;
      searchParams.latitude = latitude;
      searchParams.longitude = longitude;
      this.updateSearchParams(searchParams);
    };

    let error = () => {
      console.log( 'Es war nicht möglich Sie zu lokalisieren');
      let searchParams = this.state.searchParams;
      searchParams.latitude = 51.9624047;
      searchParams.longitude = 7.6255008;
      this.hasGeoSelector = true;
      this.updateSearchParams(this.state.searchParams);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }

}

export default App;
