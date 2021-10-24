import React from 'react';
import { FormattedMessage } from 'react-intl';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';
import Info from './Info';

function Footer() {
  return (
    <Wrapper>
      <section>
        <Info />
      </section>
      <section>
        <LocaleToggle />
      </section>
      <section>
        <FormattedMessage {...messages.authorMessage} />
      </section>
    </Wrapper>
  );
}

export default Footer;
