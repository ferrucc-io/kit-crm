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
        <div>
          {contact.map(contact => (
            <div>
              <img
                src={`https://avatars.io/twitter/${contact.twitterHandle}`}
                className="fl br-100 w3 mt2-m mt0-l"
                alt=""
              />
              <div>
                {contact.name} {contact.lastName}
              </div>
              <div>{contact.twitterHandle}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const SingleContactPage = withRouter(mySingleContactPage);

export default SingleContactPage;
