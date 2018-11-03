import React, { Component } from 'react';
import KitLogo from '../assets/icon-logo.png';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSignIn } = this.props;

    return (
      <div className="panel-landing" id="section-1">
        <div className="mb4 mt4">
          <img src={KitLogo} alt="Kit Logo" />
          <h1 className="f1 mb0">KIT CRM</h1>
          <h2 className="mt0 f4">Keep In Touch, your personal CRM</h2>
        </div>
        <p>
          <button
            className="f6 link dim ph3 pv2 mb2 dib white bg-black b--black"
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
