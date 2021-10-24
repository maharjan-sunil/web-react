import produce from 'immer';
import {
  CHANGE_PASSWORD_RESPONSE_ACTION,
  CHANGE_PASSWORD_ERROR_ACTION,
  RESET_CHANGE_PASSWORD_STORE_ACTION,
  CHANGE_PASSWORD_ACTION,
} from './Constants';

export const initialState = {
  statusCode: 0,
  changePassword: false,
};

/* eslint-disable default-case, no-param-reassign */
const pageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_PASSWORD_ACTION:
        draft.changePassword = false;
        draft.statusCode = 0;
        break;
      case CHANGE_PASSWORD_RESPONSE_ACTION:
        draft.changePassword = true;
        draft.statusCode = 200;
        break;
      case CHANGE_PASSWORD_ERROR_ACTION:
        draft.changePassword = false;
        draft.statusCode = action.response.response.status;
        break;
      case RESET_CHANGE_PASSWORD_STORE_ACTION:
        draft.changePassword = false;
        draft.statusCode = 0;
        break;
    }
  });

export default pageReducer;
