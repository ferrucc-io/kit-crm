import React from 'react';
import Floating from './styles/Floating';
import CRMIcons from '../assets/keepintouchicons.png';
import CRMIcons2 from '../assets/iconstwokit.png';
import PriorityLabel from '../assets/priority.png';

export default function LearnMore() {
  return (
    <div className="pa3">
      <div>
        <Floating src={CRMIcons} className="mw-100 w-70-m w-40-l" />
        <h1>🌲 Start growing your network</h1>
        <p>We all have a hard time keeping in touch with the people we meet.</p>
        <p>With Kit you get friendly reminders to grow your Network.</p>
      </div>
      <div>
        <Floating src={PriorityLabel} className="mw-100 w-70-m w-40-l" />
        <h1>👥 Stay closer to the friends you care the most about</h1>
        <p>
          Set a priority for every friend you have and get reminded to check in
          and say hi!
        </p>
      </div>
      <div>
        <Floating src={CRMIcons2} className="mw-100 w-70-m w-40-l" />
        <h1>🔐 Keep your data on your Network</h1>
        <p>
          As we're leveraging the Blockstack network, you get to own and host
          your own data.
        </p>
        <p>No setup required.</p>
        <p className="lh-copy">
          You don't have to trust me, you can verify yourself checking our{' '}
          <a
            href="https://github.com/ferrucc-io/kit-crm"
            className="black b
            no-underline bg-light-yellow pv1 ph1 hover-bg-yellow"
          >
            Open Source
          </a>{' '}
          code
        </p>
      </div>
    </div>
  );
}
