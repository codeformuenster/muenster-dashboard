import React, { Component } from 'react'
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'

// for custom markers
import {
  divIcon,
  Point,
  GeoJSON,
  LatLng, // for map positions
} from 'leaflet'

// for map positions
import './LunchMap.css'
import { getMarkerItem } from '../SearchResults/MeinItem'

/**
 * This component wraps the LeafLet map.
 * It displays the current position and the various search results as markers.
 */

const getIcon = (name, extraClass = '') => divIcon({
  className: `lu-icon ${extraClass}`,
  iconSize: new Point(40, 40),
  html: `<i class="mdi ${name} is-info"></i>`,
})

export class LunchMap extends Component {
  /**
   * componentDidUpdate() is invoked immediately after updating occurs.
   * This method is not called for the initial render.
   *
   * Use this as an opportunity to operate on the DOM when the component has been updated.
   * This is also a good place to do network requests as long as you compare
   * the current props to previous props
   * (e.g. a network request may not be necessary if the props have not changed).
   */
  componentDidUpdate() {
    if (this.markerRef) {
      // This  seems to be the only way to open a marker popup programmatically:
      // - Save the marker ref during render,
      // - then after component did render, call "openPopup().
      // BUT marker.openPopup() does not work,
      // instead you need to use marker.leafletElement.openPopup()
      this.markerRef.leafletElement.openPopup()
    }
    // either zoom in on selected location, or zoom out to center point of search
    if (!this.mapRef) {
      return
    }
    const {
      districts,
      districtPolygon,
      searchParams,
      updateHandler,
    } = this.props
    let center = new LatLng(searchParams.latitude, searchParams.longitude)
    let zoom = 14
    if (this.centerPosition) {
      center = this.centerPosition
      zoom = 16
    } else if (this.districtCenterPosition) {
      center = this.districtCenterPosition
    }
    this.mapRef.leafletElement.setView(center, zoom, { animate: true, duration: 1 })

    // Function for each district overlay
    const onEachFeature = (feature, layer) => {
      layer.on({
        mouseover: ((lay) => {
          lay.target.setStyle({
            color: '#23d160',
          })
        }),
        mouseout: ((lay) => {
          lay.target.setStyle({
            color: '#B0B0B0',
          })
        }),
        click: ((lay) => {          
          searchParams.district = lay.target.feature.properties.number
          // this will hold the corresponding IDistrictResultSlim of
          // the selected district, or None if none is found
          let selectedDistrict
          if (districts) {
            const found = districts.find((d) => (
              d.number === Number(lay.target.feature.properties.number)
            ))
            if (found) {
              const { centerLat, centerLon } = found
              searchParams.centerLat = Number(centerLat)
              searchParams.centerLon = Number(centerLon)
              searchParams.selectedId = 0
              selectedDistrict = found
            }
          }
          updateHandler(searchParams, selectedDistrict)
          lay.target.setStyle({
            color: '#BBBBB',
          })
        }),
      })
    }

    // Add district overlays
    if (districts) {
      if (!this.districtsLayer) {
        districts.forEach((district) => {
          const districtGeojson = {
            type: 'Feature',
            properties: {
              district: district.name,
              centerLat: district.centerLat,
              centerLon: district.centerLon,
              id: district.id,
              number: district.number,
            },
            geometry: { ...district.polygon },
          }
          this.districtsLayer = new GeoJSON(districtGeojson, {
            style: {
              color: '#B0B0B0',
            },
            onEachFeature,
          }).addTo(this.mapRef.leafletElement)
          this.districtsLayer.clearLayers()
          this.districtsLayer.addData(districtGeojson)
        })
      }
    }

    // update the Polygon of the currently selected district
    if (districtPolygon) {
      if (!this.districtLayer) {
        this.districtLayer = new GeoJSON(districtPolygon.polygon).addTo(this.mapRef.leafletElement)
      }
      this.districtLayer.clearLayers()
      this.districtLayer.addData(districtPolygon.polygon)
    }
    this.markerRef = null
  }

    /**
     * Create map markers for all locations
     */
    getAllMarkers(locations) {
      const { searchParams } = this.props
      const rows = []      

      locations.forEach((location) => {
        const markerItem = getMarkerItem(location.type)
        const currentIcon = getIcon(markerItem.icon, location.type)
        const locationPos = new LatLng(location.lat, location.lon)

        const markerOpenPopup = () => {
          // TODO: add here opening result-display
        }

        const markerSaveRef = (element) => {
          if (searchParams.selectedId === location.id) {
            this.markerRef = element
            this.centerPosition = new LatLng(location.lat, location.lon)
          }
        }

        rows.push(
          <Marker
            position={locationPos}
            key={location.id}
            icon={currentIcon}
            onpopupopen={markerOpenPopup}
            ref={markerSaveRef}
          >
            <Popup closeButton={false}>
              <span>{markerItem.name}:<br /> <b>{location.name}</b></span>
            </Popup>
          </Marker>
        )
      })
      return rows
    }

  render() {
    const { searchParams, results } = this.props
    const {
      latitude,
      longitude,
      centerLat,
      centerLon,
    } = searchParams

    console.log('lunch map search params:', searchParams);

    if (latitude || centerLat) {
      const position = new LatLng(latitude, longitude)

      if (centerLat && centerLon) {
        this.districtCenterPosition = new LatLng(centerLat, centerLon)
      }
      this.centerPosition = null

      return (
        <Map
          style={{ height: 'calc(100vh - 50px)', zIndex: '5' }}
          center={position}
          zoom={18}
          ref={(el) => { this.mapRef = el }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY29kZTRtcyIsImEiOiJjaXlpeWNuaW8wMDQ0MnFuNGhocGZjMzVlIn0.QBWu9vI5AYJq68dtVIqCJg"
            attribution="&copy;<a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
          />
          <ZoomControl position="bottomright" />
          <Marker
            position={position}
            icon={getIcon('user-circle-o', 'igreen')}
            zIndexOffset={1000} // to make sure the my-position marker is on top of all other markers
          >
            <Popup>
              <span>Du bist hier</span>
            </Popup>
          </Marker>
          {this.getAllMarkers(results)}
        </Map>
      )
    }
    console.log('no latitude, no centerLat:', latitude, centerLat);
    
    return <div>NO LAT/LON = NO MAP!</div>
  }
}
