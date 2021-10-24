import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

function Header() {
  return (
    <div>
      <A href="https://www.reactboilerplate.com/">
        <Img src={Banner} alt="react-boilerplate - Logo" />
      </A>
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/logs">
          <FormattedMessage {...messages.log} />
        </HeaderLink>
        <HeaderLink to="/sites">
          <FormattedMessage {...messages.site} />
        </HeaderLink>
        <HeaderLink to="/site-accounts">
          <FormattedMessage {...messages.siteaccount} />
        </HeaderLink>
        <HeaderLink to="/scans">
          <FormattedMessage {...messages.scan} />
        </HeaderLink>
        <HeaderLink to="/data-connections">
          <FormattedMessage {...messages.dataconnection} />
        </HeaderLink>
        <HeaderLink to="/carriers">
          <FormattedMessage {...messages.carrier} />
        </HeaderLink>
        <HeaderLink to="/users">
          <FormattedMessage {...messages.user} />
        </HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;
