import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import LogoMobile from '../assets/logo-mobile.png';
import profileImage from '../assets/avatar-placeholder.png';

const Nav = () => (
  <nav className="dt w-100 border-box pa3-ns ph5-ns">
    <Link to="/" title="KIT CRM">
      <img src={Logo} className="dn dib-m dib-l" alt="KIT CRM" />
      <div className="w-100 border-box">
        <div className="dib fl">
          <img
            src={LogoMobile}
            className="dn-ns h3 center pl3 align-middle"
            alt="KIT CRM"
          />
        </div>
        <div className="dib right fr" onClick={this.toggleMenu}>
          <img
            src={profileImage}
            className="dn-ns h2 br-100 align-middle pa3"
            alt=""
          />
        </div>
      </div>
    </Link>
  </nav>
);

export default Nav;
