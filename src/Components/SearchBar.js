import * as React from 'react'
// the DebounceInput is a drop-in replacement for <input ..>
// elements that debounces the input, which means that
// quick consecutive changes only cause one onChange() call
import { DebounceInput } from 'react-debounce-input'
/**
 * This component encompasses the search bar,
 * consisting of a text field for searching, a selection box for choosing a
 * target category and a selection box for choosing a district
 */
export class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    /**
     * onChange()-callback for the search term field
     */
    this.onSearchTermChange = (event) => {
      const searchQuery = event.target.value
      const { searchParams, updateHandler } = this.props
      searchParams.searchQuery = searchQuery
      updateHandler(searchParams)
    }
    /**
         * onChange()-callback for the district selection box
         */
    this.onDistrictChange = (event) => {
      // replace the district in the search params with the selected district
      const { districts, searchParams, updateHandler } = this.props
      const district = event.currentTarget.value
      searchParams.district = district
      let selectedDistrict // this will hold the corresponding
      // IDistrictResultSlim of the selected district, or None if none is found

      // try finding the corresponding IDistrictResultSlim by the
      // district's number and update the coordinates in the searchParams
      if (districts) {
        // const { centerLat, centerLon } = this.state.districts.find((d:IDistrictResultSlim) =>
        // { return d.number === Number(district) });
        const found = districts.find((d) => { return d.number === Number(district) })
        if (found) {
          const { centerLat, centerLon } = found
          searchParams.centerLat = Number(centerLat)
          searchParams.centerLon = Number(centerLon)
          selectedDistrict = found
        }
      }
      updateHandler(searchParams, selectedDistrict)
    }
    /**
         * onChange()-callback for the target category selection box
         */
    this.onTypeChange = (event) => {
      const { searchParams, updateHandler } = this.props
      searchParams.category = event.currentTarget.value
      updateHandler(searchParams)
    }
  }

  render() {
    const { districts, searchParams } = this.props
    // create an <option .. />-element for each district.
    // This list will will the district selection box
    const districtList = districts.map((d) => {
      return <option key={d.number} value={d.number}>{d.name}</option>
    })
    return (<>
      <div className="columns notification is-warning is-mobile is-multiline">
        <div className="column is-full-mobile">
          <div className="field">

            <div className="control has-icons-left has-icons-right">
              <DebounceInput
                className="input is-large"
                type="text"
                onChange={this.onSearchTermChange}
                placeholder="Suchbegriff"
              />
              <span className="icon is-small is-left">
                <i className="fa fa-search" />
              </span>
            </div>
          </div>
        </div>
        <div className="column is-half-mobile">
          <div className="field">
            <div className="control has-icons-left has-icons-right">
              <div className="select is-large is-fullwidth">
                <select onChange={this.onTypeChange}>
                  <option value=""> Was suchst Du? </option>
                  <option value="papierkorb"> Abfalleimer </option>
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
        <div className="column is-half-mobile">
          <div className="field">
            <div className="control has-icons-left has-icons-right">
              <div className="select is-large is-fullwidth">
                <select onChange={this.onDistrictChange} value={searchParams.district}>
                  <option value=""> - Stadtteil -  </option>
                  {districtList}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>)
  }
}
