import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import LogoMobile from '../assets/logo-mobile.png';
import Menu from './Menu';

export default class Nav extends Component {
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
            <img src={Logo} className="dn dib-m dib-l h3" alt="KIT CRM" />
          </Link>
          <div className="w-100 border-box">
            <div className="dib fl">
              <Link to="/" title="KIT CRM">
                <img
                  src={LogoMobile}
                  className="dn-ns h3 center pl3 align-middle"
                  alt="KIT CRM"
                />
              </Link>
            </div>
            <div className="dib right fr" onClick={this.toggleMenu}>
              <img
                src={this.props.profileImage}
                className="dn-ns h2 br-100 align-middle pa3"
                alt=""
              />
            </div>
          </div>
        </nav>
        {this.state.showMenu ? <Menu logout={this.props.logout} /> : null}
      </div>
    );
  }
}
