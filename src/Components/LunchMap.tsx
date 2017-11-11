import * as React from 'react';
import { ISearchParams, ISearchResult } from '../App';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

// for custom markers
import { divIcon, Point } from 'leaflet';

// for map positions
import { LatLng } from 'leaflet';

import './LunchMap.css';

interface ILunchMapProps {
    results: Array<ISearchResult>;
    updateHandler: any;
    searchParams: ISearchParams;
}

class LunchMap extends React.Component<ILunchMapProps, any> {

  private markerRef: Marker|null;
  private mapRef: Map;
  private centerPosition: LatLng|null;

  render() {

    if (this.props.searchParams.latitude) {

      let position = new LatLng( this.props.searchParams.latitude, this.props.searchParams.longitude);

      this.centerPosition = null;
      const map = (

            <Map center={position} zoom={13} ref={(el: any) => {this.mapRef = el; }}>
              <TileLayer
                url="https://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY29kZTRtcyIsImEiOiJjaXlpeWNuaW8wMDQ0MnFuNGhocGZjMzVlIn0.QBWu9vI5AYJq68dtVIqCJg"
                attribution="&copy;<a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"/>
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
    if (this.centerPosition) {
      this.mapRef.leafletElement.setView(
        this.centerPosition,
        16,
        { animate: true, duration: 1}
      );
    } else {
      this.mapRef.leafletElement.setView(
        new LatLng( this.props.searchParams.latitude, this.props.searchParams.longitude),
        13,
        {animate: true, duration: 1});
    }
  }

  /**
   * Create map markers for all locations
   */
  private getAllMarkers(locations: Array<ISearchResult>) {

    var iconDefault = this.getIcon('paw');

    const categoryIcons = {
      'kindergarden': this.getIcon('baby-buggy', 'kindergarden'),
      'construction': this.getIcon('vlc', 'construction'),
      'wifi': this.getIcon('wifi', 'wifji'),
      'playground': this.getIcon('castle', 'playground'),
      'pool': this.getIcon('pool', 'pool'),
      'wc': this.getIcon('human-male-female', 'wc')
    };

    var rows = [];
    for (let location of locations) {

        const currentIcon = categoryIcons[location.type] ? categoryIcons[location.type] : iconDefault;
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
            <Popup>
              <span>{location.name}</span>
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
      html: '<i class="mdi mdi-' + name + ' is-info"></i>'
    });
  }

}

export default LunchMap;
