/**
 * Tests for HomePage sagas
 */

import { takeLatest, put } from 'redux-saga/effects';

import { LOGIN_USER } from 'containers/LoginPage/constants';
import { loginUserSuccess, loginUserError } from 'containers/LoginPage/actions';

import loginValidate, { loginPageSaga } from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('loginPageSaga Saga', () => {
  let loginGenerator;
  const action = {
    email: '',
    password: '',
    type: '',
    dateTimeOffSet: '',
  };

  beforeEach(() => {
    loginGenerator = loginPageSaga(action);

    const selectDescriptor = loginGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should call the loginUserSuccess action if the response success', () => {
    const response = {
      response: {},
    };
    const putDescriptor = loginGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(loginUserSuccess(response)));
  });

  it('should call the loginUserError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = loginGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(loginUserError(response)));
  });
});

describe('loginValidate Saga', () => {
  const loginValidateSaga = loginValidate();

  it('should start task to watch for LOGIN_USER action', () => {
    const takeLatestDescriptor = loginValidateSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOGIN_USER, loginPageSaga));
  });
});
