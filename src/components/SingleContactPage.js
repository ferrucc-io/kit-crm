import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { isSignInPending, getFile, putFile } from 'blockstack';
import BlockstackLogo from '../assets/blockstack-icon.svg';
import findObjectBy from './util/findObjectBy';
import ifAttribute from './util/ifAttribute';
import Nav from './Nav';

class mySingleContactPage extends Component {
  state = { contact: [], contacts: [] };

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
      this.setState({
        contact,
        contacts,
      });
    });
  }

  deleteContact() {
    const toDelete = this.state.contact[0].id;
    const newContactsList = this.state.contacts.filter(
      contact => contact.id !== toDelete
    );
    const options = { encrypt: false };
    putFile('contacts.json', JSON.stringify(newContactsList), options).then(
      () => {
        this.props.history.push('/');
      }
    );
  }

  render() {
    const { contact } = this.state;
    let UserCountryBlock;
    let EmailBlock;
    let BirthDateBlock;
    let PhoneNumberBlock;
    let BlockstackBlock;
    let TwitterBlock;
    if (contact[0]) {
      if (ifAttribute(contact[0].country)) {
        UserCountryBlock = (
          <div className="mt2">
            <span className="b">Country:</span> {contact[0].country},{' '}
            {contact[0].region}
          </div>
        );
      } else
        UserCountryBlock = (
          <div className="mt2">
            <span className="b">Country:</span>
            🌎
          </div>
        );
      if (ifAttribute(contact[0].email)) {
        EmailBlock = (
          <div className="mt2">
            <span className="b">Email:</span> {contact[0].email}
          </div>
        );
      } else EmailBlock = null;
      if (ifAttribute(contact[0].birthDate)) {
        BirthDateBlock = (
          <div className="mt2">
            <span className="b">Birthday:</span> {contact[0].birthDate}
          </div>
        );
      } else BirthDateBlock = null;
      if (ifAttribute(contact[0].phoneNumber)) {
        PhoneNumberBlock = (
          <div className="mt2">
            <span className="b">Phone Number:</span> {contact[0].phoneNumber}
          </div>
        );
      } else PhoneNumberBlock = null;
      if (ifAttribute(contact[0].twitterHandle)) {
        TwitterBlock = (
          <a
            href={`https://twitter.com/${contact[0].twitterHandle}`}
            className="no-underline black"
          >
            <div className="inline-flex justify-center items-center">
              <i className="fa fa-twitter" />
              <span className="ml2">{contact[0].twitterHandle}</span>
            </div>
          </a>
        );
      } else TwitterBlock = null;
      if (ifAttribute(contact[0].blockstackId)) {
        BlockstackBlock = (
          <div className="mt2 inline-flex justify-center items-center">
            <img src={BlockstackLogo} alt="blockstack" className="w1" />
            <span className="ml2">{contact[0].blockstackId}</span>
          </div>
        );
      } else BlockstackBlock = null;
    }
    return !isSignInPending() ? (
      <div>
        <Nav />
        {contact.map(contact => (
          <div>
            <div className="w-100 w-70-l center">
              <div className="">
                <div className="w-20 fl">
                  <img
                    src={`https://avatars.io/twitter/${contact.twitterHandle}`}
                    className="fl br-100 ml3 mt0-l"
                    alt=""
                  />
                </div>
                <div className="w-80 fl">
                  <h1 className="f2 f1-ns">
                    {contact.name} {contact.lastName}
                  </h1>
                </div>
                <div className="center w-40 pt6">
                  <div className="tl">
                    {PhoneNumberBlock}
                    {EmailBlock}
                    {BirthDateBlock}
                    {UserCountryBlock}
                  </div>
                  <div className="tl">
                    <h2>Social</h2>
                    {TwitterBlock}
                    <br />
                    {BlockstackBlock}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt3 right tr pr4">
              <a
                href={`/edit-contact?id=${contact.id}`}
                className="link dim ba bw1 ph2 pv2 mb2 dib no-underline black mr2"
              >
                ✏️️️ Edit Contact
              </a>
              <a
                className="pointer link dim ba bw1 ph2 pv2 mb2 dib no-underline bg-black b--black white"
                onClick={() => {
                  this.deleteContact();
                }}
              >
                Delete Contact
              </a>
            </div>
          </div>
        ))}
      </div>
    ) : null;
  }
}

const SingleContactPage = withRouter(mySingleContactPage);

export default SingleContactPage;
