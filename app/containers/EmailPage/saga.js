import { get, puts, destroy } from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import history from 'utils/history';

import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  DELETE_ACTION,
  RESTORE_ACTION,
  RESEND_ACTION,
  PERMANENT_DELETE_ACTION,
  PAGE_ACTION,
} from './Constants';
import {
  emailsResponseAction,
  emailResponseAction,
  responseDeleteAction,
  responseRestoreAction,
  responseResendAction,
  responsePermanentDeleteAction,
} from './actions';

const url = '/emails';

function* getEmailsSaga(action) {
  try {
    const { filterParams } = action;
    const response = yield call(get, `${url}?${filterParams}`);
    yield put(emailsResponseAction('', response));
  } catch (error) {
    yield put(emailsResponseAction('', '', error.response.status));
  }
}

function* filterEmailsSaga(action) {
  let params = '';
  try {
    params = updateQueryString(action);
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(emailsResponseAction(params, response));
  } catch (error) {
    yield put(emailsResponseAction('', '', error.response.status));
  }
}

function updateQueryString(action) {
  let params = '';
  const { filterParams } = action;
  if (filterParams.fromDate) {
    params += `${params ? '&' : ''}fromdate=${filterParams.fromDate}`;
  }
  if (filterParams.toDate) {
    params += `${params ? '&' : ''}todate=${filterParams.toDate}`;
  }
  if (filterParams.siteName) {
    params += `sitename=${filterParams.siteName}`;
  }
  if (filterParams.awb) {
    params += `${params ? '&' : ''}awb=${filterParams.awb}`;
  }
  if (filterParams.subject) {
    params += `${params ? '&' : ''}subject=${filterParams.subject}`;
  }
  if (filterParams.isDeleted) {
    params += `${params ? '&' : ''}isdeleted=${filterParams.isDeleted}`;
  }
  if (filterParams.type !== '0' && filterParams.type !== undefined) {
    params += `${params ? '&' : ''}type=${filterParams.type}`;
  }
  if (filterParams.status !== '0' && filterParams.status !== undefined) {
    params += `${params ? '&' : ''}status=${filterParams.status}`;
  }
  return params;
}

function* getEmailSaga(action) {
  try {
    const response = yield call(get, `${url}/${action.id}`);
    yield put(emailResponseAction(action.id, response));
  } catch (error) {
    toastr.error(error);
  }
}

function* deleteEmailSaga(action) {
  try {
    const response = yield call(puts, `${url}/${action.id}/delete`);
    yield put(responseDeleteAction(action.id, response));
    toastr.success('Email deleted.');
  } catch (error) {
    toastr.error(error);
  }
}

function* restoreEmailSaga(action) {
  try {
    const response = yield call(puts, `${url}/${action.id}/restore`);
    yield put(responseRestoreAction(action.id, response));
    toastr.success('Email restored.');
  } catch (error) {
    toastr.error(error);
  }
}

function* resendEmailSaga(action) {
  try {
    const response = yield call(puts, `${url}/${action.id}/resend`);
    yield put(responseResendAction(action.id, response));
    toastr.success('Email Successfully resend.');
  } catch (error) {
    toastr.error(error);
  }
}

function* permanentDeleteEmailSaga(action) {
  try {
    const response = yield call(
      destroy,
      `${url}/${action.id}/permanent-delete`,
    );
    yield put(responsePermanentDeleteAction(action.id, response));
    toastr.success('Email permanently deleted.');
  } catch (error) {
    toastr.error(error);
  }
}

export function* pageLogsSaga(action) {
  try {
    const params = `${action.query}`;
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(emailsResponseAction(params, response));
  } catch (error) {
    yield put(emailsResponseAction('', '', error.response.status));
  }
}

export default function* userListener() {
  yield takeLatest(DEFAULT_ACTION, getEmailsSaga);
  yield takeLatest(FILTER_ACTION, filterEmailsSaga);
  yield takeLatest(DETAIL_ACTION, getEmailSaga);
  yield takeLatest(DELETE_ACTION, deleteEmailSaga);
  yield takeLatest(RESTORE_ACTION, restoreEmailSaga);
  yield takeLatest(RESEND_ACTION, resendEmailSaga);
  yield takeLatest(PERMANENT_DELETE_ACTION, permanentDeleteEmailSaga);
  yield takeLatest(PAGE_ACTION, pageLogsSaga);
}
