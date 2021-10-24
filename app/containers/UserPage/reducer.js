/* eslint-disable no-case-declarations */
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
  RESPONSE_ACTION,
  USERS_RESPONSE_ACTION,
  USER_RESPONSE_ACTION,
  RESPONSE_DELETE_ACTION,
  RESPONSE_RESTORE_ACTION,
  RESPONSE_PERMANENT_DELETE_ACTION,
  RESET_RESULT_ACTION,
  RESET_STATUSCODE_ACTION,
  USER_PROFILE_ACTION,
  PAGE_ACTION,
  ROW_SELECT_ACTION,
} from './Constants';

export const initialState = {
  actionLoading: false,
  loading: true,
  error: false,
  request: false,
  users: [],
  user: {},
  result: {},
  page: 0,
  perPage: 20,
  total: 0,
  statusCode: 0,
  selectedRow: -1,
};
/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.statusCode = 0;
        draft.users = [];
        draft.page = 0;
        draft.perPage = 20;
        break;
      case FILTER_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.statusCode = 0;
        draft.users = [];
        draft.selectedRow = -1;
        break;
      case DETAIL_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.statusCode = 0;
        draft.user = {};
        break;
      case INSERT_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.statusCode = 0;
        draft.result = 0;
        draft.selectedRow = -1;
        break;
      case UPDATE_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.statusCode = 0;
        draft.result = 0;
        break;
      case DELETE_ACTION:
        draft.actionLoading = true;
        draft.error = false;
        draft.statusCode = 0;
        draft.result = 0;
        break;
      case RESTORE_ACTION:
        draft.actionLoading = true;
        draft.error = false;
        draft.statusCode = 0;
        draft.result = 0;
        break;
      case PERMANENT_DELETE_ACTION:
        draft.actionLoading = true;
        draft.error = false;
        draft.statusCode = 0;
        draft.result = 0;
        break;
      case RESPONSE_DELETE_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.users.forEach(user => {
          if (user.id === action.request) {
            user.dataStatus = 3;
            user.isActive = false;
          }
        });
        draft.user = {};
        break;
      case RESPONSE_RESTORE_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.users.forEach(user => {
          if (user.id === action.request) {
            user.dataStatus = 2;
            user.isActive = false;
          }
        });
        draft.user = {};
        break;
      case RESPONSE_PERMANENT_DELETE_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.users = draft.users.filter(f => f.id !== action.request);
        draft.user = {};
        draft.selectedRow = -1;
        break;
      case RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.users = [];
        draft.user = {};
        break;
      case USERS_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.request = action.request;
        draft.users = action.response.result;
        draft.page = action.response.page;
        draft.perPage = action.response.perPage;
        draft.total = action.response.total;
        draft.statusCode = action.statusCode;
        draft.result = {};
        break;
      case USER_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.request = action.request;
        draft.user = action.response;
        draft.result = {};
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
      case USER_PROFILE_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.user = {};
        break;
      case PAGE_ACTION:
        draft.loading = true;
        draft.error = action.error;
        draft.users = [];
        break;
      case ROW_SELECT_ACTION:
        draft.selectedRow = action.selectedRow;
        break;
    }
  });
