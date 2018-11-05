import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { isSignInPending, getFile } from 'blockstack';
import Nav from './Nav';

function find_in_object(my_object, my_criteria) {
  return my_object.filter(obj =>
    Object.keys(my_criteria).every(c => obj[c] == my_criteria[c])
  );
}

class mySingleContactPage extends Component {
  state = { contact: [] };

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    const options = { decrypt: false };
    getFile('contacts.json', options).then(file => {
      let contact = JSON.parse(file || '[]');
      contact = find_in_object(contact, {
        id: this.props.location.search.substring(4),
      });
      this.setState({
        contact,
      });
    });
  }

  render() {
    const { contact } = this.state;
    return (
      <div>
        <Nav />
        {contact.map(contact => (
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
                  <div>
                    <span className="b">Phone Number:</span>{' '}
                    {contact.phoneNumber}
                  </div>
                  <div>
                    <span className="b">Email:</span> {contact.email}
                  </div>
                  <div>
                    <span className="b">Country:</span> {contact.country},{' '}
                    {contact.region}
                  </div>
                  <div>
                    <span className="b">Birthday</span> {contact.birthDate}
                  </div>
                </div>
                <div className="tl">
                  <h2>Social</h2>
                  // add social media icons here
                  <div>
                    Twitter:
                    {contact.twitterHandle}
                  </div>
                  <div>
                    Blockstack Id:
                    {contact.blockstackId}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const SingleContactPage = withRouter(mySingleContactPage);

export default SingleContactPage;
