import { put, takeLatest } from 'redux-saga/effects';
import {
  sitesResponseAction,
  siteResponseAction,
  responseAction,
  responseDeleteAction,
} from 'containers/SitePage/actions';

import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  INSERT_ACTION,
  UPDATE_ACTION,
  DELETE_ACTION,
} from 'containers/SitePage/Constants';

import allActions, {
  getSitesSaga,
  filterSitesSaga,
  getSiteSaga,
  insertSiteSaga,
  updateSiteSaga,
  deleteSiteSaga,
} from 'containers/SitePage/saga';

describe('getSitesSaga', () => {
  it('should dispatch DEFAULT_ACTION action', () => {
    const response = [{ siteId: '123' }];
    const action = {
      filterParams: '&siteid=1&name=test',
    };
    let params = '';
    if (action.filterParams) {
      params += `${action.filterParams}`;
    }
    const generator = getSitesSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put(sitesResponseAction(params, response)),
    );
  });
});

describe('filterSitesSaga', () => {
  it('should dispatch FILTER_ACTION action', () => {
    const response = [{ siteId: '123' }];
    const action = {
      filterParams: {
        Page: '1',
        PerPage: '20',
        siteName: 'Test',
        ftpUsername: 'Uname',
        siteUsername: 'Uname',
        siteIP: '1',
        siteFTPIP: '123',
      },
    };
    let params = '';
    if (action.filterParams.siteName) {
      params += `${params ? '&' : ''}sitename=${action.filterParams.siteName}`;
    }
    if (action.filterParams.ftpUsername) {
      params += `${params ? '&' : ''}ftpusername=${
        action.filterParams.ftpUsername
      }`;
    }
    if (action.filterParams.siteUsername) {
      params += `${params ? '&' : ''}siteusername=${
        action.filterParams.siteUsername
      }`;
    }
    if (action.filterParams.siteIP) {
      params += `${params ? '&' : ''}siteip=${action.filterParams.siteIP}`;
    }
    if (action.filterParams.siteFTPIP) {
      params += `${params ? '&' : ''}siteftpip=${
        action.filterParams.siteFTPIP
      }`;
    }
    const generator = filterSitesSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put(sitesResponseAction(params, response)),
    );
    expect(generator.next().done).toEqual(true);
  });
});

describe('getSiteSaga', () => {
  it('should dispatch DETAIL_ACTION action', () => {
    const action = { id: '1' };
    const response = {
      siteId: '213213-1232-132-1312-dgdf324',
    };
    const generator = getSiteSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put(siteResponseAction(action.id, response)),
    );
  });
});

describe('insertSiteSaga', () => {
  it('should dispatch INSERT_ACTION action', () => {
    const action = {
      site: {
        siteId: '123',
      },
    };
    const response = true;
    const generator = insertSiteSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put(responseAction(action.site, response)),
    );
  });
});

describe('updateSiteSaga', () => {
  it('should dispatch UPDATE_SITE action', () => {
    const action = {
      site: {
        siteId: '123',
      },
    };
    const response = true;
    const generator = updateSiteSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put(responseAction(action.site, response)),
    );
  });
});

describe('deleteSiteSaga', () => {
  it('should dispatch DELETE_SITE action', () => {
    const action = { id: '1' };
    const response = true;
    const generator = deleteSiteSaga(action);
    generator.next();
    expect(generator.next(response).value).toEqual(
      put(responseDeleteAction(action.id, response)),
    );
  });
});

describe('SitePage Sagas', () => {
  const sitesGenerator = allActions();

  let callDescriptor = sitesGenerator.next().value;
  expect(callDescriptor).toEqual(takeLatest(DEFAULT_ACTION, getSitesSaga));

  callDescriptor = sitesGenerator.next().value;
  expect(callDescriptor).toEqual(takeLatest(FILTER_ACTION, filterSitesSaga));

  callDescriptor = sitesGenerator.next().value;
  expect(callDescriptor).toEqual(takeLatest(DETAIL_ACTION, getSiteSaga));

  callDescriptor = sitesGenerator.next().value;
  expect(callDescriptor).toEqual(takeLatest(INSERT_ACTION, insertSiteSaga));

  callDescriptor = sitesGenerator.next().value;
  expect(callDescriptor).toEqual(takeLatest(UPDATE_ACTION, updateSiteSaga));

  callDescriptor = sitesGenerator.next().value;
  expect(callDescriptor).toEqual(takeLatest(DELETE_ACTION, deleteSiteSaga));
});
