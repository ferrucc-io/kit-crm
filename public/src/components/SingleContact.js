import React, { Component } from 'react';

export default class SingleContact extends Component {
  render() {
    const { contact } = this.props;
    return (
      <div className="db">
        <div className="w-20 w-10-ns">
          <img
            src={`https://avatars.io/twitter/${contact.twitterHandle}`}
            className="fl br-100 w3"
            alt="Profile Image"
          />
        </div>
        <p className="fl w-80 w-90-ns h3 pl3">
          {contact.name} {contact.lastName}
        </p>
      </div>
    );
  }
}
