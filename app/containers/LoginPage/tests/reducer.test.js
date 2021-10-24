import produce from 'immer';

import loginPageReducer from '../reducer';
import { loginUserSuccess, loginUserError } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('loginPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {};
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(loginPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the login action correctly', () => {
    const response = {};
    const expectedResult = produce(state, draft => {
      draft.response = response;
    });

    expect(loginPageReducer(state, loginUserSuccess(response))).toEqual(
      expectedResult,
    );
  });

  it.only('should handle the loginError action correctly', () => {
    const error = 'server error';
    const expectedResult = produce(state, draft => {
      draft.loginSuccess = false;
      draft.response = {
        type: 'app/AccountPage/LOGIN_USER_ERROR',
        error,
      };
    });
    expect(loginPageReducer(state, loginUserError(error))).toEqual(
      expectedResult,
    );
  });
});
