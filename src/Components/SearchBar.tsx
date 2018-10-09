import * as React from 'react';
import { ISearchParams } from '../App';
import { IDistrictResultSlim } from '../Services/districtService';

interface ISearchBarProps {
    results?: any;
    districts: Array<IDistrictResultSlim>;
    updateHandler: any;
    searchParams: ISearchParams;
}

/**
 * This component encompasses the search bar, consisting of a text field for searching, a selection box for choosing a
 * target category and a selection box for choosing a district
 */
class SearchBar extends React.Component<ISearchBarProps, any> {

  constructor(props: ISearchBarProps) {
    super(props);
  }

  render() {
    // the DebounceInput is a drop-in replacement for <input ..> elements that debounces the input, which means that
    // quick consecutive changes only cause one onChange() call
    const DebounceInput = require('react-debounce-input');

    // create an <option .. />-element for each district. This list will will the district selection box
    let districtList = this.props.districts.map((d: IDistrictResultSlim) => {
      return <option key={d.number} value={d.number}>{d.name}</option>;
    });

    return (
      <div className="columns notification is-warning">
        <div className="column">
          <div className="field">
          {/* <label className="label is-large">Large input</label> */}
            <div className="control has-icons-left has-icons-right">
              <DebounceInput
                className="input is-large"
                type="text"
                onChange={this.onSearchTermChange}
                placeholder="Suchbegriff"
              />
              <span className="icon is-small is-left">
                <i className="fa fa-cutlery" />
              </span>
              <span className="icon is-small is-right">
                <i className="fa fa-search" />
              </span>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <div className="control has-icons-left has-icons-right">
              <div className="select is-large is-fullwidth">
                <select
                  onChange={this.onTypeChange}
                >
                  <option value=""> Was suchst Du? </option>
                  <option value="construction"> Baustellen </option>
                  <option value="pool"> Bäder </option>
                  <option value="kindergarden"> Kitas </option>
                  <option value="lunch"> Mittagstische </option>
                  <option value="container"> Recycling-Container </option>
                  <option value="playground"> Spielplätze </option>
                  <option value="kindergarden"> Stillplätze </option>
                  <option value="event"> Termine </option>
                  <option value="wc"> WCs </option>
                  <option value="webcam"> Webcams </option>
                  <option value="wifi"> WLANs </option>
                </select>

              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <div className="control has-icons-left has-icons-right">
              <div className="select is-large is-fullwidth">
                <select
                  onChange={this.onDistrictChange}
                >
                  <option value=""> - Stadtteil -  </option>
                  {districtList}

                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * onChange()-callback for the search term field
   */
  private onSearchTermChange = (event: any) => {
    const searchQuery = event.target.value;
    let searchParams = this.props.searchParams;
    searchParams.searchQuery = searchQuery;
    this.props.updateHandler(searchParams);
  }

  /**
   * onChange()-callback for the district selection box
   */
  private onDistrictChange = (event: React.FormEvent<HTMLSelectElement>) => {
    // replace the district in the search params with the selected district
    let searchParams = this.props.searchParams;
    const district = event.currentTarget.value;
    searchParams.district = district;
    let selectedDistrict; // this will hold the corresponding IDistrictResultSlim of the selected district, or None if none is found

    // try finding the corresponding IDistrictResultSlim by the district's number and update the coordinates in the searchParams
    if (this.props.districts) {
      /*const { centerLat, centerLon } = this.state.districts.find((d:IDistrictResultSlim) => { return d.number === Number(district) });*/
      const found = this.props.districts.find((d: IDistrictResultSlim) => { return d.number === Number(district); });
      if (found) {
        const { centerLat, centerLon } = found;
        searchParams.centerLat = Number(centerLat);
        searchParams.centerLon = Number(centerLon);
        selectedDistrict = found;
      }
    }
    this.props.updateHandler(searchParams, selectedDistrict);
  }

  /**
   * onChange()-callback for the target category selection box
   */
  private onTypeChange = (event: React.FormEvent<HTMLSelectElement>) => {
    let searchParams = this.props.searchParams;
    searchParams.category = event.currentTarget.value;
    this.props.updateHandler(searchParams);
  }
}
export default SearchBar;
