import React, { Component } from 'react'
import { LatLng } from 'leaflet'
import styled from 'styled-components'

import { LunchMap } from '../../../Components/LunchMap'
import { SearchBar } from '../../../Components/SearchBar/SearchBar'

const Layout = styled.div`
  position: relative;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  background: red;
`

export class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchParams: {},
    }

    this.getBrowserLocation = this.getBrowserLocation.bind(this)
  }

  componentDidMount() {
    this.getBrowserLocation()
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

  render() {
    const {
      searchParams,
    } = this.state

    return (
      <Layout>
        <LunchMap
          // results={results}
          // updateHandler={this.updateSearchParams}
          searchParams={searchParams}
          // districtPolygon={district}
          // districts={districts}https://github.com/codeformuenster/muenster-dashboard.git
        />
        <SearchBar />
      </Layout>
    )
  }
}
