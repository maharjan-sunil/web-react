import produce from 'immer';
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
  RESPONSE_ACTION,
  SITEACCOUNTS_RESPONSE_ACTION,
  SITEACCOUNT_RESPONSE_ACTION,
  RESPONSE_DELETE_ACTION,
  RESPONSE_RESTORE_ACTION,
  RESPONSE_PERMANENT_DELETE_ACTION,
  RESPONSE_CREATE_SELECT_LIST_ACTION,
  RESET_RESULT_ACTION,
  RESET_STATUSCODE_ACTION,
} from './Constants';

export const initialState = {
  actionLoading: false,
  loading: true,
  error: false,
  request: false,
  siteAccounts: [],
  siteAccount: {},
  result: {},
  createSelectList: false,
  statusCode: 0,
  page: 0,
  perPage: 20,
  total: 0,
};
/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.siteAccounts = [];
        draft.createSelectList = false;
        draft.page = 0;
        draft.perPage = 20;
        break;
      case FILTER_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.siteAccounts = [];
        draft.createSelectList = false;
        break;
      case DETAIL_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.siteAccount = {};
        break;
      case INSERT_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.result = 0;
        break;
      case UPDATE_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.result = 0;
        break;
      case DELETE_ACTION:
        draft.actionLoading = true;
        draft.error = false;
        draft.result = 0;
        break;
      case RESTORE_ACTION:
        draft.actionLoading = true;
        draft.error = false;
        draft.result = 0;
        break;
      case PERMANENT_DELETE_ACTION:
        draft.actionLoading = true;
        draft.error = false;
        draft.result = 0;
        break;
      case RESPONSE_DELETE_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.siteAccounts.forEach(siteAccount => {
          if (siteAccount.id === action.request) {
            siteAccount.deleted = true;
          }
        });
        draft.siteAccount = {};
        break;
      case RESPONSE_RESTORE_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.siteAccounts.forEach(siteAccount => {
          if (siteAccount.id === action.request) {
            siteAccount.deleted = false;
          }
        });
        draft.siteAccount = {};
        break;
      case RESPONSE_PERMANENT_DELETE_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.siteAccounts = state.siteAccounts.filter(
          siteAccount => siteAccount.id !== action.request,
        );
        draft.siteAccount = {};
        break;
      case RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.siteAccounts = [];
        draft.siteAccount = {};
        break;
      case SITEACCOUNTS_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.request = action.request;
        draft.siteAccounts = action.response.result;
        draft.result = {};
        draft.statusCode = action.statusCode;
        draft.page = action.response.page;
        draft.perPage = action.response.perPage;
        draft.total = action.response.total;
        break;
      case SITEACCOUNT_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.request = action.request;
        draft.siteAccount = action.response;
        draft.result = {};
        draft.statusCode = action.statusCode;
        break;
      case CREATE_SELECT_LIST_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.createSelectList = false;
        draft.result = 0;
        break;
      case RESPONSE_CREATE_SELECT_LIST_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.createSelectList = action.response;
        break;
      case RESET_RESULT_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.result = 0;
        draft.statusCode = 0;
        break;
      case RESET_STATUSCODE_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.result = 0;
        draft.statusCode = 0;
        break;
    }
  });
