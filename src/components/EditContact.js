import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { isSignInPending, putFile, getFile } from 'blockstack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import findObjectBy from './util/findObjectBy';
import Nav from './Nav';
import Form from './styles/Form';
import Error from './ErrorMessage';

class EditContactPage extends Component {
  state = {
    id: '',
    name: '',
    lastName: '',
    twitterHandle: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    country: '',
    region: '',
    contacts: [],
    sex: '',
    blockstackId: '',
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const options = { decrypt: false };
    getFile('contacts.json', options).then(file => {
      const contacts = JSON.parse(file || '[]');
      const contact = findObjectBy(contacts, {
        id: this.props.location.search.substring(4),
      });
      if (!contact) {
        this.props.history.push('/');
      }
      this.setState({
        contacts,
        name: contact[0].name,
        id: contact[0].id,
        lastName: contact[0].lastName,
        twitterHandle: contact[0].twitterHandle,
        email: contact[0].email,
        phoneNumber: contact[0].phoneNumber,
        birthDate: contact[0].birthDate,
        country: contact[0].country,
        region: contact[0].region,
        sex: contact[0].sex,
        blockstackId: contact[0].blockstackId,
        priority: contact[0].priority,
      });
    });
  }

  handleEditContactSubmit(event) {
    event.preventDefault();
    this.saveEditedContact();
  }

  saveEditedContact() {
    let { contacts } = this.state;
    const newContact = {
      id: this.state.id,
      name: this.state.name,
      lastName: this.state.lastName,
      twitterHandle: this.state.twitterHandle,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      country: this.state.country,
      region: this.state.region,
      sex: this.state.sex,
      blockstackId: this.state.blockstackId,
      birthDate: this.state.birthDate,
      priority: this.state.priority,
    };
    // delete the contact with the same ID as the edited one
    contacts = contacts.filter(contact => contact.id !== newContact.id);
    // add the edited contact to all contacts
    contacts.unshift(newContact);
    const options = { encrypt: false };
    putFile('contacts.json', JSON.stringify(contacts), options).then(() => {});
    toast(`Just edited ${this.state.name}`, {
      className: 'toast-notification',
    });
  }

  selectCountry(val) {
    this.setState({ country: val, region: '' });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    const loading = false;
    const error = false;
    return !isSignInPending() ? (
      <div>
        <Nav />
        <h1>Edit Contact</h1>
        <Form
          onSubmit={async e => {
            e.preventDefault();
            this.handleEditContactSubmit(e);
          }}
        >
          <Error error={error} />
          <fieldset>
            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name.."
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="lastName">
              Last Name
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name.."
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="priority">
              Contact Frequency
              <select
                type="text"
                id="priority"
                name="priority"
                value={this.state.priority}
                onChange={this.handleChange}
              >
                <option value="A">A - Every two weeks</option>
                <option value="B">B - Every month</option>
                <option value="C">C - Every three months</option>
                <option value="D">D - Every year</option>
              </select>
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="email">
              Email
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email.."
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="phoneNumber">
              Phone Number
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number.."
                value={this.state.phoneNumber}
                onChange={this.handleChange}
              />
            </label>
          </fieldset>
          <fieldset>
            <label>
              Sex
              <select onChange={this.handleChange} id="sex" name="sex">
                <option value="" defaultChecked>
                  Select Sex..
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </fieldset>
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="twitterHandle">
              Twitter Handle
              <input
                type="text"
                id="twitterHandle"
                name="twitterHandle"
                placeholder="Twitter handle.. (eg. 0xferruccio)"
                value={this.state.twitterHandle}
                onChange={this.handleChange}
              />
            </label>
          </fieldset>
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="birthDate">
              Birth Date
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                placeholder="Click to select Birthday.."
                value={this.state.birthDate}
                onChange={this.handleChange}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="country">
              Country
              <CountryDropdown
                name="country"
                id="country"
                value={this.state.country}
                onChange={val => this.selectCountry(val)}
              />
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="region">
              Region
              <RegionDropdown
                name="region"
                id="region"
                country={this.state.country}
                value={this.state.region}
                onChange={val => this.selectRegion(val)}
              />
            </label>
          </fieldset>
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="blockstackId">
              Blockstack Id
              <input
                type="text"
                id="blockstackId"
                name="blockstackId"
                placeholder="Blockstack ID.."
                value={this.state.blockstackId}
                onChange={this.handleChange}
              />
            </label>
          </fieldset>
          <button type="submit" className="bg-black">
            Submit
          </button>
          <ToastContainer closeButton={false} hideProgressBar />
        </Form>
      </div>
    ) : null;
  }
}

const EditContact = withRouter(EditContactPage);

export default EditContact;
