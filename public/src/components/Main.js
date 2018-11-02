import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import About from './About';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Auth} />
      <Route path="/about" component={About} />
    </Switch>
  </main>
);

export default Main;
