import React, { Component } from 'react';
import { isSignInPending, loadUserData, Person } from 'blockstack';
import Nav from './Nav';
import avatarFallbackImage from '../assets/avatar-placeholder.png';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {
        name() {
          return 'Anonymous';
        },
        avatarUrl() {
          return avatarFallbackImage;
        },
      },
    };
  }

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
    });
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    return !isSignInPending() ? (
      <div>
        <Nav />
        <div className="mw9 center ph3 cf">
          <div className="w-100 w-25-ns fl shadow-1 pa2" id="section-2">
            <div className="">
              <img
                src={
                  person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
                }
                className="h3 w3 br-100"
                id="avatar-image"
                alt="avatar-image"
              />
            </div>
            <p className="f4">
              <span id="heading-name">
                {person.name() ? person.name() : 'Nameless Person'}
              </span>
            </p>
            <p className="lead">
              <button
                className="f6 link dim ph2 pv1 mb2 dib white bg-black b--black"
                id="signout-button"
                onClick={handleSignOut.bind(this)}
              >
                Logout
              </button>
            </p>
          </div>
          <div className="w-100 w-75-ns fl ph4 tl" id="section-2">
            <h1>Your Contacts</h1>
            <p>Hello</p>
          </div>
        </div>
      </div>
    ) : null;
  }
}
