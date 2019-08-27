import * as React from 'react';
import './Lunchheader.css';
import { Link } from 'react-router-dom';
import { DistrictService } from '../Services/districtService';
const logo = require('./Logo.svg');
/**
 * This component encompasses the header which contains the logo and the navigation bar. On small screens, the menu items
 * collapse to a hamburger icon.
 */
class Lunchheader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            district: ''
        };
        // Oh noes! Dirty hack :(
        if (!navigator.geolocation) {
            return;
        }
        // define a callback function that is called with the device's position when it could be determined
        const success = (position) => {
            new DistrictService().queryDistrictByCoordinates(position.coords)
                .then((district) => {
                this.setState({ district });
            })
                .catch(() => { });
        };
        // if the position could not be determined just do nothing here
        const error = () => { };
        // try determining the current position of the device
        navigator.geolocation.getCurrentPosition(success, error);
    }
    render() {
        let currentDistrict = <p />;
        if (this.state.district) {
            currentDistrict = <p className="control">Du bist hier: <span className="lunchtext">{this.state.district}</span></p>;
        }
        return (<div>
        <div className="Lunchheader"/>
        <nav className="navbar is-dark msRed">
          <div className="navbar-brand">
            <Link className="App-logo" to="/">

              <img className="LogoImg" src={logo} width="60" height="70" alt="Stadtteil-Dashboard"/>

            </Link>

            <Link className="navbar-item" to="/">
              <div className="lunchtext">MEIN-MS.de</div>
            </Link>

            <div className="navbar-burger burger" data-target="lunchMenuDropdown">
              <span />
              <span />
              <span />
            </div>

          </div>

          <div id="lunchMenuDropdown" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">
                Startseite
              </Link>
              <Link className="navbar-item" to="/aktuelles">
                <span className="icon msIcon">
                  <i className="fa fa-map-marker fa-2x" aria-hidden="true"/>
                </span>
                Aktuell im Viertel
              </Link>

              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  Menu
                </a>
                <div className="navbar-dropdown">

                  <a className="navbar-item" href="/copyright">
                    Copyright
                  </a>
                  
                  <a className="navbar-item" href="/impressum">
                    Kontakt &amp; Impressum
                  </a>

                </div>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="field is-grouped">
                  {currentDistrict}
                
                </div>
              </div>
            </div>

          </div>
        </nav>
      </div>);
    }
}
export default Lunchheader;
