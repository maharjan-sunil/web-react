/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'HOME',
  },

  log: {
    id: `${scope}.log`,
    defaultMessage: 'LOG',
  },

  site: {
    id: `${scope}.site`,
    defaultMessage: 'SITE',
  },
  siteaccount: {
    id: `${scope}.siteaccount`,
    defaultMessage: 'SITE ACCOUNT',
  },
  scan: {
    id: `${scope}.scan`,
    defaultMessage: 'SCAN',
  },
  dataconnection: {
    id: `${scope}.dataconnection`,
    defaultMessage: 'DATA CONNECTION',
  },
  carrier: {
    id: `${scope}.carrier`,
    defaultMessage: 'CARRIER',
  },
  user: {
    id: `${scope}.user`,
    defaultMessage: 'USER',
  },
  siteaccounts: {
    id: `${scope}.siteaccounts`,
    defaultMessage: 'Site Accounts',
  },
});
