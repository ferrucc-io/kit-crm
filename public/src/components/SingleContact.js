import React, { Component } from 'react';

export default class SingleContact extends Component {
  render() {
    const { contact } = this.props;
    return (
      <div className="db">
        <img
          src={`https://avatars.io/twitter/${contact.twitterHandle}`}
          className="fl br-100 h3 w3 w-10"
          alt="Profile Image"
        />
        <p className="fl w-90 h3 pl3">
          {contact.name} {contact.lastName}
        </p>
      </div>
    );
  }
}
