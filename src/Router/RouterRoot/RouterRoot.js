import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { Home } from '../Pages/Home'
import { News } from '../Pages/News'
import TestPage from './TestPage'
import { Navbar } from '../../Components/Navbar'

// import { Lunchheader } from './Components/Lunchheader'
// import { Impressum } from './Pages/Impressum'
// import { WorkInProgress } from './Pages/WorkInProgress'
// import { Copyright } from './Pages/Copyright'

export class RouterRoot extends Component {
  render() {
    return (
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/aktuelles" component={News} />
            <Route path="/text" component={TestPage} />
            {/* <Route path="/impressum" component={Impressum} />
            <Route path="/team" component={WorkInProgress} />
            <Route path="/copyright" component={Copyright} /> */}
            <Redirect from="*" to="/" />
          </Switch>
        </>
      </Router>
    )
  }
}
