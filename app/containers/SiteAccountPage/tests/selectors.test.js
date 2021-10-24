import {
  selectSiteAccount,
  makeSelectSiteAccounts,
  makeSelectSiteAccount,
  makeSelectResult,
  makeSelectError,
  makeSelectLoader,
  makeSelectCreateSelectList,
} from '../selectors';

describe('selectSiteAccount', () => {
  it('should select the SiteAccountPage state', () => {
    const siteAccountState = {
      loading: true,
      error: false,
      request: false,
      siteAccounts: [],
      siteAccount: {},
      result: {},
      createSelectList: false,
    };
    const mockedState = {
      state: siteAccountState,
    };
    expect(selectSiteAccount(mockedState)).toEqual(siteAccountState);
  });
});

describe('makeSelectSiteAccounts', () => {
  const responseSelector = makeSelectSiteAccounts();

  it('should select the siteAccounts', () => {
    const siteAccountState = {
      siteAccounts: [],
    };
    const mockedState = {
      siteAccountState: siteAccountState.siteAccounts,
    };
    expect(responseSelector(mockedState)).toEqual(
      siteAccountState.siteAccounts,
    );
  });
});

describe('makeSelectSiteAccount', () => {
  const responseSelector = makeSelectSiteAccount();
  it('should select the siteAccount', () => {
    const siteAccountState = {
      siteAccount: {},
    };
    const mockedState = {
      siteAccountState: siteAccountState.siteAccount,
    };
    expect(responseSelector(mockedState)).toEqual(siteAccountState.siteAccount);
  });
});
describe('makeSelectResult', () => {
  const responseSelector = makeSelectResult();
  it('should select the result', () => {
    const siteAccountState = {
      result: {},
    };
    const mockedState = {
      siteAccountState: siteAccountState.result,
    };
    expect(responseSelector(mockedState)).toEqual(siteAccountState.result);
  });
});

describe('makeSelectError', () => {
  const responseSelector = makeSelectError();
  it('should select the error', () => {
    const siteAccountState = {
      error: false,
    };
    const mockedState = {
      siteAccountState: siteAccountState.error,
    };
    expect(responseSelector(mockedState)).toEqual(siteAccountState.error);
  });
});

describe('makeSelectLoader', () => {
  const responseSelector = makeSelectLoader();
  it('should select the loading', () => {
    const siteAccountState = {
      loading: true,
    };
    const mockedState = {
      siteAccountState: siteAccountState.loading,
    };
    expect(responseSelector(mockedState)).toEqual(siteAccountState.loading);
  });
});
describe('makeSelectCreateSelectList', () => {
  const responseSelector = makeSelectCreateSelectList();
  it('should select the createSelectList', () => {
    const siteAccountState = {
      createSelectList: false,
    };
    const mockedState = {
      siteAccountState: siteAccountState.createSelectList,
    };
    expect(responseSelector(mockedState)).toEqual(
      siteAccountState.createSelectList,
    );
  });
});
