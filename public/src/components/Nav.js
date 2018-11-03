import React from 'react';
import Logo from '../assets/logo.png';

const Nav = () => (
  <nav className="dt w-100 border-box pa3 ph5-ns">
    <a href="./" title="KIT CRM">
      <img src={Logo} className="dib" alt="KIT CRM" />
    </a>
  </nav>
);

export default Nav;
