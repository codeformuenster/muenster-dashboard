import * as React from 'react';
import './Lunchheader.css';
import { Link } from 'react-router-dom';
import { DistrictService } from '../Services/districtService';

const logo = require('./Logo.svg');

class Lunchheader extends React.Component<any,any> {

  constructor(props: any) {
    super(props);
    this.state = {
      district: ''
    };

    // Oh noes! Dirty hack :(
    if (!navigator.geolocation) {
      return;
    }

    const success = (position: any) => {
      new DistrictService().queryDistrictByCoordinates(position.coords)
        .then((district:string) => {
          this.setState({ district });
        })
        .catch(() => {});
    };

    const error = () => {};

    navigator.geolocation.getCurrentPosition(success, error);
  }

  render() {
    let currentDistrict = <p></p>
    if (this.state.district) {
      currentDistrict = <p className="control">Du bist hier: {this.state.district}</p>
    }
    return (
      <div>
        <div className="Lunchheader"></div>
        <nav className="navbar is-dark msRed">
          <div className="navbar-brand">
            <Link className="App-logo" to="/">

              <img
                className="LogoImg"
                src={logo}
                width="60"
                height="70"
                alt="Stadtteil-Dashboard"
              />

            </Link>

            <Link className="navbar-item" to="/">
              <div className="lunchtext">MEIN-MS.de</div>
            </Link>

            <div className="navbar-burger burger" data-target="lunchMenuDropdown">
              <span> </span>
              <span> </span>
              <span> </span>
            </div>

          </div>

          <div id="lunchMenuDropdown" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">
                Startseite
              </Link>
              <Link className="navbar-item" to="/stadtviertel">
                <span className="icon msIcon">
                  <i className="fa fa-map-marker fa-2x" aria-hidden="true"></i>
                </span>
                Erkunde Dein Stadtviertel
              </Link>

              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  Menu
                </a>
                <div className="navbar-dropdown">

                  <a className="navbar-item" href="/copyright">
                    Copyright
                  </a>
                  <a className="navbar-item" href="/team">
                    Team
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
                {/*
                  <p className="control">
                    <a
                      className="bd-tw-button button"
                      data-social-network="Twitter"
                      data-social-action="tweet"
                      data-social-target="http://localhost:4000"
                      target="_blank"
                      href="https://twitter.com/intent/tweet?text=Lunchtimer:"
                    >
                      <span className="icon">
                        <i className="fa fa-twitter" />
                      </span>
                      <span>
                        Tweet
                      </span>
                    </a>
                  </p>

                  <p className="control">
                    <a className="button is-primary" href="https://github.com/jgthms/bulma/archive/0.5.1.zip">
                      <span className="icon">
                        <i className="fa fa-upload"></i>
                      </span>
                      <span>Mitmachen</span>
                    </a>
                  </p>

                  */}
                </div>
              </div>
            </div>

          </div>
        </nav>
      </div>
    );
  }
}

export default Lunchheader;
