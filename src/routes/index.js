import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {Home} from '../components/home'
import { Planets } from '../components/planets/planets';
import { Vehicles } from '../components/vehicles/vehicles';
import { Falcone } from '../components/findFalcone/falcone';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/planets">
          <Planets />
        </Route>
        <Route path="/vehicles">
          <Vehicles />
        </Route>
        <Route path="/find">
          <Falcone />
        </Route>
      <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
