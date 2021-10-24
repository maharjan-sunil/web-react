/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.loginPage || initialState;

const makeSelectResponse = () =>
  createSelector(
    selectLogin,
    loginState => loginState,
  );

const makeSelectStatusCode = () =>
  createSelector(
    selectLogin,
    loginState => loginState.statusCode,
  );

export { selectLogin, makeSelectResponse, makeSelectStatusCode };
