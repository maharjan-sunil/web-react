import { selectLogin, makeSelectResponse } from '../selectors';

describe('selectLogin', () => {
  it('should select the loingPage state', () => {
    const loginState = { loginSuccess: false, response: {} };
    const mockedState = {
      login: loginState,
    };
    expect(selectLogin(mockedState)).toEqual(loginState);
  });
});

describe('makeSelectResponse', () => {
  const responseSelector = makeSelectResponse();
  it('should select the response', () => {
    const response = {};
    const mockedState = {
      loginPage: {},
    };
    expect(responseSelector(mockedState)).toEqual(response);
  });
});
