import * as React from 'react';
import { ISearchParams } from '../App';
import { DistrictService, IDistrictResultSlim } from '../Services/districtService';

interface ISearchBarProps {
    results?: any;
    updateHandler: any;
    searchParams: ISearchParams;
}

class SearchBar extends React.Component<ISearchBarProps, any> {

  constructor(props: ISearchBarProps) {
    super(props);
    this.state = {
      districts: []
    };
    new DistrictService().loadDistricts(
      (results: any) => {
        this.setState({districts: results});
      }
    );
  }

  render() {

    const DebounceInput = require('react-debounce-input');

    let districtList = this.state.districts.map((d: IDistrictResultSlim) => {
      return <option key={d.number} value={d.number}>{d.name}</option>
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
                <i className="fa fa-cutlery"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fa fa-search"></i>
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
                  <option value="lunch"> Mittagstische </option>
                  <option value="playground"> Spielplätze </option>
                  <option value="event"> Termine </option>
                  <option value="wifi"> WLANs </option>
                  <option value="kindergarden"> Kitas </option>
                  <option value="wc"> WCs </option>
                  <option value="webcam"> Webcams </option>
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

  private onSearchTermChange = (event: any) => {
    const searchQuery = event.target.value;
    let searchParams = this.props.searchParams;
    searchParams.searchQuery = searchQuery;
    this.props.updateHandler(searchParams);
  }

  private onDistrictChange = (event: React.FormEvent<HTMLSelectElement>) => {
    let searchParams = this.props.searchParams;
    const district = event.currentTarget.value;
    searchParams.district = district;

    if (this.state.districts) {
      /*const { centerLat, centerLon } = this.state.districts.find((d:IDistrictResultSlim) => { return d.number === Number(district) });*/
      const found = this.state.districts.find((d:IDistrictResultSlim) => { return d.number === Number(district) });
      if (found) {
        const { centerLat, centerLon } = found;
        searchParams.centerLat = Number(centerLat);
        searchParams.centerLon = Number(centerLon);
      }
    }
    this.props.updateHandler(searchParams);
  }

  private onTypeChange = (event: React.FormEvent<HTMLSelectElement>) => {
    let searchParams = this.props.searchParams;
    searchParams.category = event.currentTarget.value;
    this.props.updateHandler(searchParams);
  }
}
export default SearchBar;
