import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import LogoMobile from '../assets/logo-mobile.png';

const Nav = () => (
  <nav className="dt w-100 border-box pa3 ph5-ns">
    <Link to="/" title="KIT CRM">
      <img src={Logo} className="dn dib-m dib-l" alt="KIT CRM" />
      <img src={LogoMobile} className="dib dn-ns" alt="KIT CRM" />
    </Link>
  </nav>
);

export default Nav;
