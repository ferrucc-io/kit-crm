import React, { Component } from 'react';

export default class SingleContact extends Component {
  render() {
    const { contact } = this.props;
    return <div>{contact.name}</div>;
  }
}
