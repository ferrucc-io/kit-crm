import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Nav from './Nav';

const mySingleContactPage = ({ location, route, params }) => (
  <div>
    <Nav />
    <p>Hello {location.search} </p>
  </div>
);

const SingleContactPage = withRouter(mySingleContactPage);

export default SingleContactPage;
