import {
  selectSite,
  makeSelectError,
  makeSelectSites,
  makeSelectSite,
  makeSelectResult,
  makeSelectLoader,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
} from 'containers/SitePage/selectors';

describe('selectSite', () => {
  it('should select the sitePage state', () => {
    const siteState = {
      loading: true,
      error: false,
      request: false,
      sites: [],
      site: {},
      result: {},
      page: 0,
      perPage: 20,
      total: 0,
    };
    const mockedState = {
      site: siteState,
    };
    expect(selectSite(mockedState)).toEqual(siteState);
  });
});

describe('makeSelectLoader', () => {
  const responseSelector = makeSelectLoader();
  it('should select the response', () => {
    const siteState = {
      loading: true,
    };
    const mockedState = {
      siteState: siteState.loading,
    };
    expect(responseSelector(mockedState)).toEqual(siteState.loading);
  });
});

describe('makeSelectError', () => {
  const responseSelector = makeSelectError();
  it('should select the response', () => {
    const siteState = {
      error: false,
    };
    const mockedState = {
      siteState: siteState.error,
    };
    expect(responseSelector(mockedState)).toEqual(siteState.error);
  });
});

describe('makeSelectSites', () => {
  const responseSelector = makeSelectSites();
  it('should select the response', () => {
    const siteState = {
      sites: [],
    };
    const mockedState = {
      siteState: siteState.sites,
    };
    expect(responseSelector(mockedState)).toEqual(siteState.sites);
  });
});

describe('makeSelectSite', () => {
  const responseSelector = makeSelectSite();
  it('should select the response', () => {
    const siteState = {
      site: {},
    };
    const mockedState = {
      siteState: siteState.site,
    };
    expect(responseSelector(mockedState)).toEqual(siteState.site);
  });
});

describe('makeSelectResult', () => {
  const responseSelector = makeSelectResult();
  it('should select the response', () => {
    const siteState = {
      result: {},
    };
    const mockedState = {
      siteState: siteState.result,
    };
    expect(responseSelector(mockedState)).toEqual(siteState.result);
  });
});

describe('makeSelectPage', () => {
  const responseSelector = makeSelectPage();
  it('should select the response', () => {
    const siteState = {
      page: 0,
    };
    const mockedState = {
      siteState: siteState.page,
    };
    expect(responseSelector(mockedState)).toEqual(siteState.page);
  });
});

describe('makeSelectPerPage', () => {
  const responseSelector = makeSelectPerPage();
  it('should select the response', () => {
    const siteState = {
      perPage: 20,
    };
    const mockedState = {
      siteState: siteState.perPage,
    };
    expect(responseSelector(mockedState)).toEqual(siteState.perPage);
  });
});

describe('makeSelectTotal', () => {
  const responseSelector = makeSelectTotal();
  it('should select the response', () => {
    const siteState = {
      total: 0,
    };
    const mockedState = {
      siteState: siteState.total,
    };
    expect(responseSelector(mockedState)).toEqual(siteState.total);
  });
});
