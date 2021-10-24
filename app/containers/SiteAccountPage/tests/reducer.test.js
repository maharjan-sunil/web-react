/* eslint-disable react-hooks/rules-of-hooks */
/*  eslint-disable no-param-reassign */
import produce from 'immer';
import { reducer, initialState } from 'containers/SiteAccountPage/reducer';
import {
  getSiteAccountsAction,
  filterSiteAccountsAction,
  getSiteAccountAction,
  insertSiteAccountAction,
  updateSiteAccountAction,
  deleteSiteAccountAction,
  restoreSiteAccountAction,
  permanentDeleteSiteAccountAction,
  siteAccountsResponseAction,
  siteAccountResponseAction,
  responseAction,
  responseDeleteAction,
  responseRestoreAction,
  responsePermanentDeleteAction,
  getCreateSelectListAction,
  responseCreateSelectListAction,
  resetResultAction,
} from 'containers/SiteAccountPage/actions';

describe('reducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: true,
      error: false,
      request: false,
      siteAccounts: [],
      siteAccount: {},
      result: {},
      createSelectList: false,
    };
  });

  it('should return the initial state', () => {
    const expectedResult = {
      loading: true,
      error: false,
      request: false,
      siteAccounts: [],
      siteAccount: {},
      result: {},
      createSelectList: false,
    };
    expect(initialState).toEqual(expectedResult);
  });

  it('should handle the getSiteAccountsAction action correctly', () => {
    const filterParams = { siteName: '', carrierName: '', accountNumber: '' };
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.siteAccounts = [];
    });
    expect(reducer(state, getSiteAccountsAction(filterParams))).toEqual(
      expectedResult,
    );
  });

  it('should handle the filterSiteAccountsAction action correctly', () => {
    const filterParams = { siteName: '', carrierName: '', accountNumber: '' };
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.siteAccounts = [];
    });
    expect(reducer(state, filterSiteAccountsAction(filterParams))).toEqual(
      expectedResult,
    );
  });

  it('should handle the getSiteAccountAction action correctly', () => {
    const id = 1;
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.siteAccount = {};
    });
    expect(reducer(state, getSiteAccountAction(id))).toEqual(expectedResult);
  });

  it('should handle the insertSiteAccountAction action correctly', () => {
    const siteAccount = {
      id: 0,
      siteID: 'aac7397a-7113-4cd2-92f4-f22b2bb54e86',
      carrierID: 1,
      accountNumber: '12345',
      isDataConnection: false,
      isScan: false,
      deleted: false,
    };
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.result = 0;
    });
    expect(reducer(state, insertSiteAccountAction(siteAccount))).toEqual(
      expectedResult,
    );
  });

  it('should handle the updateSiteAccountAction action correctly', () => {
    const siteAccount = {
      id: 1,
      siteID: 'aac7397a-7113-4cd2-92f4-f22b2bb54e86',
      carrierID: 1,
      accountNumber: '12345',
      isDataConnection: false,
      isScan: false,
      deleted: false,
    };
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.result = 0;
    });
    expect(reducer(state, updateSiteAccountAction(siteAccount))).toEqual(
      expectedResult,
    );
  });

  it('should handle the deleteSiteAccountAction action correctly', () => {
    const id = 1;
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.result = 0;
    });
    expect(reducer(state, deleteSiteAccountAction(id))).toEqual(expectedResult);
  });

  it('should handle the restoreSiteAccountAction action correctly', () => {
    const id = 1;
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.result = 0;
    });
    expect(reducer(state, restoreSiteAccountAction(id))).toEqual(
      expectedResult,
    );
  });

  it('should handle the permanentDeleteSiteAccountAction action correctly', () => {
    const id = 1;
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.result = 0;
    });
    expect(reducer(state, permanentDeleteSiteAccountAction(id))).toEqual(
      expectedResult,
    );
  });

  it('should handle the siteAccountsResponseAction action correctly', () => {
    const action = {
      request: { siteName: '', carrierName: '', accountNumber: '' },
      response: {
        result: [
          {
            id: 1,
            siteID: 'aac7397a-7113-4cd2-92f4-f22b2bb54e86',
            carrierID: 1,
            accountNumber: '12345',
            isDataConnection: false,
            isScan: false,
            deleted: false,
          },
        ],
      },
    };
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = false;
      draft.request = action.request;
      draft.siteAccounts = action.response.result;
      draft.result = {};
    });
    expect(
      reducer(
        state,
        siteAccountsResponseAction(action.request, action.response),
      ),
    ).toEqual(expectedResult);
  });

  it('should handle the siteAccountResponseAction action correctly', () => {
    const action = {
      request: 1,
      response: {
        id: 1,
        siteID: 'aac7397a-7113-4cd2-92f4-f22b2bb54e86',
        carrierID: 1,
        accountNumber: '12345',
        isDataConnection: false,
        isScan: false,
        deleted: false,
      },
    };
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = false;
      draft.request = action.request;
      draft.result = {};
      draft.siteAccount = action.response;
    });
    expect(
      reducer(
        state,
        siteAccountResponseAction(action.request, action.response),
      ),
    ).toEqual(expectedResult);
  });

  it('should handle the responseAction action correctly', () => {
    const action = {
      request: 1,
      response: 1,
    };
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = false;
      draft.request = action.request;
      draft.result = action.response;
      draft.siteAccount = {};
      draft.siteAccounts = [];
    });
    expect(
      reducer(state, responseAction(action.request, action.response)),
    ).toEqual(expectedResult);
  });

  it('should handle the responseDeleteAction action correctly', () => {
    const action = {
      request: 1,
      response: 1,
    };
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = false;
      draft.request = action.request;
      draft.result = action.response;
      draft.siteAccount = {};
      draft.siteAccounts.forEach(siteAccount => {
        if (siteAccount.id === action.request) {
          siteAccount.deleted = true;
        }
      });
    });
    expect(
      reducer(state, responseDeleteAction(action.request, action.response)),
    ).toEqual(expectedResult);
  });

  it('should handle the responseRestoreAction action correctly', () => {
    const action = {
      request: 1,
      result: {},
    };
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = false;
      draft.request = action.request;
      draft.result = action.response;
      draft.siteAccount = {};
      draft.siteAccounts.forEach(siteAccount => {
        if (siteAccount.id === action.request) {
          siteAccount.deleted = true;
        }
      });
    });
    expect(
      reducer(state, responseRestoreAction(action.request, action.response)),
    ).toEqual(expectedResult);
  });

  it('should handle the responsePermanentDeleteAction action correctly', () => {
    const action = {
      request: 2,
      response: 1,
    };
    state.siteAccounts = [
      {
        id: 2,
        siteID: 'aac7397a-7113-4cd2-92f4-f22b2bb54e86',
        carrierID: 1,
        accountNumber: '12345',
        isDataConnection: false,
        isScan: false,
        deleted: false,
      },
    ];

    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = false;
      draft.request = action.request;
      draft.result = action.response;
      draft.siteAccounts = state.siteAccounts.filter(
        siteAccount => siteAccount.id !== action.request,
      );
      draft.siteAccount = {};
    });
    expect(
      reducer(
        state,
        responsePermanentDeleteAction(action.request, action.response),
      ),
    ).toEqual(expectedResult);
  });
  it('should handle the getCreateSelectListAction action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.createSelectList = false;
    });
    expect(reducer(state, getCreateSelectListAction())).toEqual(expectedResult);
  });

  it('should handle the responseCreateSelectListAction action correctly', () => {
    const action = {
      request: '',
      response: {
        createSelectList: {
          sites: [{ id: 'aac7397a-7113-4cd2-92f4-f22b2bb54e86', name: 'Seko' }],
          carriers: [{ id: 5, name: 'Fedex' }],
        },
      },
    };
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = false;
      draft.createSelectList = action.response;
    });
    expect(
      reducer(
        state,
        responseCreateSelectListAction(action.request, action.response),
      ),
    ).toEqual(expectedResult);
  });

  describe('produceResetResultAction', () => {
    it('should produce reset user action and set state', () => {
      const expectedResult = produce(state, draft => {
        draft.loading = false;
        draft.error = false;
        draft.result = 0;
      });
      expect(reducer(state, resetResultAction())).toEqual(expectedResult);
    });
  });
});
