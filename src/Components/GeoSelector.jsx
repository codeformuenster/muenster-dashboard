import * as React from 'react';
/**
 * This component is usually displayed above the search results and contains a text field which can be used to manually input a postcode. It can also contain a info box that
 * informs the user about allowing the site to use the device's position automatically.
 */
class GeoSelector extends React.Component {
    constructor(props) {
        super(props);
        /**
         * Transform PLZ into latitude & longitude by calling google api
         */
        this.handleChange = (event) => {
            const plz = event.target.value;
            if (plz.length === 5) {
                const geoRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + plz + '&region=de&key=AIzaSyBgcOTZ8xPjX-ZE-I6n3vblmM5hM59kUK4';
                fetch(geoRequest).then(function (response) {
                    var contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        return response.json();
                    }
                    console.log('unexpected response');
                })
                    .then((json) => {
                    let searchParams = this.props.searchParams;
                    if (json && json.results && json.results[0]) {
                        searchParams.latitude = json.results[0].geometry.location.lat;
                        searchParams.longitude = json.results[0].geometry.location.lng;
                    }
                    this.props.updateHandler(searchParams);
                })
                    .catch(function (error) {
                    console.log(error);
                });
            }
        };
        this.state = {
            showInfoBox: true
        };
    }
    render() {
        return (<div className="field">

      {this.state.showInfoBox && (<div className="notification is-danger">
          <button className="delete" onClick={() => { this.setState({ showInfoBox: false }); }}/>
          Diese Anwendung funktioniert am besten, wenn Du die Übermittlung Deiner Standort-Daten zulässt.
          Alternativ kannst Du Deine Postleitzahl eingeben, dann versuchen wir ungefähr die von Dir am wenigsten weit entfernten Lokale zu finden.
        </div>)}

      
        <div className="control has-icons-left has-icons-right">
          <input className="input is-large" type="text" onChange={this.handleChange} placeholder="Postleitzahl"/>
          <span className="icon is-small is-left">
            <i className="fa fa-location-arrow"/>
          </span>
          <span className="icon is-small is-right">
            <i className="fa fa-search"/>
          </span>
        </div>
      </div>);
    }
}
export default GeoSelector;
