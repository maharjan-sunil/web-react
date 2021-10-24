import { get, post, puts, destroy } from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import history from 'utils/history';

import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  INSERT_ACTION,
  UPDATE_ACTION,
  DELETE_ACTION,
  RESTORE_ACTION,
  PERMANENT_DELETE_ACTION,
  USER_PROFILE_ACTION,
  PAGE_ACTION,
} from './Constants';
import {
  usersResponseAction,
  userResponseAction,
  responseAction,
  responseDeleteAction,
  responseRestoreAction,
  responsePermanentDeleteAction,
} from './actions';

const url = '/users';

function* getUsersSaga(action) {
  try {
    const { filterParams } = action;
    const response = yield call(get, `${url}?${filterParams}`);
    yield put(usersResponseAction('', response));
  } catch (error) {
    yield put(usersResponseAction('', '', error.response.status));
  }
}

function updateQueryString(filterParams) {
  let params = '';
  if (filterParams.name) {
    params += `${params ? '&' : ''}name=${filterParams.name}`;
  }
  if (filterParams.email) {
    params += `${params ? '&' : ''}email=${filterParams.email}`;
  }
  if (filterParams.mobile) {
    params += `${params ? '&' : ''}mobile=${filterParams.mobile}`;
  }
  return params;
}

function* filterUsersSaga(action) {
  let params = '';
  try {
    const { filterParams } = action;
    params = updateQueryString(filterParams);
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(usersResponseAction(params, response));
  } catch (error) {
    yield put(usersResponseAction('', '', error.response.status));
  }
}

function* getUserSaga(action) {
  try {
    const response = yield call(get, `${url}/${action.id}`);
    yield put(userResponseAction(action.id, response));
  } catch (error) {
    toastr.error(error);
  }
}

function* insertUserSaga(action) {
  try {
    const response = yield call(post, url, action.user);
    yield put(responseAction(action.user, response));
    toastr.success('New user added.');
  } catch (error) {
    toastr.error(error);
  }
}

function* updateUserSaga(action) {
  try {
    const response = yield call(puts, `${url}/${action.user.id}`, action.user);
    yield put(responseAction(action.user, response));
    toastr.success('User updated.');
  } catch (error) {
    toastr.error(error);
  }
}

function* deleteUserSaga(action) {
  try {
    const response = yield call(puts, `${url}/${action.id}/delete`);
    yield put(responseDeleteAction(action.id, response));
    toastr.success('User deleted.');
  } catch (error) {
    toastr.error(error);
  }
}

function* restoreUserSaga(action) {
  try {
    const response = yield call(puts, `${url}/${action.id}/restore`);
    yield put(responseRestoreAction(action.id, response));
    toastr.success('User restored.');
  } catch (error) {
    toastr.error(error);
  }
}

function* permanentDeleteUserSaga(action) {
  try {
    const response = yield call(
      destroy,
      `${url}/${action.id}/permanent-delete`,
    );
    yield put(responsePermanentDeleteAction(action.id, response));
    toastr.success('User permanently deleted.');
  } catch (error) {
    toastr.error(error);
  }
}

function* getUserProfileSaga() {
  try {
    const response = yield call(get, `${url}/current`);
    yield put(userResponseAction('', response));
  } catch (error) {
    toastr.error(error);
  }
}

export function* pageLogsSaga(action) {
  try {
    const params = `${action.query}`;
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(usersResponseAction(params, response));
  } catch (error) {
    yield put(usersResponseAction('', '', error.response.status));
  }
}

export default function* userListener() {
  yield takeLatest(DEFAULT_ACTION, getUsersSaga);
  yield takeLatest(FILTER_ACTION, filterUsersSaga);
  yield takeLatest(DETAIL_ACTION, getUserSaga);
  yield takeLatest(INSERT_ACTION, insertUserSaga);
  yield takeLatest(UPDATE_ACTION, updateUserSaga);
  yield takeLatest(DELETE_ACTION, deleteUserSaga);
  yield takeLatest(RESTORE_ACTION, restoreUserSaga);
  yield takeLatest(PERMANENT_DELETE_ACTION, permanentDeleteUserSaga);
  yield takeLatest(USER_PROFILE_ACTION, getUserProfileSaga);
  yield takeLatest(PAGE_ACTION, pageLogsSaga);
}
