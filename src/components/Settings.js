import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { isSignInPending, putFile, getFile } from 'blockstack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Nav from './Nav';
import Form from './styles/Form';
import Error from './ErrorMessage';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.importContact = React.createRef();
  }
  state = {
    contacts: [],
  };

  componentWillMount() {
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

  deleteAllContacts() {
    const contacts = [];
    const options = { encrypt: true };
    putFile('contacts.json', JSON.stringify(contacts), options).then(() => {
      toast(`Deleted all your Contacts successfully 😢`, {
        className: 'toast-notification',
      });
    });
  }

  async exportContacts() {
    const columns = Object.keys(this.state.contacts[0]).join(',');
    const rows = this.state.contacts
      .map(c => Object.values(c).join(','))
      .join('\n');
    const csv = `${columns}\n${rows}`;
    const url = await putFile('contacts.csv', csv, { encrypt: false });
    window.open(url, '_target');
  }

  const importContacts = (e) => {
    console.log(e);
  }

  render() {
    return !isSignInPending() ? (
      <div>
        <Nav />
        <h1>Manage Contacts</h1>
        <h3>Import Contacts</h3>
        <form onSubmit={async value => await this.importContacts(value)}>
          <label htmlFor="fileupload" className="black b f5 db">
            Import from CSV
          </label>
          <input
            type="file"
            name="fileupload"
            className="mt3 db center"
            ref={this.importContact}
          />
          <input
            type="submit"
            value="Import"
            className="mt3 db center f6 link dim ph2 pv1 mb2 dib white bg-black b--black pointer"
          />
        </form>
        <h3>Export Contacts</h3>
        <a
          className="f6 link dim ph2 pv1 mb2 dib white bg-black b--black pointer"
          onClick={async () => await this.exportContacts()}
        >
          Export as CSV
        </a>
        <h3>Delete Contacts</h3>
        <a
          onClick={() => {
            this.deleteAllContacts();
          }}
          className="pointer f6 link dim ph2 pv1 mb2 dib white bg-black b--black"
        >
          Delete all Contacts
        </a>
        <ToastContainer closeButton={false} hideProgressBar />
      </div>
    ) : null;
  }
}
