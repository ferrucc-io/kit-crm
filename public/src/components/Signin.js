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
            className="f6 ph3 pv2 mb2 dib white bg-black b--black"
            id="signin-button"
            onClick={handleSignIn.bind(this)}
            primary
          >
            Sign In
          </DefaultButton>
          <DefaultButton className="f6 link ph3 pv2 mb2 dib gray bg-transparent ml2">
            <div>Learn More </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#999"
                fillRule="evenodd"
                d="M14.948 11.998l.052.052L9.05 18 8 16.95l4.955-4.955L8 7.055 9.037 6 15 11.945l-.052.053z"
              />
            </svg>
          </DefaultButton>
        </p>
        <GlobalStyle />
      </div>
    );
  }
}
