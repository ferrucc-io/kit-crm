import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SingleContact extends Component {
  render() {
    const { contact } = this.props;
    return (
      <div className="db">
        <Link
          to={{
            pathname: '/contact',
            search: `?id=${contact.id}`,
          }}
        >
          <div className="w-20 w-10-ns">
            <img
              src={`https://avatars.io/twitter/${contact.twitterHandle}`}
              className="fl br-100 w3 mt2-m mt0-l w-100 w-70-l"
              alt=""
            />
          </div>
          <p className="fl w-80 w-90-ns h3 pl3">
            {contact.name} {contact.lastName}
          </p>
        </Link>
      </div>
    );
  }
}
