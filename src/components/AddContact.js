import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import {
  isSignInPending,
  putFile,
  getFile,
  Person,
  loadUserData,
} from 'blockstack';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import avatarFallbackImage from '../assets/avatar-placeholder.png';
import Nav from './Nav';
import Form from './styles/Form';
import Error from './ErrorMessage';
import nextContactDate from './util/nextContactDate';

export default class AddContact extends Component {
  state = {
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
    priority: 'A',
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
    getFile('today.json', options).then(file => {
      let today = JSON.parse(file || '[]');
      if (today[0].date !== moment().format('L')) {
        today = [{ date: moment().format('L'), contactsLeft: 3 }];
        const otherOption = { encrypt: true };
        putFile('today.json', JSON.stringify(today), otherOption).then();
      }
      this.setState({
        today,
      });
    });
  }

  handleNewContactSubmit(event) {
    event.preventDefault();
    this.saveNewContact(() => {
      this.setState({ saved: true });
    });
    const today = [
      {
        date: this.state.today[0].date,
        contactsLeft: this.state.today[0].contactsLeft - 1,
      },
    ];
    const options = { encrypt: true };
    putFile('today.json', JSON.stringify(today), options).then();
  }

  saveNewContact(cb) {
    const { contacts } = this.state;
    const contactDate = nextContactDate(this.state.priority);
    const newContact = {
      id: Date.now(),
      created_at: Date.now(),
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
      contactDate,
    };

    contacts.unshift(newContact);
    const options = { encrypt: true };
    putFile('contacts.json', JSON.stringify(contacts), options).then(() => {
      cb();
    });
    this.setState({
      country: '',
      region: '',
      name: '',
      lastName: '',
      twitterHandle: '',
      email: '',
      phoneNumber: '',
      birthDate: '',
      sex: '',
      blockstackId: '',
      priority: '',
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
    const { handleSignOut } = this.props;
    const { person } = this.state;
    const loading = false;
    const error = false;
    if (this.state.saved) {
      return <Redirect to="/" />;
    }

    return !isSignInPending() ? (
      <div>
        <Nav
          profileImage={
            person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage
          }
          logout={handleSignOut.bind(this)}
        />
        <h1 className="f1">Add Contact</h1>
        <div className="dn db-l w-30-l fl">
          <p className="tl ml4 mt3 f3 b margin-information">
            Personal Information
          </p>
          <p className="tl ml4 f3 b margin-social">Social</p>
        </div>
        <div className="w-70-l fl">
          <Form
            onSubmit={async e => {
              e.preventDefault();
              this.handleNewContactSubmit(e);
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
                  required
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
              <label>
                Gender
                <select onChange={this.handleChange} id="sex" name="sex">
                  <option value="" defaultChecked>
                    Select Gender..
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
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
            <button type="submit" className="bg-black">
              Submit
            </button>
          </Form>
        </div>
      </div>
    ) : null;
  }
}
