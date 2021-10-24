import { get, puts, destroy } from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import history from 'utils/history';

import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  RESEND_ACTION,
  DELETE_ACTION,
  RESTORE_ACTION,
  PERMANENT_DELETE_ACTION,
  PAGE_ACTION,
  DOWNLOAD_ACTION,
} from './Constants';
import {
  ftpFilesResponseAction,
  ftpFileResponseAction,
  responsePermanentDeleteAction,
  responseRestoreAction,
  responseDeleteAction,
  responseDownloadAction,
  responseAction,
} from './actions';

const url = '/ftp-files';
function* getFTPFilesSaga(action) {
  const { filterParams } = action;
  try {
    const response = yield call(get, `${url}?${filterParams}`);
    yield put(ftpFilesResponseAction(filterParams, response));
  } catch (error) {
    yield put(ftpFilesResponseAction('', '', error.response.status));
  }
}

function updateQueryString(filterParams) {
  let params = '';
  if (filterParams.fromData) {
    params += `${params ? '&' : ''}fromDate=${filterParams.fromDate}`;
  }
  if (filterParams.toDate) {
    params += `${params ? '&' : ''}toDate=${filterParams.toDate}`;
  }
  if (filterParams.name) {
    params += `${params ? '&' : ''}name=${filterParams.name}`;
  }
  if (filterParams.siteName) {
    params += `${params ? '&' : ''}siteName=${filterParams.siteName}`;
  }
  if (filterParams.carrier) {
    params += `${params ? '&' : ''}carrier=${filterParams.carrier}`;
  }
  if (filterParams.product) {
    params += `${params ? '&' : ''}product=${filterParams.product}`;
  }
  if (filterParams.status && filterParams.status > 0) {
    params += `${params ? '&' : ''}status=${filterParams.status}`;
  }
  if (filterParams.taskName) {
    params += `${params ? '&' : ''}taskName=${filterParams.taskName}`;
  }
  return params;
}

function* filterFTPFilesSaga(action) {
  let params = '';
  try {
    const { filterParams } = action;
    params = updateQueryString(filterParams);
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(ftpFilesResponseAction(params, response));
  } catch (error) {
    yield put(ftpFilesResponseAction('', '', error.response.status));
  }
}

function* pageFTPFilesSaga(action) {
  try {
    const params = `${action.query}`;
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(ftpFilesResponseAction(params, response));
  } catch (error) {
    yield put(ftpFilesResponseAction('', '', error.response.status));
  }
}

function* getFTPFileSaga(action) {
  try {
    const response = yield call(get, `${url}/${action.id}`);
    yield put(ftpFileResponseAction(action.id, response));
  } catch (error) {
    toastr.error(error);
  }
}

function* resendFTPFileSaga(action) {
  try {
    const response = yield call(puts, `${url}/${action.id}/resend`);
    yield put(responseAction(action.id, response));
    toastr.success('FTP file resend.');
  } catch (error) {
    toastr.error(error);
  }
}

function* downloadFTPFileSaga(action) {
  try {
    const response = yield call(get, `${url}/${action.id}`);
    yield put(responseDownloadAction(action.id, response));
  } catch (error) {
    toastr.error(error);
  }
}

function* deleteFTPFileSaga(action) {
  try {
    const response = yield call(puts, `${url}/${action.id}/delete`);
    yield put(responseDeleteAction(action.id, response.result));
    toastr.success('FTP file deleted.');
  } catch (error) {
    toastr.error(error);
  }
}

function* restoreFTPFileSaga(action) {
  try {
    const response = yield call(puts, `${url}/${action.id}/restore`);
    yield put(responseRestoreAction(action.id, response.result));
    toastr.success('FTP file restored.');
  } catch (error) {
    toastr.error(error);
  }
}

function* permanentDeleteFTPFileSaga(action) {
  try {
    const response = yield call(
      destroy,
      `${url}/${action.id}/permanent-delete`,
    );
    yield put(responsePermanentDeleteAction(action.id, response.result));
    toastr.success('FTP file permanently deleted.');
  } catch (error) {
    toastr.error(error);
  }
}

export default function* LogReportListeners() {
  yield takeLatest(DEFAULT_ACTION, getFTPFilesSaga);
  yield takeLatest(FILTER_ACTION, filterFTPFilesSaga);
  yield takeLatest(PAGE_ACTION, pageFTPFilesSaga);
  yield takeLatest(DETAIL_ACTION, getFTPFileSaga);
  yield takeLatest(RESEND_ACTION, resendFTPFileSaga);
  yield takeLatest(DOWNLOAD_ACTION, downloadFTPFileSaga);
  yield takeLatest(DELETE_ACTION, deleteFTPFileSaga);
  yield takeLatest(RESTORE_ACTION, restoreFTPFileSaga);
  yield takeLatest(PERMANENT_DELETE_ACTION, permanentDeleteFTPFileSaga);
}
