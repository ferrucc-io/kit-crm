import React, { Component } from 'react';
import { isSignInPending, loadUserData, Person, getFile } from 'blockstack';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import avatarFallbackImage from '../assets/avatar-placeholder.png';
import SingleContact from './SingleContact';

export default class Profile extends Component {
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
    contacts: [],
  };

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
      username: loadUserData().username,
    });
    this.fetchData();
  }

  fetchData() {
    const options = { decrypt: false };
    getFile('contacts.json', options).then(file => {
      const contacts = JSON.parse(file || '[]');
      this.setState({
        contacts,
      });
    });
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const { username } = this.state;
    const { contacts } = this.state;
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
              <a
                className="f6 link dim ph2 pv1 mb2 dib white bg-black b--black mr2"
                id="signout-button"
                onClick={handleSignOut.bind(this)}
              >
                Logout
              </a>
              <Link
                to="/settings"
                className="f6 link dim ph2 pv1 mb2 dib white bg-black b--black"
              >
                Settings
              </Link>
            </p>
          </div>
          <div className="w-100 w-75-ns fl ph4 tl" id="section-2">
            <h1>Your Contacts</h1>
            {contacts.map(contact => (
              <SingleContact contact={contact} key={contact.id} />
            ))}
            <div className="fr">
              <Link
                to="/add-contact"
                className="f6 link dim ph2 pv1 mb2 dib white bg-black b--black"
              >
                Add Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
