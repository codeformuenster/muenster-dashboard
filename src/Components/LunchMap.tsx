import * as React from 'react';
import { ISearchParams, ISearchResult } from '../App';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { IDistrictResultSlim } from '../Services/districtService';
import { MeinItems } from './SearchResults/MeinItem';

// for custom markers
import { divIcon, Point, GeoJSON } from 'leaflet';

// for map positions
import { LatLng } from 'leaflet';

import './LunchMap.css';
import { GeoJsonObject, GeoJsonProperties } from 'geojson';

interface ILunchMapProps {
    results: Array<ISearchResult>;
    updateHandler: any;
    searchParams: ISearchParams;
    districtPolygon?: IDistrictResultSlim;
    districts?: Array<IDistrictResultSlim>;
}

/**
 * This component wraps the LeafLet map. It displays the current position and the various search results as markers.
 */
class LunchMap extends React.Component<ILunchMapProps, any> {

  private markerRef: Marker|null;
  private mapRef: Map;
  private centerPosition: LatLng|null;
  private districtCenterPosition: LatLng|null;
  private districtLayer: GeoJSON|null;
  private districtsLayer: GeoJSON|null;

  render() {

    const { latitude, longitude, centerLat, centerLon } = this.props.searchParams;
    if (latitude || centerLat) {

      let position = new LatLng(latitude, longitude);
      if (centerLat && centerLon) {
        this.districtCenterPosition = new LatLng(centerLat, centerLon);
      }

      this.centerPosition = null;

      const map = (

            <Map center={position} zoom={14} ref={(el: any) => {this.mapRef = el; }}>
              <TileLayer
                url="https://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY29kZTRtcyIsImEiOiJjaXlpeWNuaW8wMDQ0MnFuNGhocGZjMzVlIn0.QBWu9vI5AYJq68dtVIqCJg"
                attribution="&copy;<a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
              />
              <Marker position={position} icon={this.getIcon('user-circle-o', 'igreen')}>
                <Popup>
                  <span>Du bist hier</span>
                </Popup>
              </Marker>
              {this.getAllMarkers(this.props.results)}
            </Map>

        );
      return map;
    } else {
      return (<div />);
    }
  }

    /**
     * componentDidUpdate() is invoked immediately after updating occurs. This method is not called for the initial render.
     *
     * Use this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network
     * requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).
     */
  componentDidUpdate() {
    if (this.markerRef) {
      // This  seems to be the only way to open a marker popup programmatically:
      // - Save the marker ref during render,
      // - then after component did render, call "openPopup().
      // BUT marker.openPopup() does not work, instead you need to use marker.leafletElement.openPopup()
      this.markerRef.leafletElement.openPopup();
    }

    // either zoom in on selected location, or zoom out to center point of search
    if (!this.mapRef) {
      return ;
    }

    let center = new LatLng( this.props.searchParams.latitude, this.props.searchParams.longitude);
    let zoom = 14;

    if (this.centerPosition) {
      center = this.centerPosition;
      zoom = 16;
    } else if (this.districtCenterPosition) {
      center = this.districtCenterPosition;
    }
    this.mapRef.leafletElement.setView(
      center,
      zoom,
      { animate: true, duration: 1}
    );

    // Function for each district overlay
    const onEachFeature = (feature: any, layer: any) => {
      layer.on({
        mouseover: ((lay: any) => {
          lay.target.setStyle({
            color: '#23d160'
          });
        }),
        mouseout: ((lay: any) => {
          lay.target.setStyle({
            color: '#B0B0B0'
          });
        }),
        click: ((lay: any) => {
          let searchParams = this.props.searchParams;
          searchParams.district = lay.target.feature.properties.number;
          let selectedDistrict; // this will hold the corresponding IDistrictResultSlim of the selected district, or None if none is found
      
          if (this.props.districts) {
            const found = this.props.districts.find((d: IDistrictResultSlim) => { return d.number === Number(lay.target.feature.properties.number); });
            if (found) {
              const { centerLat, centerLon } = found;
              searchParams.centerLat = Number(centerLat);
              searchParams.centerLon = Number(centerLon);
              searchParams.selectedId = 0;
              selectedDistrict = found;
            }
          }
          this.props.updateHandler(searchParams, selectedDistrict);
          lay.target.setStyle({
            color: '#BBBBB'
          });
        }),
      });
    };
    // Add district overlays
    if (this.props.districts) {
      if (!this.districtsLayer) {
        this.props.districts.forEach(district => {
          const districtGeojson: GeoJsonObject&GeoJsonProperties = {
            'type': 'Feature',
            'properties': {
              'district': district.name,
              'centerLat': district.centerLat,
              'centerLon': district.centerLon,
              'id': district.id,
              'number': district.number,
            },
            'geometry': {
              ...district.polygon
          }};
            
          this.districtsLayer = new GeoJSON(districtGeojson, {style: {
            'color': '#B0B0B0'
          },
          onEachFeature: onEachFeature
        }).addTo(this.mapRef.leafletElement);
          this.districtsLayer.clearLayers();
          this.districtsLayer.addData(districtGeojson);
        });
      }
    }

    // update the Polygon of the currently selected district
    if (this.props.districtPolygon) {
      if (!this.districtLayer) {
        this.districtLayer = new GeoJSON(this.props.districtPolygon.polygon).addTo(this.mapRef.leafletElement);
      }
      this.districtLayer.clearLayers();
      this.districtLayer.addData(this.props.districtPolygon.polygon);
    }

    this.markerRef = null;
  }

  /**
   * Create map markers for all locations
   */
  private getAllMarkers(locations: Array<ISearchResult>) {

    var rows = [];
    for (let location of locations) {
        const meinItem = MeinItems.getItem(location.type);

        const currentIcon = this.getIcon(meinItem.icon, location.type);
        const locationPos = new LatLng(location.lat, location.lon);

        const markerOpenPopup = () => {
          let searchParams = this.props.searchParams;
          searchParams.selectedId = location.id;
          this.props.updateHandler(searchParams);
        };
        const markerSaveRef = (element: any) => {
          if (this.props.searchParams.selectedId === location.id) {
            this.markerRef = element;
            this.centerPosition = new LatLng(location.lat, location.lon);
          }
        };

        rows.push(
          <Marker
            position={locationPos}
            key={location.id}
            icon={currentIcon}
            onpopupopen={markerOpenPopup}
            ref={markerSaveRef}
          >
            <Popup
              closeButton={false}
            >
              <span>{meinItem.name}:<br /> <b>{location.name}</b></span>
            </Popup>
          </Marker>
        );
    }
    return rows;
  }

  private getIcon(name: string, extraClass: string = '') {
    return divIcon({
      className: 'lu-icon ' + extraClass,
      iconSize: new Point(40, 40),
      html: '<i class="mdi ' + name + ' is-info"></i>'
    });
  }

}

export default LunchMap;
