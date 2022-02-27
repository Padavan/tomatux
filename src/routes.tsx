import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from "react-router-dom";

import { Timer } from './components/Timer';
import { Settings } from './components/Settings';
import Statistics from './components/Statistics';
import About from './components/About';
import { Snackbar } from './components/Snackbar';
import { Nav } from './components/Nav';

export const AppRouter = () => (
  <div className="container">
    <Nav />
    <Switch>
      <Route path="/" exact render={() => <Timer />} />
      <Route path="/settings" render={() => <Settings />} />
      <Route path="/statistics" render={() => <Statistics />} />
      <Route path="/about" render={() => <About />} />
    </Switch>
    <Snackbar />
  </div>
);
