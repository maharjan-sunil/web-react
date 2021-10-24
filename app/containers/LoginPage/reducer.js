import produce from 'immer';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  RESET_STATUSCODE_ACTION,
  RESEND_ACTIVATION_CODE_USER,
  RESEND_ACTIVATION_CODE_USER_SUCCESS,
  ACTIVATION_USER_ERROR,
  RESET_STATE_ACTION,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  EMAIL_VERIFY_ACTION,
  UPDATE_PASSWORD_ACTION,
  ACTIVATE_USER,
} from './constants';

export const initialState = {
  loginLoader: false,
  buttonLoader: false,
  loginSuccess: false,
  response: false,
  statusCode: 0,
  activationUser: false,
  isVerifyEmail: false,
  isVerifyCode: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_USER:
        draft.loginLoader = true;
        break;
      case EMAIL_VERIFY_ACTION:
        draft.loginLoader = true;
        break;
      case UPDATE_PASSWORD_ACTION:
        draft.loginLoader = true;
        break;
      case ACTIVATE_USER:
        draft.loginLoader = true;
        break;
      case LOGIN_USER_SUCCESS:
        // add to global State CurrentUser
        draft.response = { ...state.response, ...action };
        draft.loginLoader = false;
        if (action.response.returnUrl === `${process.env.API}/activate`) {
          draft.loginSuccess = false;
          draft.statusCode = 403;
          localStorage.setItem('activateEmail', action.request.email);
          draft.activationUser = true;
        } else {
          draft.loginSuccess = true;
          draft.activationUser = false;
        }
        break;
      case LOGIN_USER_ERROR:
        draft.response = { ...state.response, ...action };
        draft.loginSuccess = false;
        draft.activationUser = false;
        draft.loginLoader = false;
        break;
      case ACTIVATION_USER_ERROR:
        draft.response = { ...state.response, ...action };
        draft.activationUser = true;
        draft.loginSuccess = false;
        draft.loginLoader = false;
        break;
      case RESEND_ACTIVATION_CODE_USER:
        draft.buttonLoader = true;
        break;
      case RESEND_ACTIVATION_CODE_USER_SUCCESS:
        draft.buttonLoader = false;
        draft.response = action.response;
        draft.statusCode = 0;
        break;
      case RESET_STATUSCODE_ACTION:
        draft.statusCode = 0;
        if (state.response.error) {
          state.response.error = false;
        }
        draft.response = { ...state.response, ...action };
        break;
      case RESET_STATE_ACTION:
        if (state.response.error) {
          state.response.error = false;
        }
        draft.response = { ...state.response, ...action };
        draft.error = false;
        draft.isVerifyEmail = false;
        draft.isVerifyCode = false;
        draft.loginSuccess = false;
        break;
      case FORGOT_PASSWORD_SUCCESS:
        draft.loginLoader = false;
        draft.response = action.response;
        draft.isVerifyEmail = action.isVerifyEmail;
        draft.isVerifyCode = action.isVerifyCode;
        draft.error = false;
        draft.loginSuccess = false;
        break;
      case FORGOT_PASSWORD_ERROR:
        draft.loginLoader = false;
        draft.response = { ...state.response, ...action };
        draft.isVerifyEmail = action.isVerifyEmail;
        draft.isVerifyCode = action.isVerifyCode;
        draft.error = true;
        draft.loginSuccess = false;
        break;
    }
  });

export default loginPageReducer;
