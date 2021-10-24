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
import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  INSERT_ACTION,
  UPDATE_ACTION,
  DELETE_ACTION,
  RESPONSE_ACTION,
  RESPONSE_DELETE_ACTION,
  SITES_RESPONSE_ACTION,
  SITE_RESPONSE_ACTION,
  RESET_RESULT_ACTION,
} from 'containers/SitePage/Constants';

describe('Site Actions', () => {
  describe('getSitesAction', () => {
    it('should return the correct type and passed data', () => {
      const expectedResult = {
        type: DEFAULT_ACTION,
      };
      expect(getSitesAction()).toEqual(expectedResult);
    });
  });

  describe('filterSitesAction', () => {
    it('should return the correct type and passed sites', () => {
      const fixture = ['filterParams'];
      const expectedResult = {
        type: FILTER_ACTION,
        filterParams: fixture,
      };
      expect(filterSitesAction(fixture)).toEqual(expectedResult);
    });
  });

  describe('getSiteAction', () => {
    it('should return the correct type and passed data', () => {
      const fixture = ['id'];
      const expectedResult = {
        type: DETAIL_ACTION,
        id: fixture,
      };
      expect(getSiteAction(fixture)).toEqual(expectedResult);
    });
  });

  describe('insertSiteAction', () => {
    it('should return the correct type and the passed sites', () => {
      const fixture = ['Test'];
      const expectedResult = {
        type: INSERT_ACTION,
        site: fixture,
      };
      expect(insertSiteAction(fixture)).toEqual(expectedResult);
    });
  });

  describe('updateSiteAction', () => {
    it('should return the correct type and siteId', () => {
      const fixture = '1';
      const expectedResult = {
        type: UPDATE_ACTION,
        site: fixture,
      };
      expect(updateSiteAction(fixture)).toEqual(expectedResult);
    });
  });

  describe('deleteSiteAction', () => {
    it('should return the correct type and site', () => {
      const id = ['id'];
      const expectedResult = {
        type: DELETE_ACTION,
        id,
      };
      expect(deleteSiteAction(id)).toEqual(expectedResult);
    });
  });

  describe('responseAction', () => {
    it('should return the correct type and data', () => {
      const req = ['request'];
      const res = ['response'];
      const expectedResult = {
        type: RESPONSE_ACTION,
        request: req,
        response: res,
      };
      expect(responseAction(req, res)).toEqual(expectedResult);
    });
  });

  describe('responseDeleteAction', () => {
    it('should return the correct type and response', () => {
      const req = ['request'];
      const res = ['response'];
      const expectedResult = {
        type: RESPONSE_DELETE_ACTION,
        request: req,
        response: res,
      };
      expect(responseDeleteAction(req, res)).toEqual(expectedResult);
    });
  });

  describe('sitesResponseAction', () => {
    it('should return the correct type and data', () => {
      const req = ['request'];
      const res = ['response'];
      const expectedResult = {
        type: SITES_RESPONSE_ACTION,
        request: req,
        response: res,
      };
      expect(sitesResponseAction(req, res)).toEqual(expectedResult);
    });
  });

  describe('siteResponseAction', () => {
    it('should return the correct type and response', () => {
      const req = ['request'];
      const res = ['response'];
      const expectedResult = {
        type: SITE_RESPONSE_ACTION,
        request: req,
        response: res,
      };
      expect(siteResponseAction(req, res)).toEqual(expectedResult);
    });
  });

  describe('resetResultAction', () => {
    it('should create an action to reset sites', () => {
      const expectedResult = {
        type: RESET_RESULT_ACTION,
      };
      expect(resetResultAction()).toEqual(expectedResult);
    });
  });
});
