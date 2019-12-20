import React, { Component } from 'react'
import { LatLng } from 'leaflet'
import styled from 'styled-components'

import { LunchMap } from 'Components/LunchMap'
import { SearchBar } from 'Components/SearchBar/SearchBar'
import { SearchService } from 'Services/SearchService/searchService'
import { DistrictService } from 'Services/DistrictService/districtService'
import { categories } from 'Constants/SearchTerms'

const Layout = styled.div`
  position: relative;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  background: red;
  /* z-index: -1; */
`

export class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      results: [],
      districts: [],
      searchParams: {},
      searchCache: {},
    }

    this.searchService = new SearchService()

    this.getBrowserLocation = this.getBrowserLocation.bind(this)
  }

  componentDidMount() {
    this.getBrowserLocation()
    new DistrictService().loadDistricts((results) => {
      console.log('got districts:', results);
      
      this.setState({
        districts: results,
      })
    })
  }

  getBrowserLocation() {
    const handleMissingCoordinate = () => {
      // when the user coordinate is missing or invalid replace it with a default value
      const { searchParams } = this.state
      searchParams.latitude = 51.9624047
      searchParams.longitude = 7.6255008
      this.hasGeoSelector = true
      this.updateSearchParams(searchParams)
    }
    if (!navigator.geolocation) {
      console.log('<p>Geolokation wird von ihrem Browser nicht unterstützt</p>')
      handleMissingCoordinate()
      return
    }
    // define the callback functions that are called when the device's position
    // could / could not be determined
    const success = (position) => {
      const { latitude } = position.coords
      const { longitude } = position.coords
      const distance = new LatLng(latitude, longitude).distanceTo(new LatLng(51.9624047, 7.6255008))
      console.log(`Lokalisierung war erfolgreich: ${latitude} ${longitude}; Distanz: ${distance}`)
      // if the distance of the user's position to the city center is over 15 km ignore it
      if (distance > 15000) {
        console.log('Benutzer-Koordinaten sind > 15 km von Stadtzentrum entfernt. Ignoriere dies.')
        handleMissingCoordinate()
      } else {
        const searchParams = { ...this.state.searchParams }
        searchParams.latitude = latitude
        searchParams.longitude = longitude
        this.updateSearchParams(searchParams)
        this.setState({
          searchParams,
        })
      }
    }
    const error = () => {
      console.log('Es war nicht möglich Sie zu lokalisieren')
      handleMissingCoordinate()
    }
    navigator.geolocation.getCurrentPosition(success, error)
  }

  updateSearchParams(searchParams, district) {
    console.log('updateSearchParams', searchParams);
    
    const { searchCache } = this.state
    const newState = { ...this.state, searchParams, district: null }
    if (district) {
      newState.district = district
    }
    this.setState(newState)
    // note: not an actual hash, this is just for checking if the query has been done before.
    // Consider renaming it
    const searchHash = [searchParams.searchQuery, searchParams.latitude, searchParams.longitude, searchParams.category, searchParams.district].join('')
    // only query/update the locations if the search hash is different from the last one
    console.log('search hash:', searchHash);
    
    if (searchCache[searchHash]) {
      this.setState({ results: searchCache[searchHash] })
    } else if (searchHash !== this.lastSearchHash) {
      this.searchService.sendSearchToServer(searchParams, (locations) => {
        searchCache[searchHash] = locations
        this.setState({ results: locations })
      })
    }
    this.lastSearchHash = searchHash
  }

  escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  handleSearch = (e) => {
    const { districts, searchParams } = this.state
    const searchTerm = e.target.value
    // const escapedSearchTerm = this.escapeRegExp(searchTerm)
    // const fuzzySearchTerm = `${escapedSearchTerm}`
    // const termRegEx = new RegExp(fuzzySearchTerm, 'i')
    // const relatedDistricts = districts.filter(district => termRegEx.test(district.name))
    // console.log('relatedDistricts:', relatedDistricts);
    // const relatedCategories = categories.filter(category => (
    //   termRegEx.test(category.name) || termRegEx.test(category.type) || termRegEx.test(category.name) || (category.searchTerms && category.searchTerms.some(term => termRegEx.test(term)))
    // ))
    // console.log('relatedCategories:', relatedCategories);
    
    this.updateSearchParams({ ...searchParams, searchQuery: searchTerm })
    
    // this.updateSearchParams({ ...searchParams, searchQuery: fuzzySearchTerm })
  }

  render() {
    const {
      searchParams,
      results,
    } = this.state

    console.log(searchParams);
    

    return (
      <Layout>
        <LunchMap
          results={results}
          // updateHandler={this.updateSearchParams}
          searchParams={searchParams}
          // districtPolygon={district}
          // districts={districts}https://github.com/codeformuenster/muenster-dashboard.git
        />
        <SearchBar onChange={this.handleSearch} />
      </Layout>
    )
  }
}
