import React, { Component } from 'react';
import { Switch, Route, PrivateRoute } from 'react-router-dom';
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from 'blockstack';
import Profile from './Profile.js';
import SignIn from './Signin.js';
import About from './About';
import AddContact from './AddContact';
import Settings from './Settings';
import SingleContactPage from './SingleContactPage.js';

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
    redirectToSignIn(origin, `${origin}/manifest.json`, [
      'store_write',
      'publish_data',
    ]);
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  render() {
    return (
      <main className="sans-serif">
        {!isUserSignedIn() ? (
          <Switch>
            <Route
              path="/contact/:id"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route path="/about" component={About} />
            <Route
              path="/add-contact"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/settings"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
          </Switch>
        ) : (
          <Switch>
            <Route
              path="/contact/:userId"
              component={() => <SingleContactPage />}
            />
            <Route path="/about" component={About} />
            <Route
              path="/add-contact"
              component={() => (
                <AddContact handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/settings"
              component={() => <Settings handleSignOut={this.handleSignOut} />}
            />
            <Route
              path="/"
              component={() => <Profile handleSignOut={this.handleSignOut} />}
            />
          </Switch>
        )}
      </main>
    );
  }
}
