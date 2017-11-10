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
