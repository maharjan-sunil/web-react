import produce from 'immer';
import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  RESEND_ACTION,
  DELETE_ACTION,
  RESTORE_ACTION,
  PERMANENT_DELETE_ACTION,
  FTPFILES_RESPONSE_ACTION,
  FTPFILE_RESPONSE_ACTION,
  RESPONSE_DELETE_ACTION,
  RESPONSE_RESTORE_ACTION,
  RESPONSE_PERMANENT_DELETE_ACTION,
  RESPONSE_ACTION,
  RESET_RESULT_ACTION,
  RESET_STATUSCODE_ACTION,
  PAGE_ACTION,
  DOWNLOAD_ACTION,
  RESPONSE_DOWNLOAD_ACTION,
} from './Constants';

export const initialState = {
  loading: true,
  actionLoading: true,
  error: false,
  ftpFiles: [],
  ftpFile: {},
  result: 0,
  fileContent: '',
  page: 0,
  perPage: 20,
  total: 0,
  statusCode: 0,
  requestResponse: {},
  selectedRow: -1,
};

/* eslint-disable default-case, no-param-reassign */
export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        draft.page = 0;
        draft.perPage = 20;
        draft.loading = true;
        draft.error = false;
        draft.ftpFiles = [];
        break;
      case FILTER_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.statusCode = 0;
        draft.ftpFiles = [];
        draft.selectedRow = -1;
        break;
      case PAGE_ACTION:
        draft.loading = true;
        draft.error = action.error;
        draft.ftpFiles = [];
        break;
      case DETAIL_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.ftpFile = {};
        break;
      case RESEND_ACTION:
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
      case PERMANENT_DELETE_ACTION:
        draft.actionLoading = true;
        draft.error = false;
        draft.result = 0;
        break;
      case DOWNLOAD_ACTION:
        draft.actionLoading = true;
        draft.error = false;
        draft.fileContent = '';
        break;
      case RESPONSE_DOWNLOAD_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.fileContent = action.response.content;
        break;
      case RESPONSE_PERMANENT_DELETE_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.ftpFiles = state.ftpFiles.filter(
          ftpFile => ftpFile.id !== action.request,
        );
        break;
      case RESPONSE_RESTORE_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.ftpFiles.forEach(ftpFile => {
          if (ftpFile.id === action.request) {
            ftpFile.dataStatus = 2;
          }
        });
        break;
      case RESPONSE_DELETE_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = action.response;
        draft.ftpFiles.forEach(ftpFile => {
          if (ftpFile.id === action.request) {
            ftpFile.dataStatus = 3;
          }
        });
        break;
      case RESPONSE_ACTION:
        draft.actionLoading = false;
        draft.error = false;
        draft.request = action.request;
        draft.result = 1;
        draft.ftpFiles.splice(
          state.ftpFiles.findIndex(i => i.id === action.request),
          1,
          action.response.result,
        );
        break;
      case FTPFILES_RESPONSE_ACTION:
        draft.loading = false;
        draft.actionLoading = false;
        draft.error = false;
        draft.ftpFiles = action.response.result;
        draft.page = action.response.page;
        draft.perPage = action.response.perPage;
        draft.total = action.response.total;
        draft.statusCode = action.statusCode;
        break;
      case FTPFILE_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.request = action.request;
        draft.ftpFile = action.response;
        draft.statusCode = action.statusCode;
        break;
      case RESET_RESULT_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.result = 0;
        draft.statusCode = 0;
        break;
      case RESET_STATUSCODE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.result = 0;
        draft.statusCode = 0;
        break;
    }
  });
