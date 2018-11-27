import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from 'blockstack';
import EditContact from './EditContact';
import Profile from './Profile';
import SignIn from './SignIn';
import Updates from './Updates';
import AddContact from './AddContact';
import Settings from './Settings';
import SingleContactPage from './SingleContactPage';

export default class Main extends Component {
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
            <Route path="/updates" component={Updates} />

            <Route
              path="/contact"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />

            <Route
              path="/add-contact"
              component={() => <SignIn handleSignIn={this.handleSignIn} />}
            />
            <Route
              path="/edit-contact"
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
            <Route path="/updates" component={Updates} />

            <Route
              path="/add-contact"
              component={() => (
                <AddContact handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/edit-contact"
              component={() => (
                <EditContact handleSignOut={this.handleSignOut} />
              )}
            />
            <Route
              path="/settings"
              component={() => <Settings handleSignOut={this.handleSignOut} />}
            />
            <Route
              path="/contact"
              component={() => (
                <SingleContactPage handleSignOut={this.handleSignOut} />
              )}
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
