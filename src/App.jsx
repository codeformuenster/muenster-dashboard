import * as React from 'react';
import SearchResults from './Components/SearchResults';
import SearchBar from './Components/SearchBar';
import LunchMap from './Components/LunchMap';
import GeoSelector from './Components/GeoSelector';
import SearchService from './Services/SearchService';
import { DistrictService } from './Services/districtService';
import './App.css';
import { LatLng } from 'leaflet';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.lastSearchHash = '-';
        this.hasGeoSelector = false;
        /*
         * Update search params in this.state
         * - and restart search if necessary
         * - and also update this.state.results
         */
        this.updateSearchParams = (searchParams, district) => {
            const newState = Object.assign({}, this.state, { searchParams: searchParams, district: null });
            if (district) {
                newState.district = district;
            }
            this.setState(newState);
            // note: not an actual hash, this is just for checking if the query has been done before. Consider renaming it
            const searchHash = [searchParams.searchQuery, searchParams.latitude, searchParams.longitude, searchParams.category, searchParams.district].join('');
            // only query/update the locations if the search hash is different from the last one
            if (this.state.searchCache[searchHash]) {
                this.setState(Object.assign({}, this.state, { results: this.state.searchCache[searchHash] }));
            }
            else if (searchHash !== this.lastSearchHash) {
                this.searchService.sendSearchToServer(searchParams, (locations) => {
                    this.state.searchCache[searchHash] = locations;
                    this.setState(Object.assign({}, this.state, { results: locations }));
                });
            }
            this.lastSearchHash = searchHash;
        };
        this.searchService = new SearchService();
        this.state = {
            results: [],
            searchParams: {},
            districts: [],
            district: {},
            searchCache: {}
        };
        new DistrictService().loadDistricts((results) => {
            this.setState(Object.assign({}, this.state, { districts: results }));
        });
    }
    render() {
        console.log('woho we are on!!!');
        return (<div className="container is-fluid">
        <SearchBar updateHandler={this.updateSearchParams} searchParams={this.state.searchParams} districts={this.state.districts}/>

        <div className="tile is-ancestor">
          <div className="tile is-parent">

            <div className="tile">

              <LunchMap results={this.state.results} updateHandler={this.updateSearchParams} searchParams={this.state.searchParams} districtPolygon={this.state.district} districts={this.state.districts}/>
            </div>
          </div>
          <div className="tile is-parent">
            <div className="tile">
              <div className="article mainContent">
                <div className="innerContent detailedItem">
                  
                  {this.hasGeoSelector
            && <GeoSelector updateHandler={this.updateSearchParams} searchParams={this.state.searchParams}/>}
                  <SearchResults updateHandler={this.updateSearchParams} results={this.state.results} searchParams={this.state.searchParams}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }
    componentDidMount() {
        this.getBrowserLocation();
    }
    /**
     * Try getting the device's current position and update the position in the latitude/longitude. If the position cannot
     * be determined use a standard position.
     *
     * TODO: This functionality is implemented at multiple locations. Consider collecting it into one place.
     */
    getBrowserLocation() {
        let handleMissingCoordinate = () => {
            // when the user coordinate is missing or invalid replace it with a default value
            let searchParams = this.state.searchParams;
            searchParams.latitude = 51.9624047;
            searchParams.longitude = 7.6255008;
            this.hasGeoSelector = true;
            this.updateSearchParams(searchParams);
        };
        if (!navigator.geolocation) {
            console.log('<p>Geolokation wird von ihrem Browser nicht unterstützt</p>');
            handleMissingCoordinate();
            return;
        }
        // define the callback functions that are called when the device's position could / could not be determined
        let success = (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            let distance = new LatLng(latitude, longitude).distanceTo(new LatLng(51.9624047, 7.6255008));
            console.log('Lokalisierung war erfolgreich: ' + latitude + ' ' + longitude + '; Distanz: ' + distance);
            // if the distance of the user's position to the city center is over 15 km ignore it
            if (distance > 15000) {
                console.log('Benutzer-Koordinaten sind > 15 km von Stadtzentrum entfernt. Ignoriere dies.');
                handleMissingCoordinate();
            }
            else {
                let searchParams = this.state.searchParams;
                searchParams.latitude = latitude;
                searchParams.longitude = longitude;
                this.updateSearchParams(searchParams);
            }
        };
        let error = () => {
            console.log('Es war nicht möglich Sie zu lokalisieren');
            handleMissingCoordinate();
        };
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
export default App;
