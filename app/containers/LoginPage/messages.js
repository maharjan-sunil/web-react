/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.LoginPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is Login Page.',
  },
  invalidLogin: {
    id: `${scope}.invalid_Login`,
    defaultMessage: 'Invalid login credentials ',
  },
  activationFailed: {
    id: `${scope}.activation_Failed`,
    defaultMessage: 'Activation Failed',
  },
  activationSuccess: {
    id: `${scope}.activation_Success`,
    defaultMessage: 'Activation code successfully send.',
  },
  emailVerified: {
    id: `${scope}.email_Verified`,
    defaultMessage: 'Email Verified and code send to Email.',
  },
  emailVerifiedFailed: {
    id: `${scope}.email_Verified_Failed`,
    defaultMessage: 'Email not exist, Please use correct email.',
  },
  codeVerifiedFailed: {
    id: `${scope}.code_Verified_Failed`,
    defaultMessage: 'Code doesnot match, Please use correct code.',
  },
});
