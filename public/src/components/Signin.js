import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import KitLogo from '../assets/icon-logo.png';
import BlockstackLogo from '../assets/blockstack-logo-landscape@2x.png';
import DefaultButton from './styles/DefaultButton';

const GlobalStyle = createGlobalStyle`
  body {
    background-image: radial-gradient(circle, #D7D7D7, #D7D7D7 1px, #FFF 1px, #FFF);
    background-size: 28px 28px;
  }
`;
export default class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSignIn } = this.props;

    return (
      <div className="landing">
        <div className="mb4 pt4">
          <img src={KitLogo} alt="Kit Logo" />
          <h1 className="f1 mb0">KIT CRM</h1>
          <h2 className="mt0 f4">Keep In Touch, your personal CRM</h2>
        </div>
        <p>
          <DefaultButton
            className="f6 link dim ph3 pv2 mb2 dib white bg-black b--black"
            id="signin-button"
            onClick={handleSignIn.bind(this)}
          >
            Sign In
          </DefaultButton>
          <DefaultButton className="f6 link dim ph3 pv2 mb2 dib gray bg-white b--gray ml2">
            <div className="dib">Learn More →</div>
          </DefaultButton>
        </p>
        <GlobalStyle />
      </div>
    );
  }
}
