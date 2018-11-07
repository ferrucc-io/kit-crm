import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { isSignInPending, getFile, putFile } from 'blockstack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import BlockstackLogo from '../assets/blockstack-icon.svg';
import findObjectBy from './util/findObjectBy';
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
    return (
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
                    <div className="mt2">
                      <span className="b">Phone Number:</span>{' '}
                      {contact.phoneNumber}
                    </div>
                    <div className="mt2">
                      <span className="b">Email:</span> {contact.email}
                    </div>
                    <div className="mt2">
                      <span className="b">Country:</span> {contact.country},{' '}
                      {contact.region}
                    </div>
                    <div className="mt2">
                      <span className="b">Birthday</span> {contact.birthDate}
                    </div>
                  </div>
                  <div className="tl">
                    <h2>Social</h2>
                    <a
                      href={`https://twitter.com/${contact.twitterHandle}`}
                      className="no-underline black"
                    >
                      <div>
                        <p>
                          {' '}
                          <i className="fa fa-twitter" />
                          <span className="ml2">{contact.twitterHandle}</span>
                        </p>
                      </div>
                    </a>
                    <div>
                      <img src={BlockstackLogo} alt="blockstack" />
                      Blockstack Id:
                      {contact.blockstackId}
                    </div>
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
                className="link dim ba bw1 ph2 pv2 mb2 dib no-underline bg-black b--black white"
                onClick={() => {
                  this.deleteContact();
                }}
              >
                Delete Contact
              </a>
            </div>
            <ToastContainer />
          </div>
        ))}
      </div>
    );
  }
}

const SingleContactPage = withRouter(mySingleContactPage);

export default SingleContactPage;
