import React from 'react';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav className="dt w-100 border-box pa3 ph5-ns">
    <Link to="/" title="KIT CRM">
      <img src={Logo} className="dib" alt="KIT CRM" />
    </Link>
  </nav>
);

export default Nav;
