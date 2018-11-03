import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { isSignInPending, putFile, getFile } from 'blockstack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Nav from './Nav';
import Form from './styles/Form';
import Error from './ErrorMessage';

export default class Settings extends Component {
  state = {
    contacts: [],
  };

  componentWillMount() {
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

  deleteAllContacts() {
    const contacts = [];
    const options = { encrypt: false };
    putFile('contacts.json', JSON.stringify(contacts), options).then(() => {
      toast(`Deleted all your Contacts successfully 😢`, {
        className: 'toast-notification',
      });
    });
  }

  render() {
    const loading = false;
    const error = false;
    return !isSignInPending() ? (
      <div>
        <Nav />
        <h1>Manage Contacts</h1>
        <a
          onClick={this.deleteAllContacts()}
          className="f6 link dim ph2 pv1 mb2 dib white bg-black b--black"
        >
          Delete all Contacts
        </a>
        <ToastContainer closeButton={false} hideProgressBar />
      </div>
    ) : null;
  }
}
