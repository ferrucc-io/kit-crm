import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu(props) {
  return (
    <div className="db bg-black">
      <Link to="/home" className="db white no-underline b pt3 pb3 tr mr3">
        Home
      </Link>
      <Link
        to="/settings"
        className="db bg-white black no-underline b pt3 pb3 w-100 tr pr3"
      >
        Settings
      </Link>
      <Link to="/updates" className="db white no-underline b pt3 pb3 tr mr3">
        📰 Updates
      </Link>
      <div
        className="db bg-white black no-underline b pt3 pb3 w-100 tr pr3"
        onClick={props.logout}
      >
        Logout
      </div>
    </div>
  );
}
