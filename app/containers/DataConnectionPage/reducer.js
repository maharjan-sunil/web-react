import produce from 'immer';
import {
  DEFAULT_ACTION,
  DETAIL_ACTION,
  SHIPMENT_DETAIL_ACTION,
  PAGE_ACTION,
  FILTER_ACTION,
  SHIPMENT_RESPONSE_ACTION,
  DATACONNECTIONS_RESPONSE_ACTION,
  RESET_STATUSCODE_ACTION,
  DATACONNECTION_RESPONSE_ACTION,
  RESET_ACTION,
  RESET_RESPONSE_ACTION,
  ROW_SELECT_ACTION,
} from './Constants';
export const initialState = {
  loading: false,
  error: false,
  dataconnections: [],
  dataconnection: {},
  shipment: {},
  page: 0,
  perPage: 20,
  total: 0,
  statusCode: 0,
  selectedRow: -1,
};
/* eslint-disable default-case, no-param-reassign */
const filterPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        draft.page = 0;
        draft.perPage = 20;
        draft.loading = true;
        draft.error = false;
        break;
      case DETAIL_ACTION:
        draft.loading = true;
        draft.error = false;
        break;
      case RESET_ACTION:
        draft.Loading = true;
        break;
      case SHIPMENT_DETAIL_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.shipment = {};
        break;
      case FILTER_ACTION:
        draft.loading = true;
        draft.error = action.error;
        break;
      case PAGE_ACTION:
        draft.loading = true;
        draft.error = action.error;
        draft.dataconnections = [];
        break;
      case DATACONNECTIONS_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.page = action.response.page;
        draft.perPage = action.response.perPage;
        draft.total = action.response.total;
        draft.dataconnections = action.response.result;
        draft.statusCode = action.statusCode;
        break;
      case DATACONNECTION_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.dataconnection = action.response;
        break;
      case SHIPMENT_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.shipment = action.response;
        break;
      case RESET_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.dataconnections.forEach(dataConnection => {
          if (dataConnection.id === action.response.id) {
            dataConnection.dataConnIsProcessed =
              action.response.dataConnIsProcessed;
            dataConnection.dataConnStatus = action.response.dataConnStatus;
            dataConnection.dataConnErrorMsg = action.response.dataConnErrorMsg;
          }
        });
        draft.dataconnection = {};
        break;
      case RESET_STATUSCODE_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.statusCode = 0;
        break;
      case ROW_SELECT_ACTION:
        draft.selectedRow = action.selectedRow;
        break;
    }
  });
export default filterPageReducer;
