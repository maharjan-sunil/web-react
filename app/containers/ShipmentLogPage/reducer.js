import produce from 'immer';
import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  PAGE_ACTION,
  DETAIL_ACTION,
  SHIPMENT_DETAIL_ACTION,
  SHIPMENTLOGS_RESPONSE_ACTION,
  SHIPMENTLOG_RESPONSE_ACTION,
  SHIPMENTLOG_SHIPMENT_RESPONSE_ACTION,
  RESET_STATUSCODE_ACTION,
  RESPONSE_ACTION,
  REQUEST_ACTION,
  SHIPMENTLOGS_RESPONSE_DETAIL_ACTION,
  SHIPMENTLOGS_REQUEST_DETAIL_ACTION,
  ROW_SELECT_ACTION,
} from './Constants';

export const initialState = {
  loading: true,
  error: false,
  logs: [],
  log: {},
  shipment: {},
  page: 0,
  perPage: 20,
  total: 0,
  statusCode: 0,
  requestResponse: {},
  selectedRow: -1,
};
/* eslint-disable default-case, no-param-reassign */
const logReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        draft.page = 0;
        draft.perPage = 20;
        draft.loading = true;
        draft.error = false;
        draft.logs = [];
        break;
      case FILTER_ACTION:
        draft.loading = true;
        draft.error = action.error;
        draft.logs = [];
        draft.selectedRow = -1;
        break;
      case PAGE_ACTION:
        draft.loading = true;
        draft.error = action.error;
        draft.logs = [];
        break;
      case DETAIL_ACTION:
        draft.loading = true;
        draft.error = action.error;
        draft.log = {};
        break;
      case SHIPMENT_DETAIL_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.shipment = {};
        break;
      case SHIPMENTLOGS_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.logs = action.response.result;
        draft.page = action.response.page;
        draft.perPage = action.response.perPage;
        draft.total = action.response.total;
        draft.statusCode = action.statusCode;
        break;
      case SHIPMENTLOG_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.log = action.response;
        draft.statusCode = action.statusCode;
        break;
      case SHIPMENTLOG_SHIPMENT_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.shipment = action.response;
        draft.statusCode = action.statusCode;
        break;
      case RESET_STATUSCODE_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.statusCode = 0;
        break;
      case RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.requestResponse = {};
        break;
      case REQUEST_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.requestResponse = {};
        break;
      case SHIPMENTLOGS_RESPONSE_DETAIL_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.requestResponse = action.response;
        break;
      case SHIPMENTLOGS_REQUEST_DETAIL_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.requestResponse = action.response;
        break;
      case ROW_SELECT_ACTION:
        draft.selectedRow = action.selectedRow;
        break;
    }
  });

export default logReducer;
