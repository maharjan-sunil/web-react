import { post, puts } from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import {
  LOGIN_USER,
  ACTIVATE_USER,
  RESEND_ACTIVATION_CODE_USER,
  EMAIL_VERIFY_ACTION,
  UPDATE_PASSWORD_ACTION,
} from 'containers/LoginPage/constants';
import {
  loginUserSuccess,
  loginUserError,
  resendActivationCodeSuccess,
  activationUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
} from 'containers/LoginPage/actions';

export function* loginPageSaga(action) {
  try {
    const data = {
      email: action.email,
      password: action.password,
      dateTimeOffSet: action.dateTimeOffSet,
    };
    const response = yield call(post, '/login', data);
    localStorage.setItem('token', response.token);
    localStorage.setItem('expiresAt', response.expiresAt);
    localStorage.setItem('userName', response.userName);
    localStorage.setItem('userImage', response.image);
    yield put(loginUserSuccess(action, response));
  } catch (err) {
    yield put(loginUserError(err));
  }
}

export function* activateUserSaga(action) {
  try {
    const data = {
      email: action.email,
      newPassword: action.newPassword,
      confirmPassword: action.confirmPassword,
      activationCode: action.activationCode,
      dateTimeOffSet: action.dateTimeOffSet,
    };
    const response = yield call(post, '/activate', data);
    localStorage.setItem('token', response.token);
    localStorage.setItem('expiresAt', response.expiresAt);
    localStorage.setItem('userName', response.userName);
    localStorage.removeItem('activateEmail');
    yield put(loginUserSuccess('', response));
    toastr.success('User activated successfully.');
  } catch (err) {
    yield put(activationUserError(err));
  }
}

export function* resendActivationCodeSaga(action) {
  try {
    const data = {
      email: action.email,
    };
    yield call(post, '/resend-activation-code', data);
    yield put(resendActivationCodeSuccess(true));
  } catch (err) {
    yield put(resendActivationCodeSuccess(true));
    toastr.success('Activation code successfully send.');
  }
}

export function* emailVerifySaga(action) {
  try {
    const data = {
      email: action.email,
      dateTimeOffSet: action.dateTimeOffSet,
    };
    const response = yield call(post, '/verify-email', data);
    localStorage.setItem('token', response.token);
    localStorage.setItem('expiresAt', response.expiresAt);
    yield put(forgotPasswordSuccess(true, false, true));
    toastr.success('Email Verified and code send to Email.');
  } catch (err) {
    yield put(forgotPasswordError(false, false, err));
  }
}

export function* updatePasswordSaga(action) {
  try {
    const data = {
      email: action.email,
      code: action.code,
      newPassword: action.newPassword,
      confirmPassword: action.confirmPassword,
      dateTimeOffSet: action.dateTimeOffSet,
    };
    const response = yield call(puts, '/new-password', data);
    localStorage.setItem('token', response.token);
    localStorage.setItem('expiresAt', response.expiresAt);
    localStorage.setItem('userName', response.userName);
    yield put(forgotPasswordSuccess(true, true, true));
    toastr.success('Successfully change new password.');
  } catch (err) {
    yield put(forgotPasswordError(true, false, err));
  }
}

export default function* loginValidate() {
  yield takeLatest(LOGIN_USER, loginPageSaga);
  yield takeLatest(ACTIVATE_USER, activateUserSaga);
  yield takeLatest(RESEND_ACTIVATION_CODE_USER, resendActivationCodeSaga);
  yield takeLatest(EMAIL_VERIFY_ACTION, emailVerifySaga);
  yield takeLatest(UPDATE_PASSWORD_ACTION, updatePasswordSaga);
}
