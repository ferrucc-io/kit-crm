import React from 'react';
import { Link } from 'react-router-dom';

function ProfileDesktop(props) {
  return (
    <div className="w-100 w-25-ns fl pa2 dn dib-m dib-l" id="section-2">
      <div>
        <img
          src={props.profileImage}
          className="h3 w3 br-100"
          id="avatar-image"
          alt=""
        />
      </div>
      <p className="f4">
        <span id="heading-name">{props.name}</span>
        <br />
        <span className="f6 gray">{props.username}</span>
      </p>
      <p className="lead">
        <div className="w-100">
          <Link
            to="/updates"
            className="f6 link dim ph3 pv1 mb2 dib black bg-white ba b--black"
          >
            Updates
          </Link>
        </div>
        <div className="w-100">
          <Link
            to="/settings"
            className="f6 link dim ph3 pv1 mb2 dib black bg-white ba b--black"
          >
            Settings
          </Link>
        </div>
        <div className="w-100">
          <a
            className="pointer f6 link dim ph3 pv1 mb2 dib black bg-white ba b--black"
            id="signout-button"
            onClick={props.logout}
          >
            Logout
          </a>
        </div>
      </p>
    </div>
  );
}

export default ProfileDesktop;
