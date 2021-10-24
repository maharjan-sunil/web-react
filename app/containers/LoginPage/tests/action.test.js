import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from '../constants';

import { login, loginUserError, loginUserSuccess } from '../actions';

describe('Login Actions', () => {
  describe('login', () => {
    it('should return the correct type and the passed parameters', () => {
      const email = 'Max@wallbee.dk';
      const password = 'MAXADMIN';
      const expectedResult = {
        type: LOGIN_USER,
        email,
        password,
        dateTimeOffSet: new Date().getTimezoneOffset(),
      };

      expect(login(email, password)).toEqual(expectedResult);
    });
  });

  describe('loginUserSuccess', () => {
    it('should return the correct type and the passed parameters', () => {
      const response = {};
      const expectedResult = {
        type: LOGIN_USER_SUCCESS,
        response,
      };

      expect(loginUserSuccess(response)).toEqual(expectedResult);
    });
  });

  describe('loginUserError', () => {
    it('should return the correct type and the passed parameters', () => {
      const error = 'Server Error';
      const expectedResult = {
        type: LOGIN_USER_ERROR,
        error,
      };

      expect(loginUserError(error)).toEqual(expectedResult);
    });
  });
});
