import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import {
  isSignInPending,
  putFile,
  getFile,
  Person,
  loadUserData,
} from 'blockstack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Nav from './Nav';
import avatarFallbackImage from '../assets/avatar-placeholder.png';
import Error from './ErrorMessage';
import csvToJSON from './util/csvToJSON';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.importContacts = this.importContacts.bind(this);
    this.importContact = React.createRef();
  }
  state = {
    contacts: [],
    person: {
      name() {
        return 'Anonymous';
      },
      avatarUrl() {
        return avatarFallbackImage;
      },
    },
  };

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile),
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

  deleteAllContacts() {
    const contacts = [];
    const options = { encrypt: true };
    putFile('contacts.json', JSON.stringify(contacts), options).then(() => {
      toast(`Deleted all your Contacts successfully 😢`, {
        className: 'toast-notification',
      });
    });
  }

  importContacts(event) {
    event.preventDefault(event);
    const newJSON = this.importContact.current.files[0];
    const p = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader);
      };
      reader.onerror = function(e) {
        reject(new Error(`Error reading${newJSON.name}`));
      };
      reader.readAsText(newJSON);
    });
    p.then(reader => {
      const newContactList = csvToJSON(reader.result);
      const options = { encrypt: true };
      putFile('contacts.json', newContactList, options).then(() => {
        toast(`Contacts imported successfully 🚀`, {
          className: 'toast-notification',
        });
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
    console.log(url);
    window.open(url);
  }

  async deleteExportContacts() {
    const blank = '';
    const url = await putFile('contacts.csv', blank, { encrypt: false });
    window.open(url);
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    return !isSignInPending() ? (
      <div>
        <Nav
          profileImage={
            person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
          }
          logout={handleSignOut.bind(this)}
        />
        <h1>Manage Contacts</h1>
        <h3>Import Contacts</h3>
        <form onSubmit={this.importContacts}>
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
        <a
          className="f6 link dim ph2 pv1 mb2 dib white bg-black b--black pointer ml2"
          onClick={async () => await this.deleteExportContacts()}
        >
          Delete Export
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
