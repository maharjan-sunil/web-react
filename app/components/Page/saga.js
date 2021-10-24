import { puts } from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';

import { CHANGE_PASSWORD_ACTION } from './Constants';
import { changePasswordResponseAction, errorResponseAction } from './actions';

export function* changePasswordSaga(action) {
  try {
    const body = {
      currentPassword: action.data.currentPassword,
      newPassword: action.data.newPassword,
      confirmationPassword: action.data.confirmationPassword,
    };
    const response = yield call(puts, `/change-password`, body);
    yield put(changePasswordResponseAction(response));
  } catch (error) {
    yield put(errorResponseAction(error));
  }
}

export default function* changePasswordListener() {
  yield takeLatest(CHANGE_PASSWORD_ACTION, changePasswordSaga);
}
