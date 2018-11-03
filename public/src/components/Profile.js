import React, { Component } from 'react';
import { isSignInPending, loadUserData, Person, getFile } from 'blockstack';
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
  state = {
    person: {
      name() {
        return 'Anonymous';
      },
      avatarUrl() {
        return avatarFallbackImage;
      },
    },
    username: '',
  };

  fetchData() {
    const options = { decrypt: false };
    getFile('contacts.json', options).then(file => {
      const contacts = JSON.parse(file || '[]');
      this.setState({
        contacts,
      });
    });
  }

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
      username: loadUserData().username,
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const { username } = this.state;
    return !isSignInPending() ? (
      <div>
        <Nav />
        <div className="mw9 center ph3 cf">
          <div className="w-100 w-25-ns fl pa2" id="section-2">
            <div className="">
              <img
                src={
                  person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
                }
                className="h3 w3 br-100"
                id="avatar-image"
                alt="Avatar Image"
              />
            </div>
            <p className="f4">
              <span id="heading-name">
                {person.name() ? person.name() : 'Nameless Person'}
              </span>
              <br />
              <span className="f6 gray">{username}</span>
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

            <div className="fr">
              <a
                href="/add-contact"
                className="f6 link dim ph2 pv1 mb2 dib white bg-black b--black"
              >
                Add Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
