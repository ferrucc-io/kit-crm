import React, { Component } from 'react';

export default class Signin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSignIn } = this.props;

    return (
      <div className="panel-landing" id="section-1">
        <div>
          <h1 className="f1">KIT CRM</h1>
        </div>
        <p>
          <button
            className="f6 link dim ph3 pv2 mb2 dib white bg-black"
            id="signin-button"
            onClick={handleSignIn.bind(this)}
          >
            Sign In with Blockstack
          </button>
        </p>
      </div>
    );
  }
}
