import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

export default class NavLoggedOut extends Component {
  state = {
    showMenu: false,
  };

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  };

  render() {
    return (
      <div>
        <nav className="dt w-100 border-box pa3-ns ph5-ns">
          <Link to="/" title="KIT CRM">
            <img src={Logo} className="dib h3" alt="KIT CRM" />
          </Link>
        </nav>
      </div>
    );
  }
}
