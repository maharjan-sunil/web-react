import { get, destroy } from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import history from 'utils/history';

import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  DELETE_ACTION,
  PAGE_ACTION,
} from 'containers/FileErrorLogPage/Constants';

import {
  responseDefaultAction,
  responseFilterAction,
  responseDetailAction,
  responseDeleteAction,
  responsePageAction,
} from 'containers/FileErrorLogPage/actions';

const url = '/file-errors';
function* getFileErrorsSaga(action) {
  const { filterData } = action;
  try {
    const response = yield call(get, `${url}?${filterData}`);
    yield put(responseDefaultAction(filterData, response, 200));
  } catch (error) {
    yield put(responseDefaultAction({}, {}, error.response.status));
  }
}

function updateQueryString(filterData) {
  let params = '';
  if (filterData.fromDate) {
    params += `${params ? '&' : ''}fromdate=${filterData.fromDate}`;
  }
  if (filterData.toDate) {
    params += `${params ? '&' : ''}todate=${filterData.toDate}`;
  }
  if (filterData.siteName) {
    params += `${params ? '&' : ''}sitename=${filterData.siteName}`;
  }
  if (filterData.carrierName) {
    params += `${params ? '&' : ''}carrierName=${filterData.carrierName}`;
  }
  if (filterData.productName) {
    params += `${params ? '&' : ''}productName=${filterData.productName}`;
  }
  if (filterData.awb) {
    params += `${params ? '&' : ''}awb=${filterData.awb}`;
  }
  if (filterData.fileName) {
    params += `${params ? '&' : ''}fileName=${filterData.fileName}`;
  }
  return params;
}

function* filterFileErrorSaga(action) {
  const { filterData } = action;
  try {
    const params = updateQueryString(filterData);
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(responseFilterAction(params, response, 200));
  } catch (error) {
    yield put(responseFilterAction({}, {}, error.response.status));
  }
}

function* pageFileErrorSaga(action) {
  try {
    const params = `${action.query}`;
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(responsePageAction(params, response, 200));
  } catch (error) {
    yield put(responsePageAction({}, {}, error.response.status));
  }
}

function* getFileErrorSaga(action) {
  try {
    const response = yield call(get, `${url}/${action.errorId}`);
    yield put(responseDetailAction(action.id, response, 200));
  } catch (error) {
    yield put(responseDetailAction(action.id, {}, error.response.status));
  }
}

function* deleteFileErrorSaga(action) {
  try {
    const response = yield call(destroy, `${url}/${action.fileId}`);
    yield put(responseDeleteAction(action.id, response, 200));
  } catch (error) {
    yield put(responseDeleteAction(action.id, {}, error.response.status));
  }
}

export default function* fileErrorListener() {
  yield takeLatest(DEFAULT_ACTION, getFileErrorsSaga);
  yield takeLatest(FILTER_ACTION, filterFileErrorSaga);
  yield takeLatest(DETAIL_ACTION, getFileErrorSaga);
  yield takeLatest(PAGE_ACTION, pageFileErrorSaga);
  yield takeLatest(DELETE_ACTION, deleteFileErrorSaga);
}
