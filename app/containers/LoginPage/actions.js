/*
 *
 * AccountPage actions
 *
 */

import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER,
  ACTIVATE_USER,
  RESEND_ACTIVATION_CODE_USER,
  RESEND_ACTIVATION_CODE_USER_SUCCESS,
  RESET_STATUSCODE_ACTION,
  ACTIVATION_USER_ERROR,
  RESET_STATE_ACTION,
  EMAIL_VERIFY_ACTION,
  UPDATE_PASSWORD_ACTION,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from './constants';

export function login(email, password) {
  return {
    type: LOGIN_USER,
    email,
    password,
    dateTimeOffSet: new Date().getTimezoneOffset(),
  };
}

export function loginUserSuccess(request, response) {
  return {
    type: LOGIN_USER_SUCCESS,
    response,
    request,
  };
}

export function loginUserError(error) {
  return {
    type: LOGIN_USER_ERROR,
    error,
  };
}

export function activateUserAction(
  email,
  newPassword,
  confirmPassword,
  activationCode,
) {
  return {
    type: ACTIVATE_USER,
    email,
    newPassword,
    confirmPassword,
    activationCode,
    dateTimeOffSet: new Date().getTimezoneOffset(),
  };
}

export function activationUserError(error) {
  return {
    type: ACTIVATION_USER_ERROR,
    error,
  };
}
export function resendActivationCodeAction(email) {
  return {
    type: RESEND_ACTIVATION_CODE_USER,
    email,
  };
}

export function resendActivationCodeSuccess(response) {
  return {
    type: RESEND_ACTIVATION_CODE_USER_SUCCESS,
    response,
  };
}

export function resetStatusCodeAction() {
  return {
    type: RESET_STATUSCODE_ACTION,
  };
}

export function resetStateAction() {
  return {
    type: RESET_STATE_ACTION,
  };
}

export function emailVerifyAction(email) {
  return {
    type: EMAIL_VERIFY_ACTION,
    email,
    dateTimeOffSet: new Date().getTimezoneOffset(),
  };
}
export function updatePasswordAction(
  email,
  code,
  newPassword,
  confirmPassword,
) {
  return {
    type: UPDATE_PASSWORD_ACTION,
    email,
    newPassword,
    confirmPassword,
    code,
    dateTimeOffSet: new Date().getTimezoneOffset(),
  };
}

export function forgotPasswordSuccess(isVerifyEmail, isVerifyCode, response) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    response,
    isVerifyEmail,
    isVerifyCode,
  };
}

export function forgotPasswordError(isVerifyEmail, isVerifyCode, response) {
  return {
    type: FORGOT_PASSWORD_ERROR,
    response,
    isVerifyEmail,
    isVerifyCode,
  };
}
