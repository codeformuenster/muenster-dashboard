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
  height: 100%;
  max-height: 100%;
`

export class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      results: [],
      districts: [],
      searchParams: {
        searchTerm: ''
      },
      searchOffers: [],
    }

    this.searchService = new SearchService()

    this.getBrowserLocation = this.getBrowserLocation.bind(this)
  }

  componentDidMount() {
    this.getBrowserLocation()
    new DistrictService().loadDistricts((results) => {
      
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
      console.log('Geolokation wird von ihrem Browser nicht unterstützt')
      handleMissingCoordinate()
      return
    }
    // define the callback functions that are called when the device's position
    // could / could not be determined
    const success = (position) => {
      const { latitude } = position.coords
      const { longitude } = position.coords
      const distance = new LatLng(latitude, longitude).distanceTo(new LatLng(51.9624047, 7.6255008))
      // if the distance of the user's position to the city center is over 15 km ignore it
      if (distance > 15000) {
        handleMissingCoordinate()
      } else {
        const searchParams = { ...this.state.searchParams }
        
        searchParams.latitude = latitude
        searchParams.longitude = longitude
        this.updateSearchParams(searchParams)
      }
    }
    const error = () => {
      handleMissingCoordinate()
    }
    navigator.geolocation.getCurrentPosition(success, error)
  }

  updateSearchParams = (searchParams, district, searchOffers) => {
    const newState = { ...this.state, searchParams, district: null }
    
    if (district) {
      newState.district = district
    }
    if (searchOffers) {
      newState.searchOffers = searchOffers
    }
    this.setState({
      ...newState,
    }, () => {
      this.sendQuery(searchParams)
      // TODO: bring cache query hashing back to life
    })
  }

  sendQuery = (searchParams) => {
    this.searchService.sendSearchToServer(searchParams, (locations) => {
      this.setState({ results: locations })
    })
  }

  escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  handleSearch = (e) => {    
    const { districts, searchParams } = this.state
    const searchTerm = e.target.value

    let relevantSubject = []
    if (searchTerm.length > 1) {
      relevantSubject = categories
        .filter(item => {
          return item.name.includes(searchTerm) || item.type.includes(searchTerm)
        })
        .map(offer => ({
          ...offer,
          icon: 'category',
        }))
    }

    let relevantDistrict = []
    if (searchTerm.length > 1) {
      relevantDistrict = districts
        .filter(item => {
          return item.name.includes(searchTerm)
        })
        .map(offer => ({
          ...offer,
          icon: 'district'
        }))
    }
    
    this.updateSearchParams({ ...searchParams, searchQuery: searchTerm, searchTerm, }, null, [...relevantSubject, ...relevantDistrict])
  }

  offerSelected = (offer) => {

    if (offer.type) {
      this.updateSearchParams(
        {
          latitude: 51.9624047,
          longitude: 7.6255008,
          category: offer.type,
          searchTerm: offer.name,
          searchQuery: '',
        },
        null, // TODO: offered districts
        []
      )
      return
    }
    if (offer.id) {      
      this.updateSearchParams(
        {
          latitude: 51.9624047,
          longitude: 7.6255008,
          district: offer.id,
          searchTerm: offer.name,
          searchQuery: '',
          centerLat: offer.centerLat,
          centerLon: offer.centerLon
        },
        {
          ...offer,
        }, // TODO: offered districts
        []
      )
      return
    }

  }

  render() {
    const {
      searchParams,
      results,
      searchOffers,
    } = this.state

    console.log('searchParams:', searchParams);
    

    return (
      <Layout>
        <LunchMap
          results={results}
          // updateHandler={this.updateSearchParams}
          searchParams={searchParams}
          // districtPolygon={district}
          // districts={districts}https://github.com/codeformuenster/muenster-dashboard.git
        />
        <SearchBar
          onChange={this.handleSearch}
          searchQuery={searchParams.searchTerm}
          searchOffers={searchOffers}
          offerSelected={this.offerSelected}
        />
      </Layout>
    )
  }
}
