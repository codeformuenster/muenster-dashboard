import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Lunchheader from './Components/Lunchheader';
import Impressum from './Components/Impressum';
import WorkInProgress from './Components/WorkInProgress';
import Copyright from './Components/Copyright';

ReactDOM.render(
  <Router>
    <div>
      <Lunchheader />
      <Route exact path="/" component={App} />
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
