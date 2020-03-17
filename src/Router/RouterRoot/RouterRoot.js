import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { Navbar } from '../../Components/Navbar'

import { Home } from '../Pages/Home'
import { News } from '../Pages/News'
import { Impressum } from '../Pages/Impressum'
import { Copyright } from '../Pages/Copyright'

export class RouterRoot extends Component {
  render() {
    return (
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/aktuelles" component={News} />
            <Route path="/copyright" component={Copyright} />
            <Route path="/impressum" component={Impressum} />
            <Redirect from="*" to="/" />
          </Switch>
        </>
      </Router>
    )
  }
}
