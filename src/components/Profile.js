import React, { Component } from 'react';
import { isSignInPending, loadUserData, Person, getFile } from 'blockstack';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import avatarFallbackImage from '../assets/avatar-placeholder.png';
import SingleContact from './SingleContact';
import ContactBubble from './ContactBubble';
import moment from 'moment';
import ProfileDesktop from './ProfileDesktop';

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
    const options = { decrypt: true };
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
        <Nav
          profileImage={
            person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
          }
          logout={handleSignOut.bind(this)}
        />
        <div className="mw9 center ph3 cf">
          <ProfileDesktop
            logout={handleSignOut.bind(this)}
            profileImage={
              person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
            }
            name={person.name() ? person.name() : 'Nameless Person'}
            username={username}
          />
          <div className="w-100 w-75-ns fl ph4 tl" id="section-2">
            <h1>Contact Today</h1>
            <div className="w-100 fl db">
              {contacts.map(contact => {
                if (
                  contact.contactDate === moment().format('l') ||
                  moment().isAfter(moment(contact.contactDate, 'MM/DD/YYYY'))
                ) {
                  return <ContactBubble contact={contact} key={contact.id} />;
                }
                return (
                  <div>
                    You don't have to keep in touch with anyone today :)
                  </div>
                );
              })}
            </div>
            <h1 className="mt6">Your Contacts</h1>
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
