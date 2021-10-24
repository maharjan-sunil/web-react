/* eslint-disable no-case-declarations */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  DELETE_ACTION,
  RESTORE_ACTION,
  PERMANENT_DELETE_ACTION,
  RESPONSE_ACTION,
  EMAILS_RESPONSE_ACTION,
  EMAIL_RESPONSE_ACTION,
  RESPONSE_DELETE_ACTION,
  RESPONSE_RESTORE_ACTION,
  RESPONSE_RESEND_ACTION,
  RESPONSE_PERMANENT_DELETE_ACTION,
  RESET_RESULT_ACTION,
  RESET_STATUSCODE_ACTION,
  PAGE_ACTION,
  ROW_SELECT_ACTION,
} from './Constants';

export const initialState = {
  actionLoading: false,
  loading: true,
  error: false,
  request: false,
  emails: [],
  email: {},
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
        draft.emails = [];
        draft.page = 0;
        draft.perPage = 20;
        break;
      case FILTER_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.statusCode = 0;
        draft.emails = [];
        draft.selectedRow = -1;
        break;
      case PAGE_ACTION:
        draft.loading = true;
        draft.error = action.error;
        draft.emails = [];
        break;
      case DETAIL_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.statusCode = 0;
        draft.email = {};
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
        draft.emails.forEach(email => {
          if (email.id === action.request) {
            email.dataStatus = 3;
            email.isActive = false;
          }
        });
        draft.email = {};
        break;
      case RESPONSE_RESTORE_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.emails.forEach(email => {
          if (email.id === action.request) {
            email.dataStatus = 2;
            email.isActive = false;
          }
        });
        draft.email = {};
        break;
      case RESPONSE_RESEND_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.emails.forEach(email => {
          if (email.id === action.request) {
            email.status = 4;
          }
        });
        draft.emails = draft.emails.filter(f => f.id !== action.request);
        draft.email = {};
        break;
      case RESPONSE_PERMANENT_DELETE_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.emails = draft.emails.filter(f => f.id !== action.request);
        draft.email = {};
        draft.selectedRow = -1;
        break;
      case RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.emails = [];
        draft.email = {};
        break;
      case EMAILS_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.request = action.request;
        draft.emails = action.response.result;
        draft.page = action.response.page;
        draft.perPage = action.response.perPage;
        draft.total = action.response.total;
        draft.statusCode = action.statusCode;
        draft.result = {};
        break;
      case EMAIL_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.request = action.request;
        draft.email = action.response;
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
      case ROW_SELECT_ACTION:
        draft.selectedRow = action.selectedRow;
        break;
    }
  });
