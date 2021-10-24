/* eslint-disable no-unused-vars */
import { takeLatest, put } from 'redux-saga/effects';

import {
  getAllSiteAccount,
  getSiteAccount,
} from 'containers/SiteAccountPage/MockResponse/SiteAccountMock';

import siteAccountListener, {
  getSiteAccountsSaga,
  filterSiteAccountsSaga,
  getSiteAccountSaga,
  insertSiteAccountSaga,
  updateSiteAccountSaga,
  deleteSiteAccountSaga,
  restoreSiteAccountSaga,
  permanentDeleteSiteAccountSaga,
  getCreateSelectListSaga,
} from 'containers/SiteAccountPage/saga';

import {
  responseAction,
  siteAccountsResponseAction,
  siteAccountResponseAction,
  responseDeleteAction,
  responseRestoreAction,
  responsePermanentDeleteAction,
  responseCreateSelectListAction,
} from 'containers/SiteAccountPage/actions';
import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  INSERT_ACTION,
  UPDATE_ACTION,
  DELETE_ACTION,
  RESTORE_ACTION,
  PERMANENT_DELETE_ACTION,
  CREATE_SELECT_LIST_ACTION,
} from 'containers/SiteAccountPage/Constants';

describe('getSiteAccountsSaga', () => {
  it('should dispatch DEFAULT_ACTION action', () => {
    const response = getAllSiteAccount();
    const action = {
      filterParams: '&siteid=1&name=test',
    };
    let params = '';
    if (action.filterParams) {
      params += `${action.filterParams}`;
    }
    const generator = getSiteAccountsSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put(siteAccountsResponseAction(params, response)),
    );
  });
});

describe('filterSiteAccountsSaga', () => {
  it('should dispatch FILTER_ACTION action', () => {
    const response = getAllSiteAccount();
    const action = {
      filterParams: {
        Page: '1',
        PerPage: '20',
        siteName: 'seko',
        carrierName: 'Fedex',
        accountNumber: '123',
      },
    };
    let params = '';
    if (action.filterParams.siteName) {
      params += `sitename=${action.filterParams.siteName}`;
    }
    if (action.filterParams.carrierName) {
      params += `${params ? '&' : ''}carriername=${
        action.filterParams.carrierName
      }`;
    }
    if (action.filterParams.accountNumber) {
      params += `${params ? '&' : ''}accountnumber=${
        action.filterParams.accountNumber
      }`;
    }
    const generator = filterSiteAccountsSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put(siteAccountsResponseAction(params, response)),
    );
  });
});

describe('getSiteAccountSaga', () => {
  it('should dispatch DETAIL_ACTION action', () => {
    const action = { id: '1' };
    const response = getSiteAccount();
    const generator = getSiteAccountSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put(siteAccountResponseAction(action.id, response)),
    );
  });
});

describe('insertSiteAccountSaga', () => {
  it('should dispatch INSERT_ACTION action', () => {
    const action = {
      siteAccount: {
        id: 0,
        siteID: 'aac7397a-7113-4cd2-92f4-f22b2bb54e86',
        carrierID: 1,
        accountNumber: '12345',
        isDataConnection: false,
        isScan: false,
        deleted: false,
      },
    };
    const response = true;
    const generator = insertSiteAccountSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put(responseAction(action.siteAccount, response)),
    );
  });
});

describe('updateSiteAccountSaga', () => {
  it('should dispatch UPDATE_ACTION action', () => {
    const action = {
      siteAccount: {
        id: 1,
        siteID: 'aac7397a-7113-4cd2-92f4-f22b2bb54e86',
        carrierID: 1,
        accountNumber: '12345',
        isDataConnection: false,
        isScan: false,
        deleted: false,
      },
    };
    const response = true;
    const generator = updateSiteAccountSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put(responseAction(action.siteAccount, response)),
    );
  });
});

describe('deleteSiteAccountSaga', () => {
  it('should dispatch DELETE_ACTION action', () => {
    const action = { id: '1' };
    const response = true;
    const generator = deleteSiteAccountSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put(responseDeleteAction(action.id, response)),
    );
  });
});

describe('restoreSiteAccountSaga', () => {
  it('should dispatch RESTORE_ACTION action', () => {
    const action = { id: '1' };
    const response = true;
    const generator = restoreSiteAccountSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put(responseRestoreAction(action.id, response)),
    );
  });
});

describe('permanentDeleteSiteAccountSaga', () => {
  it('should dispatch PERMANENT_DELETE_ACTION action', () => {
    const action = { id: '1' };
    const response = true;
    const generator = permanentDeleteSiteAccountSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put(responsePermanentDeleteAction(action.id, response)),
    );
  });
});

describe('getCreateSelectListSaga', () => {
  it('should dispatch CREATE_SELECT_LIST_ACTION action', () => {
    const action = '';
    const siteSelectList = [{ id: '1', name: 'Seko' }];
    const carrierSelectList = [{ id: 1, name: 'Fedex' }];
    const response = {
      sites: [{ id: '1', name: 'Seko' }],
      carriers: [{ id: 1, name: 'Fedex' }],
    };
    const generator = getCreateSelectListSaga();
    generator.next();
    generator.next();
    generator.next();
    expect(generator.next().done).toEqual(true);

    // expect(generator.next(response).value).toEqual(put(responseCreateSelectListAction(action, response)));
  });
});

describe('siteAccountListener Saga', () => {
  const siteAccountGenerator = siteAccountListener();
  let callDescriptor = siteAccountGenerator.next().value;
  expect(callDescriptor).toEqual(
    takeLatest(DEFAULT_ACTION, getSiteAccountsSaga),
  );

  callDescriptor = siteAccountGenerator.next().value;
  expect(callDescriptor).toEqual(
    takeLatest(FILTER_ACTION, filterSiteAccountsSaga),
  );

  callDescriptor = siteAccountGenerator.next().value;
  expect(callDescriptor).toEqual(takeLatest(DETAIL_ACTION, getSiteAccountSaga));

  callDescriptor = siteAccountGenerator.next().value;
  expect(callDescriptor).toEqual(
    takeLatest(INSERT_ACTION, insertSiteAccountSaga),
  );

  callDescriptor = siteAccountGenerator.next().value;
  expect(callDescriptor).toEqual(
    takeLatest(UPDATE_ACTION, updateSiteAccountSaga),
  );

  callDescriptor = siteAccountGenerator.next().value;
  expect(callDescriptor).toEqual(
    takeLatest(DELETE_ACTION, deleteSiteAccountSaga),
  );

  callDescriptor = siteAccountGenerator.next().value;
  expect(callDescriptor).toEqual(
    takeLatest(RESTORE_ACTION, restoreSiteAccountSaga),
  );

  callDescriptor = siteAccountGenerator.next().value;
  expect(callDescriptor).toEqual(
    takeLatest(PERMANENT_DELETE_ACTION, permanentDeleteSiteAccountSaga),
  );

  callDescriptor = siteAccountGenerator.next().value;
  expect(callDescriptor).toEqual(
    takeLatest(CREATE_SELECT_LIST_ACTION, getCreateSelectListSaga),
  );
});
