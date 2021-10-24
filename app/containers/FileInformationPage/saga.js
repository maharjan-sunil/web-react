import { get } from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import history from 'utils/history';

import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  FILE_CONTENT_ACTION,
  PAGE_ACTION,
} from 'containers/FileInformationPage/Constants';

import {
  responseFilesAction,
  responseFilterAction,
  responseDetailAction,
  responseContentAction,
  responsePageAction,
} from 'containers/FileInformationPage/actions';

const url = '/file-info';
function* getFilesSaga(action) {
  const { filterData } = action;
  try {
    const response = yield call(get, `${url}?${filterData}`);
    yield put(responseFilesAction(filterData, response, 200));
  } catch (error) {
    yield put(responseFilesAction({}, {}, error.response.status));
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
  if (filterData.fileName) {
    params += `${params ? '&' : ''}fileName=${filterData.fileName}`;
  }
  return params;
}

function* filterFilesSaga(action) {
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

function* pageFilesSaga(action) {
  try {
    const params = `${action.query}`;
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(responsePageAction(params, response, 200));
  } catch (error) {
    yield put(responsePageAction({}, {}, error.response.status));
  }
}

function* getFileSaga(action) {
  try {
    const response = yield call(get, `${url}/${action.fileId}`);
    yield put(responseDetailAction(action.id, response, 200));
  } catch (error) {
    yield put(responseDetailAction(action.id, {}, error.response.status));
  }
}

function* getFileContentSaga(action) {
  try {
    const response = yield call(get, `${url}/${action.fileId}/file-content`);
    yield put(responseContentAction(action.id, response, 200));
  } catch (error) {
    yield put(responseContentAction(action.id, {}, error.response.status));
  }
}

export default function* fileListener() {
  yield takeLatest(DEFAULT_ACTION, getFilesSaga);
  yield takeLatest(FILTER_ACTION, filterFilesSaga);
  yield takeLatest(PAGE_ACTION, pageFilesSaga);
  yield takeLatest(DETAIL_ACTION, getFileSaga);
  yield takeLatest(FILE_CONTENT_ACTION, getFileContentSaga);
}
