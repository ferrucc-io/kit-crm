import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PriorityLabel from './styles/PriorityLabel';

export default class SingleContact extends Component {
  render() {
    const { contact } = this.props;
    return (
      <div className="db overflow-x-hidden">
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
          <p className="fl w-80 w-90-ns h3 pl3 f4 fw4 black-80">
            {contact.name} {contact.lastName}{' '}
            <PriorityLabel priority={contact.priority} small>
              {contact.priority}
            </PriorityLabel>
          </p>
        </Link>
      </div>
    );
  }
}
