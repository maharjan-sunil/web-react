import {
  CHANGE_PASSWORD_ACTION,
  CHANGE_PASSWORD_RESPONSE_ACTION,
  CHANGE_PASSWORD_ERROR_ACTION,
  RESET_CHANGE_PASSWORD_STORE_ACTION,
} from './Constants';

export function changePasswordAction(data) {
  return {
    type: CHANGE_PASSWORD_ACTION,
    data,
  };
}

export function changePasswordResponseAction(response) {
  return {
    type: CHANGE_PASSWORD_RESPONSE_ACTION,
    response,
  };
}

export function errorResponseAction(response) {
  return {
    type: CHANGE_PASSWORD_ERROR_ACTION,
    response,
  };
}

export function resetChangePasswordStore() {
  return {
    type: RESET_CHANGE_PASSWORD_STORE_ACTION,
  };
}
