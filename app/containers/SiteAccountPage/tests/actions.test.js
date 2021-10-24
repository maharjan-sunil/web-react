import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  INSERT_ACTION,
  UPDATE_ACTION,
  DELETE_ACTION,
  RESTORE_ACTION,
  PERMANENT_DELETE_ACTION,
  RESPONSE_ACTION,
  RESPONSE_DELETE_ACTION,
  RESPONSE_RESTORE_ACTION,
  SITEACCOUNTS_RESPONSE_ACTION,
  RESPONSE_PERMANENT_DELETE_ACTION,
  SITEACCOUNT_RESPONSE_ACTION,
  CREATE_SELECT_LIST_ACTION,
  RESPONSE_CREATE_SELECT_LIST_ACTION,
  RESET_RESULT_ACTION,
} from 'containers/SiteAccountPage/Constants';
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

describe('SiteAccounts Actions', () => {
  describe('getSiteAccountsAction', () => {
    it('should create an action to get default siteAccounts', () => {
      const expectedResult = {
        type: DEFAULT_ACTION,
      };
      expect(getSiteAccountsAction()).toEqual(expectedResult);
    });
  });

  describe('filterSiteAccountsAction', () => {
    it('should create an action to filter siteAccounts', () => {
      const filterParams = {
        siteName: 'seko',
        carrierName: 'Fedex',
        accountNumber: '12345',
      };
      const expectedResult = {
        type: FILTER_ACTION,
        filterParams,
      };
      expect(filterSiteAccountsAction(filterParams)).toEqual(expectedResult);
    });
  });

  describe('getSiteAccountAction', () => {
    it('should create an action to get siteAccount by id', () => {
      const id = 1;
      const expectedResult = {
        type: DETAIL_ACTION,
        id,
      };
      expect(getSiteAccountAction(id)).toEqual(expectedResult);
    });
  });

  describe('insertSiteAccountAction', () => {
    it('should create an action to insert siteAccount', () => {
      const siteAccount = {
        siteID: 'aac7397a-7113-4cd2-92f4-f22b2bb54e86',
        carrierID: 1,
        accountNumber: '12345',
        isDataConnection: false,
        isScan: true,
      };
      const expectedResult = {
        type: INSERT_ACTION,
        siteAccount,
      };
      expect(insertSiteAccountAction(siteAccount)).toEqual(expectedResult);
    });
  });

  describe('updateSiteAccountAction', () => {
    it('should create an action to update siteAccount', () => {
      const siteAccount = {
        id: 1,
        siteID: 'aac7397a-7113-4cd2-92f4-f22b2bb54e86',
        carrierID: 1,
        accountNumber: '12345',
        isDataConnection: false,
        isScan: true,
      };
      const expectedResult = {
        type: UPDATE_ACTION,
        siteAccount,
      };
      expect(updateSiteAccountAction(siteAccount)).toEqual(expectedResult);
    });
  });

  describe('deleteSiteAccountAction', () => {
    it('should create an action to delete siteAccount', () => {
      const id = 1;
      const expectedResult = {
        type: DELETE_ACTION,
        id,
      };
      expect(deleteSiteAccountAction(id)).toEqual(expectedResult);
    });
  });

  describe('restoreSiteAccountAction', () => {
    it('should create an action to restore siteAccount', () => {
      const id = 1;
      const expectedResult = {
        type: RESTORE_ACTION,
        id,
      };
      expect(restoreSiteAccountAction(id)).toEqual(expectedResult);
    });
  });

  describe('permanentDeleteSiteAccountAction', () => {
    it('should create an action to permanently delete siteAccount', () => {
      const id = 1;
      const expectedResult = {
        type: PERMANENT_DELETE_ACTION,
        id,
      };
      expect(permanentDeleteSiteAccountAction(id)).toEqual(expectedResult);
    });
  });

  describe('responseAction', () => {
    it('should create an action for response', () => {
      const request = 1;
      const response = 1;
      const expectedResult = {
        type: RESPONSE_ACTION,
        request,
        response,
      };
      expect(responseAction(request, response)).toEqual(expectedResult);
    });
  });

  describe('responseDeleteAction', () => {
    it('should create an action for delete action', () => {
      const request = 2;
      const response = 1;
      const expectedResult = {
        type: RESPONSE_DELETE_ACTION,
        request,
        response,
      };
      expect(responseDeleteAction(request, response)).toEqual(expectedResult);
    });
  });

  describe('responesRestoreAction', () => {
    it('should create an action for restore action', () => {
      const request = 2;
      const response = 1;
      const expectedResult = {
        type: RESPONSE_RESTORE_ACTION,
        request,
        response,
      };
      expect(responseRestoreAction(request, response)).toEqual(expectedResult);
    });
  });

  describe('responsePermanentDeleteAction', () => {
    it('should create an action for permanent delete action', () => {
      const request = 2;
      const response = 1;
      const expectedResult = {
        type: RESPONSE_PERMANENT_DELETE_ACTION,
        request,
        response,
      };
      expect(responsePermanentDeleteAction(request, response)).toEqual(
        expectedResult,
      );
    });
  });

  describe('siteAccountsResponseAction', () => {
    it('should create an action for siteAccounts response', () => {
      const request = {
        id: 1,
        siteID: 'aac7397a-7113-4cd2-92f4-f22b2bb54e86',
        carrierID: 1,
        accountNumber: '12345',
        isDataConnection: false,
        isScan: true,
      };
      const response = [
        {
          id: 2,
          siteID: 'ec876861-a22f-4538-afd3-d98273a1cb57',
          carrierID: 2,
          accountNumber: '56789',
          isDataConnection: false,
          isScan: true,
        },
      ];
      const expectedResult = {
        type: SITEACCOUNTS_RESPONSE_ACTION,
        request,
        response,
      };
      expect(siteAccountsResponseAction(request, response)).toEqual(
        expectedResult,
      );
    });
  });

  describe('siteAccountResponseAction', () => {
    it('should create an action for siteAccount response', () => {
      const request = 1;
      const response = {
        id: 1,
        siteID: 'aac7397a-7113-4cd2-92f4-f22b2bb54e86',
        carrierID: 1,
        accountNumber: '12345',
        isDataConnection: false,
        isScan: true,
      };
      const expectedResult = {
        type: SITEACCOUNT_RESPONSE_ACTION,
        request,
        response,
      };
      expect(siteAccountResponseAction(request, response)).toEqual(
        expectedResult,
      );
    });
  });
  describe('getCreateSelectListAction', () => {
    it('should create an action to get createSelectList', () => {
      const expectedResult = {
        type: CREATE_SELECT_LIST_ACTION,
      };
      expect(getCreateSelectListAction()).toEqual(expectedResult);
    });
  });
  describe('responseCreateSelectListAction', () => {
    it('should create an action for createSelectList action', () => {
      const request = '';
      const response = {
        createSelectList: {
          sites: [{ id: 'aac7397a-7113-4cd2-92f4-f22b2bb54e86', name: 'Seko' }],
          carriers: [{ id: 5, name: 'Fedex' }],
        },
      };
      const expectedResult = {
        type: RESPONSE_CREATE_SELECT_LIST_ACTION,
        request,
        response,
      };
      expect(responseCreateSelectListAction(request, response)).toEqual(
        expectedResult,
      );
    });
  });
  describe('resetResultAction', () => {
    it('should create an action to reset siteAccounts', () => {
      const expectedResult = {
        type: RESET_RESULT_ACTION,
      };
      expect(resetResultAction()).toEqual(expectedResult);
    });
  });
});
