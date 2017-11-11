import * as React from 'react';
import './Lunchheader.css';
import { Link } from 'react-router-dom';

const logo = require('./Logo.svg');

class Lunchheader extends React.Component {
  render() {
    return (
      <div>
        <div className="Lunchheader"></div>
        <nav className="navbar is-dark">
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
                Mittagstisch
              </Link>

              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  Menu
                </a>
                <div className="navbar-dropdown">
                  <a className="navbar-item" href="/stadtteile">
                    Stadtteile
                  </a>

                  <a className="navbar-item" href="/locations">
                    Liste aller Locations
                  </a>

                  <hr className="navbar-divider" />

                  <a className="navbar-item" href="/copyright">
                    Copyright
                  </a>
                  <a className="navbar-item" href="/team">
                    Team
                  </a>
                  <a className="navbar-item" href="/unterstuetzen">
                    Unterstützen
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
