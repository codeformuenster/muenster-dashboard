import * as React from 'react';
import { ISearchParams } from '../App';

interface IGeoSelectorProps {
    results?: any;
    updateHandler: any;
    searchParams: ISearchParams;
}

class GeoSelector extends React.Component<IGeoSelectorProps, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      showInfoBox: true
    };
  }

  render() {
    return (
      <div className="field">

      {this.state.showInfoBox && (
          <div className="notification is-danger">
          <button className="delete" onClick={() => {this.setState({showInfoBox: false}); }}></button>
          Diese Anwendung funktioniert am besten, wenn Du die Übermittelung Deiner Standort-Daten zulässt.
          Alternativ kannst Du Deine Postleitzahl eingeben, dann versuchen wir ungefähr die von Dir am wenigsten weit entfernten Lokale zu finden. 
        </div>
      )}

      {/* <label className="label is-large">Large input</label> */}
        <div className="control has-icons-left has-icons-right">
          <input className="input is-large" type="text" onChange={this.handleChange} placeholder="Postleitzahl" />
          <span className="icon is-small is-left">
            <i className="fa fa-location-arrow"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fa fa-search"></i>
          </span>
        </div>
      </div>
    );
  }

  /**
   * Transform PLZ into latitude & longitude by calling google api
   */
  private handleChange = (event: any) => {

    const plz = event.target.value;
    if (plz.length === 5) {
      const geoRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + plz + '&region=de&key=AIzaSyBgcOTZ8xPjX-ZE-I6n3vblmM5hM59kUK4';

      fetch(geoRequest).then(function(response: any) {
        var contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        }
        console.log('unexpected response');
      })
      .then((json: any) => {
        let searchParams = this.props.searchParams;
        if (json && json.results && json.results[0] ) {
          searchParams.latitude = json.results[0].geometry.location.lat;
          searchParams.longitude = json.results[0].geometry.location.lng;
        }
        this.props.updateHandler(searchParams);
      })
      .catch(function(error: any) {
        console.log(error);
      });
    }
  }
}
export default GeoSelector;
