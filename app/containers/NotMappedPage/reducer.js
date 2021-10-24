import produce from 'immer';
import {
  PAGE_ACTION,
  FILTER_ACTION,
  NOTMAPPED_RESPONSE_ACTION,
} from './Constants';
export const initialState = {
  loading: false,
  error: false,
  notMapped: [],
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
      case FILTER_ACTION:
        draft.page = 0;
        draft.perPage = 20;
        draft.loading = true;
        draft.error = action.error;
        break;
      case PAGE_ACTION:
        draft.loading = true;
        draft.error = action.error;
        draft.notMapped = [];
        break;
      case NOTMAPPED_RESPONSE_ACTION:
        draft.loading = false;
        draft.error = false;
        draft.page = action.response.page;
        draft.perPage = action.response.perPage;
        draft.total = action.response.total;
        draft.notMapped = action.response.result;
        draft.statusCode = action.statusCode;
        break;
    }
  });
export default filterPageReducer;
