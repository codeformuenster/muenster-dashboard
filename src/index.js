import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom'

import { App } from './App'
import { News } from './News'
import './index.css'

import { Lunchheader } from './Components/Lunchheader'
import { Impressum } from './Pages/Impressum'
import { WorkInProgress } from './Pages/WorkInProgress'
import { Copyright } from './Pages/Copyright'

ReactDOM.render(
  (
    <Router>
      <div className="outerWrapper">
        <Lunchheader />
        <Switch>
          <Route exact={true} path="/" component={App} />
          <Route path="/aktuelles" component={News} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/team" component={WorkInProgress} />
          <Route path="/copyright" component={Copyright} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </Router>
  ),
  document.getElementById('root'),
)
