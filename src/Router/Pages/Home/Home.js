import React, { Component } from 'react'
import { LatLng } from 'leaflet'
import styled from 'styled-components'

import { LunchMap } from 'Components/LunchMap'
import { SearchBar } from 'Components/SearchBar/SearchBar'
import { SearchService } from 'Services/SearchService/searchService'
import { DistrictService } from 'Services/DistrictService/districtService'
import { categories } from 'Constants/SearchTerms'
import { debounce } from 'Util-Functions/debounce'


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
        searchTerm: '',
      },
      zoomLevel: 14,
      searchOffers: [],
    }

    this.searchService = new SearchService()

    this.getBrowserLocation = this.getBrowserLocation.bind(this)
    this.debouncedSearch = debounce(
      500,
      this.sendQuery,
    )
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
      this.sendQuery(searchParams)
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
        this.sendQuery(searchParams)
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
      this.debouncedSearch(searchParams)
      // TODO: bring cache query hashing back to life
    })
  }

  sendQuery = (searchParams) => {
    this.searchService.sendSearchToServer(searchParams, (locations) => {
      if (locations.length > 100) {
        const randomStarter = Math.floor(Math.random() * 3)
        const results = locations.filter((value, idx) => (randomStarter + idx) % 2 === 0)
        this.setState({
          results,
        })
      } else {
        this.setState({
          results: locations,
        })
      }
    })
  }

  escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  handleSearch = (e) => {
    const { districts, searchParams } = this.state
    const searchTerm = e.target.value

    let relevantSubject = []
    let relevantDistrict = []
    if (searchTerm.length > 1) {
      const searchTermRegex = new RegExp(searchTerm, 'i')
      relevantSubject = categories
        .filter(item => {
          return searchTermRegex.test(item.name) || searchTermRegex.test(item.type)
        })
        .map(offer => ({
          ...offer,
          icon: 'Kategorie',
        }))

      relevantDistrict = districts
        .filter(item => {
          return searchTermRegex.test(item.name)
        })
        .map(offer => ({
          ...offer,
          icon: 'Stadtkreis'
        }))
    }

    this.updateSearchParams(
      {
        ...searchParams,
        searchQuery: searchTerm,
        searchTerm,
      },
      null,
      [
        ...relevantSubject,
        ...relevantDistrict,
      ],
    )
  }

  offerSelected = (offer) => {
    const { searchParams } = this.state
    if (offer.type) { // category
      this.setState(
        {
          district: null,
          searchParams: {
            ...searchParams,
            searchTerm: offer.name,
          },
          searchOffers: [],
        }, () => {
          this.sendQuery(
            {
              latitude: 51.9624047,
              longitude: 7.6255008,
              category: offer.type,
              searchTerm: offer.name,
              searchQuery: '',
            },
          )
        },
      )
      return
    }
    if (offer.id) { // district
      this.setState(
        {
          district: {
            ...offer,
          },
          searchParams: {
            ...searchParams,
            searchTerm: offer.name,
          },
          searchOffers: [],
        }, () => {
          this.sendQuery(
            {
              latitude: 51.9624047,
              longitude: 7.6255008,
              district: offer.id,
              searchTerm: offer.name,
              searchQuery: '',
              centerLat: offer.centerLat,
              centerLon: offer.centerLon,
            },
          )
        }
      )    
      return
    }
  }

  handleNewZoomLevel = (zoomLevel) => {
    this.setState({
      zoomLevel,
    })
  }

  render() {
    const {
      searchParams,
      results,
      searchOffers,
      zoomLevel,
    } = this.state

    return (
      <Layout>
        <LunchMap
          results={results}
          // updateHandler={this.updateSearchParams}
          searchParams={searchParams}
          onNewCenter={(newCords) => {
            this.updateSearchParams({
              ...searchParams,
              centerLat: newCords.lat,
              centerLon: newCords.lng,
            })
          }}
          onNewZoomLevel={this.handleNewZoomLevel}
          zoomLevel={zoomLevel}
          // districtPolygon={district}
          // districts={districts}https://github.com/codeformuenster/muenster-dashboard.git
        />
        <SearchBar
          onChange={this.handleSearch}
          searchQuery={searchParams.searchTerm}
          searchOffers={searchOffers}
          offerSelected={this.offerSelected}
          categories={categories}
        />
      </Layout>
    )
  }
}
