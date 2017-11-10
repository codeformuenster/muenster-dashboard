import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Lunchheader from './Components/Lunchheader';
import Impressum from './Pages/Impressum';
import WorkInProgress from './Pages/WorkInProgress';
import Copyright from './Pages/Copyright';

ReactDOM.render(
  <Router>
    <div className="outerWrapper">
      <Lunchheader />
      <Route exact={true} path="/" component={App} />
      <Route path="/impressum" component={Impressum} />

      <Route path="/team" component={WorkInProgress} />
      <Route path="/locations" component={WorkInProgress} />
      <Route path="/stadtteile" component={WorkInProgress} />
      <Route path="/copyright" component={Copyright} />
      <Route path="/unterstuetzen" component={WorkInProgress} />

    </div>
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
