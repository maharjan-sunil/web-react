/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  getSitesAction,
  filterSitesAction,
  getSiteAction,
  insertSiteAction,
  updateSiteAction,
  deleteSiteAction,
  responseAction,
  responseDeleteAction,
  sitesResponseAction,
  siteResponseAction,
  resetResultAction,
} from 'containers/SitePage/actions';
import { reducer, initialState } from 'containers/SitePage/reducer';

describe('sitePageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
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
  });

  it('should return the initial state', () => {
    const expectedResult = {
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
    expect(initialState).toEqual(expectedResult);
  });

  it('should handle the getSitesAction action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.sites = [];
    });
    expect(reducer(state, getSitesAction())).toEqual(expectedResult);
  });

  it('should handle the filterSitesAction action correctly', () => {
    const filterParams = {
      siteName: 'test',
      sieteIp: '123',
      ftpUsername: '123',
    };
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.sites = [];
    });
    expect(reducer(state, filterSitesAction(filterParams))).toEqual(
      expectedResult,
    );
  });

  it('should handle the getSiteAction action correctly', () => {
    const siteId = '123';
    const expectedResult = produce(state, draft => {
      draft.site = {};
      draft.loading = true;
      draft.error = false;
    });
    expect(reducer(state, getSiteAction(siteId))).toEqual(expectedResult);
  });

  it('should handle the insertSiteAction action correctly', () => {
    const site = {
      siteId: '123',
      siteName: 'MySite',
    };
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.result = 0;
    });
    expect(reducer(state, insertSiteAction(site))).toEqual(expectedResult);
  });

  it('should handle the updateSiteAction action correctly', () => {
    const site = {
      siteId: '123',
      siteName: 'MySite',
    };
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.result = 0;
    });

    expect(reducer(state, updateSiteAction(site))).toEqual(expectedResult);
  });

  it('should handle the deleteSiteAction action correctly', () => {
    const siteId = 1;
    const expectedResult = produce(state, draft => {
      draft.error = false;
      draft.loading = true;
      draft.result = 0;
    });
    expect(reducer(state, deleteSiteAction(siteId))).toEqual(expectedResult);
  });

  it('should handle the responseAction action correctly', () => {
    const req = 1;
    const res = 1;
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = false;
      draft.request = req;
      draft.result = res;
      draft.sites = [];
      draft.site = {};
    });
    expect(reducer(state, responseAction(req, res))).toEqual(expectedResult);
  });

  it('should handle the responseDeleteAction action correctly', () => {
    const siteId = 1;
    const res = 1;
    state.sites = [
      {
        siteId: '123',
        siteName: 'site 1',
      },
      {
        siteId: '1234',
        siteName: 'site 2',
      },
    ];
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = false;
      draft.request = siteId;
      draft.result = res;
      draft.sites = state.sites.filter(site => site.siteId !== siteId);
    });

    expect(reducer(state, responseDeleteAction(siteId, res))).toEqual(
      expectedResult,
    );
  });

  it('should handle the sitesResponseAction action correctly', () => {
    const filterParams = { name: 'test', email: 'test', mobile: '123' };
    const res = {
      page: 0,
      perPage: 20,
      total: 0,
      result: [
        {
          siteId: '123',
          siteName: 'test user',
        },
      ],
    };
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = false;
      draft.request = filterParams;
      draft.sites = res.result;
      draft.page = res.page;
      draft.perPage = res.perPage;
      draft.total = res.total;
      draft.result = {};
    });
    expect(reducer(state, sitesResponseAction(filterParams, res))).toEqual(
      expectedResult,
    );
  });

  it('should handle the siteResponseAction action correctly', () => {
    const siteId = '123';
    const res = {
      siteId: '123',
      siteName: 'site 1',
    };
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = false;
      draft.request = siteId;
      draft.sites = [];
      draft.site = res;
    });
    expect(reducer(state, siteResponseAction(siteId, res))).toEqual(
      expectedResult,
    );
  });

  describe('produceResetResultAction', () => {
    it('should produce reset site action and set state', () => {
      const expectedResult = produce(state, draft => {
        draft.loading = false;
        draft.error = false;
        draft.result = 0;
      });
      expect(reducer(state, resetResultAction())).toEqual(expectedResult);
    });
  });
});
