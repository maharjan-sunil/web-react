/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  RESPONSE_DEFAULT_ACTION,
  FILTER_ACTION,
  RESPONSE_FILTER_ACTION,
  DETAIL_ACTION,
  RESPONSE_DETAIL_ACTION,
  DELETE_ACTION,
  RESPONSE_DELETE_ACTION,
  PAGE_ACTION,
  RESPONSE_PAGE_ACTION,
  RESET_STATUSCODE_ACTION,
  ROW_SELECT_ACTION,
} from 'containers/FileErrorLogPage/Constants';

export const initialState = {
  loading: true,
  error: false,
  fileErrors: [],
  fileError: {},
  result: 0,
  page: 0,
  perPage: 20,
  selectRow: -1,
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        draft.page = 0;
        draft.perPage = 20;
        draft.loading = true;
        draft.error = false;
        break;
      case FILTER_ACTION:
        draft.page = 0;
        draft.perPage = 20;
        draft.loading = true;
        draft.error = false;
        break;
      case DETAIL_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.fileError = {};
        break;
      case DELETE_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.result = 0;
        break;
      case PAGE_ACTION:
        draft.loading = true;
        draft.error = false;
        break;
      case RESPONSE_DEFAULT_ACTION:
        draft.loading = false;
        draft.error = action.statusCode !== 200;
        draft.statusCode = action.statusCode;
        if (draft.error === false && draft.statusCode === 200) {
          draft.page = action.response.page;
          draft.perPage = action.response.perPage;
          draft.total = action.response.total;
          draft.files = action.response.result;
        }
        break;
      case RESPONSE_FILTER_ACTION:
        draft.loading = false;
        draft.error = action.statusCode !== 200;
        draft.statusCode = action.statusCode;
        if (draft.error === false && draft.statusCode === 200) {
          draft.page = action.response.page;
          draft.perPage = action.response.perPage;
          draft.total = action.response.total;
          draft.files = action.response.result;
        }
        break;
      case RESPONSE_DETAIL_ACTION:
        draft.loading = false;
        draft.error = action.statusCode !== 200;
        draft.statusCode = action.statusCode;
        if (draft.error === false && draft.statusCode === 200) {
          draft.fileError = action.response;
        }
        break;
      case RESPONSE_DELETE_ACTION:
        draft.loading = false;
        draft.error = action.statusCode !== 200;
        draft.statusCode = action.statusCode;
        if (draft.error === false && draft.statusCode === 200) {
          draft.result = action.response.result;
        }
        break;
      case RESPONSE_PAGE_ACTION:
        draft.loading = false;
        draft.error = action.statusCode !== 200;
        draft.statusCode = action.statusCode;
        if (draft.error === false && draft.statusCode === 200) {
          draft.page = action.response.page;
          draft.perPage = action.response.perPage;
          draft.total = action.response.total;
          draft.files = action.response.result;
        }
        break;
      case RESET_STATUSCODE_ACTION:
        draft.loading = true;
        draft.error = false;
        draft.statusCode = 0;
        break;
      case ROW_SELECT_ACTION:
        draft.selectedRow = action.selectedRow;
        break;
      default:
        draft.loading = true;
        draft.error = false;
        draft.statusCode = 0;
        break;
    }
  });

export default reducer;
