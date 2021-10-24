import produce from 'immer';
import {
  SET_ACTION,
  RESET_ACTION,
  DEFAULT_ACTION,
  FILTER_ACTION,
  SCANS_RESPONSE_ACTION,
  SCAN_RESPONSE_ACTION,
  RESPONSE_RESET_ACTION,
  RESPONSE_SCANCOUNT_ACTION,
  RESET_STATUSCODE_ACTION,
  PAGE_ACTION,
  ROW_SELECT_ACTION,
  RESET_RESULT_ACTION,
} from './Constants';

export const initialState = {
  loading: false,
  actionLoading: false,
  error: false,
  scans: [],
  scan: {},
  response: false,
  statusCode: 0,
  page: 0,
  perPage: 20,
  total: 0,
  selectedRow: -1,
  result: 0,
};

/* eslint-disable default-case, no-param-reassign */
const scanPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ACTION:
        draft.actionLoading = true;
        break;
      case RESET_ACTION:
        draft.actionLoading = true;
        break;
      case DEFAULT_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.page = 0;
        draft.perPage = 20;
        break;
      case FILTER_ACTION:
        draft.loading = true;
        draft.error = false;
        break;
      case SCANS_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.scans = action.response.result;
        draft.statusCode = action.statusCode;
        draft.page = action.response.page;
        draft.perPage = action.response.perPage;
        draft.total = action.response.total;
        draft.statusCode = action.statusCode;
        break;
      case SCAN_RESPONSE_ACTION:
        draft.loading = false;
        draft.scan = action.response;
        draft.statusCode = action.statusCode;
        break;
      case RESPONSE_RESET_ACTION:
        draft.loading = false;
        draft.actionLoading = false;
        draft.scans.forEach(scan => {
          if (scan.id === action.response.result.id) {
            scan.scanCount = action.response.result.scanCount;
          }
        });
        draft.result = 1;
        break;
      case RESPONSE_SCANCOUNT_ACTION:
        draft.loading = false;
        draft.actionLoading = false;
        draft.scans.forEach(scan => {
          if (scan.id === action.response.index) {
            scan.scanCount = action.response.count;
          }
        });
        draft.result = 1;
        break;
      case RESET_STATUSCODE_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.statusCode = 0;
        break;
      case PAGE_ACTION:
        draft.loading = true;
        draft.error = action.error;
        draft.scans = [];
        break;
      case ROW_SELECT_ACTION:
        draft.selectedRow = action.selectedRow;
        break;
      case RESET_RESULT_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.result = 0;
        draft.statusCode = 0;
        break;
    }
  });

export default scanPageReducer;
