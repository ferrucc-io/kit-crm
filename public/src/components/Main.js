import React, {Component} from 'react';
import { Switch, Route, PrivateRoute } from 'react-router-dom';
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from 'blockstack';
import Auth from './Auth';
import About from './About';
import AddContact from './AddContact';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then(userData => {
        window.location = window.location.origin;
      });
    }
  }

  handleSignIn(e) {
    e.preventDefault();
    redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  render() {
    return (
      <main className="sans-serif">
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route path="/about" component={About} />
          <Route path="/add-contact" component={AddContact} />
        </Switch>
      </main>
    );
  }
}
