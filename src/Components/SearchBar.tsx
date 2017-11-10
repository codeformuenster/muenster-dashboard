import * as React from 'react';
import { ISearchParams } from '../App';

interface ISearchBarProps {
    results?: any;
    updateHandler: any;
    searchParams: ISearchParams;
}

class SearchBar extends React.Component<ISearchBarProps, any> {
  render() {

    const DebounceInput = require('react-debounce-input');

    return (
      <div className="columns">
        <div className="column">
          <div className="field">
          {/* <label className="label is-large">Large input</label> */}
            <div className="control has-icons-left has-icons-right">
              <DebounceInput
                className="input is-large"
                type="text"
                onChange={this.handleChange}
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
                  onChange={this.handleChange}
                >
                  <option value=""> - Typen-Auswahl - </option>
                  <option value="construction"> Baustellen </option>
                  <option value="pool"> Bäder </option>
                  <option value="playground"> Spielplätze </option>
                  <option value="wifi"> WLANs </option>
                  <option value="kindergarden"> Kitas </option>
                  <option value="wc"> WCs </option>
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
                  onChange={this.handleChange}
                >
                  <option value=""> - Stadtteil -  </option>
                  <option value="1"> Kuh </option>
                  <option value="2"> Erpho </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private handleChange = (event: any) => {
    const searchQuery = event.target.value;
    let searchParams = this.props.searchParams;
    searchParams.searchQuery = searchQuery;
    this.props.updateHandler(searchParams);
  }
}
export default SearchBar;
