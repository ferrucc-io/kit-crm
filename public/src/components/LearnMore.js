import React from 'react';

export default function LearnMore() {
  return (
    <div>
      <div>
        <h1>Keep in touch with your Network</h1>
        <p>We all have a hard time keeping in touch with the people we meet.</p>
        <p>
          With Kit you get friendly reminders to check in with the people you
          care about.
        </p>
      </div>
      <div>
        <h1>Own your data</h1>
        <p>
          Imagine if all your data from the apps you use stayed on your own
          cloud.
        </p>
        <p>This is exactly where your data lives when using Kit. </p>
        <span className="b">Don't have your own server?</span>
        <p>
          No problem{' '}
          <a
            href="https://blockstack.org"
            className="black b no-underline bg-light-yellow pv1 ph2 hover-bg-yellow"
          >
            Blockstack
          </a>{' '}
          offers you a default private cloud folder.
        </p>
      </div>
    </div>
  );
}
