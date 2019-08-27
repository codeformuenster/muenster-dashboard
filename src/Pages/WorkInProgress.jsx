import * as React from 'react';
import { Link } from 'react-router-dom';
import './WorkInProgress.css';
const logo = require('./../Components/Logo.svg');
class WorkInProgress extends React.Component {
    render() {
        return (<section className="section">
        <div className="container">
          <div className="content">
            <div className="columns">
              <div className="column">
                <div className="LogoBox is-pulled-left">

                  <Link className="App-logo is-pulled-left is-mobile" to="/">
                    <img className="LogoImg" src={logo} width="150" alt="Lunchtimer"/>
                  </Link>

                  <Link to="/">
                    <div className="LogoText">Lunchtimer</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="SmileyIcon column is-narrow">
                <img src="https://emojipedia-us.s3.amazonaws.com/thumbs/160/twitter/103/confused-face_1f615.png"/>
              </div>
              <div className="column has-text-left">
                <h1>Wir arbeiten dran</h1>
                Diese Seite ist leider noch nicht fertig..
              </div>
            </div>
          </div>
        </div>
      </section>);
    }
}
export default WorkInProgress;
