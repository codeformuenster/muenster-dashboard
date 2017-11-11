import * as React from 'react';
import SearchResults from './Components/SearchResults';
import LunchMap from './Components/LunchMap';
import GeoSelector from './Components/GeoSelector';
import NewsList from './Components/NewsList';
import SearchService from './Services/SearchService';
import './FrontPage.css';

export interface ISearchParams {
  latitude: number;
  longitude: number;
  datetime: string;
  searchQuery: string;
  selectedId: number;
  category: string;
  district: string;
}

export interface ISearchResult {
  id: number;
  lat: number;
  lon: number;
  distance: number;
  name: string;
  description: string;
  properties: any;
  type: string;
  url: string;
  dateStart: string;
  dateEnd: string;
  address?: string;
}

export interface IDistrictResultSlim {
  name: string;
  number: number;
  id: number;
}

interface IAppProps {
}

class FrontPage extends React.Component<IAppProps, any> {

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
      <div className="container">

        <h2 className="title">Aktuell im Viertel</h2>
        <div className="limitedHeight">

          <div className="tile is-ancestor limitedHeight">
            <div className="tile is-parent">

              <div className="tile frontpageMap">

                <LunchMap results={this.state.results} updateHandler={this.updateSearchParams} searchParams={this.state.searchParams} />

              </div>
            </div>

            <div className="tile is-parent">
              <div className="tile">
                <div className="article mainContent">
                  <div className="innerContent">
                    {/* Geoselector will only be shown if you forbid GEO position access in your browser */}
                    {this.hasGeoSelector
                      && <GeoSelector updateHandler={this.updateSearchParams} searchParams={this.state.searchParams} />}
                    <SearchResults limit={3} updateHandler={this.updateSearchParams} results={this.state.results} searchParams={this.state.searchParams} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="column">
            <NewsList searchParams={this.state.searchParams} />
          </div>
          <div className="column">
            <h2 className="title">Wetter für die nächsten zwei Tage</h2>
            <img src="https://www.yr.no/place/Germany/North_Rhine-Westphalia/M%C3%BCnster/meteogram.png" />
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

    const searchHash = '' + searchParams.searchQuery + searchParams.latitude + searchParams.longitude + searchParams.category + searchParams.district;

    if (searchHash !== this.lastSearchHash) {
      this.searchService.sendFrontpageSearchToServer(
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

export default FrontPage;
