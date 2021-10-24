import produce from 'immer';
import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  INSERT_ACTION,
  UPDATE_ACTION,
  DELETE_ACTION,
  RESPONSE_ACTION,
  SITES_RESPONSE_ACTION,
  SITE_RESPONSE_ACTION,
  RESPONSE_DELETE_ACTION,
  RESET_RESULT_ACTION,
  RESET_STATUSCODE_ACTION,
} from './Constants';

export const initialState = {
  loading: true,
  actionLoading: false,
  error: false,
  request: false,
  sites: [],
  site: {},
  result: {},
  page: 0,
  perPage: 20,
  total: 0,
  statusCode: 0,
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.sites = [];
        draft.page = 0;
        draft.perPage = 20;
        break;
      case FILTER_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.sites = [];
        break;
      case DETAIL_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.site = {};
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
      case RESPONSE_DELETE_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.sites = draft.sites.filter(
          site => site.siteId !== action.request,
        );
        draft.site = {};
        break;
      case RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.sites = [];
        draft.site = {};
        break;
      case SITES_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.request = action.request;
        draft.sites = action.response.result;
        draft.result = {};
        draft.statusCode = action.statusCode;
        draft.page = action.response.page;
        draft.perPage = action.response.perPage;
        draft.total = action.response.total;
        break;
      case SITE_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.request = action.request;
        draft.site = action.response;
        draft.result = {};
        draft.statusCode = action.statusCode;
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
