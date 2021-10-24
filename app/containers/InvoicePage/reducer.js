import produce from 'immer';
import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  REVIEW_ACTION,
  RESEND_ACTION,
  REVALIDATE_ACTION,
  DELETE_ACTION,
  RESTORE_ACTION,
  PERMANENT_DELETE_ACTION,
  RESPONSE_ACTION,
  INVOICES_RESPONSE_ACTION,
  INVOICE_RESPONSE_ACTION,
  RESPONSE_DELETE_ACTION,
  RESPONSE_RESTORE_ACTION,
  RESPONSE_PERMANENT_DELETE_ACTION,
  RESET_RESULT_ACTION,
  RESET_STATUSCODE_ACTION,
  PAGE_ACTION,
  DOWNLOAD_ACTION,
  RESPONSE_DOWNLOAD_ACTION,
} from './Constants';

export const initialState = {
  actionLoading: false,
  loading: true,
  error: false,
  request: false,
  invoices: [],
  invoice: {},
  result: {},
  statusCode: 0,
  page: 0,
  perPage: 20,
  total: 0,
  fileContent: '',
};
/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.page = 0;
        draft.perPage = 20;
        draft.invoices = [];
        break;
      case FILTER_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.invoices = [];
        break;
      case PAGE_ACTION:
        draft.loading = true;
        draft.error = action.error;
        draft.invoices = [];
        break;
      case DETAIL_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.invoice = {};
        break;
      case REVIEW_ACTION:
        draft.actionLoading = true;
        draft.error = false;
        draft.result = 0;
        break;
      case RESEND_ACTION:
        draft.actionLoading = true;
        draft.error = false;
        draft.result = 0;
        break;
      case REVALIDATE_ACTION:
        draft.actionLoading = true;
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
      case DOWNLOAD_ACTION:
        draft.actionLoading = true;
        draft.error = false;
        draft.result = 0;
        break;
      case RESPONSE_DOWNLOAD_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = 0;
        draft.invoices = state.invoices;
        draft.fileContent = action.response.content;
        draft.invoice = {};
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
        draft.invoices.forEach(invoice => {
          if (invoice.id === action.request) {
            invoice.isDeleted = true;
          }
        });
        draft.invoice = {};
        break;
      case RESPONSE_RESTORE_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.invoices.forEach(invoice => {
          if (invoice.id === action.request) {
            invoice.isDeleted = false;
          }
        });
        draft.invoice = {};
        break;
      case RESPONSE_PERMANENT_DELETE_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.invoices = state.invoices.filter(
          invoice => invoice.id !== action.request,
        );
        draft.invoice = {};
        break;
      case RESPONSE_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = 1;
        draft.invoices.splice(
          state.invoices.findIndex(i => i.id === action.request),
          1,
          action.response,
        );
        draft.invoice = {};
        break;
      case INVOICES_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.request = action.request;
        draft.invoices = action.response.result;
        draft.result = {};
        draft.statusCode = action.statusCode;
        draft.page = action.response.page;
        draft.perPage = action.response.perPage;
        draft.total = action.response.total;
        break;
      case INVOICE_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.request = action.request;
        draft.invoice = action.response;
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
