import { get } from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import history from 'utils/history';
import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  PAGE_ACTION,
  DETAIL_ACTION,
  SHIPMENT_DETAIL_ACTION,
  RESPONSE_ACTION,
  REQUEST_ACTION,
} from './Constants';
import {
  shipmentLogsResponseAction,
  shipmentLogResponseAction,
  shipmentLogShipmentResponseAction,
  ShipmentLogsResponseDetailAction,
  ShipmentLogsResquestDetailAction,
} from './actions';
const url = '/shipment-logs';

export function* getLogsSaga(action) {
  const filterData = action.filterData ? action.filterData : '';
  try {
    const response = yield call(get, `${url}?${filterData}`);
    yield put(shipmentLogsResponseAction(filterData, response));
  } catch (error) {
    yield put(shipmentLogsResponseAction('', '', error.response.status));
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
  if (filterData.awb) {
    params += `${params ? '&' : ''}awb=${filterData.awb}`;
  }
  if (filterData.product) {
    params += `${params ? '&' : ''}product=${filterData.product}`;
  }
  if (filterData.status && filterData.status !== '0') {
    params += `${params ? '&' : ''}status=${filterData.status}`;
  }
  if (filterData.operation && filterData.operation !== '0') {
    params += `${params ? '&' : ''}operation=${filterData.operation}`;
  }
  return params;
}

export function* filterLogsSaga(action) {
  const { filterData } = action;
  try {
    const params = updateQueryString(filterData);
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(shipmentLogsResponseAction(params, response));
  } catch (error) {
    yield put(shipmentLogsResponseAction('', '', error.response.status));
  }
}

export function* pageLogsSaga(action) {
  try {
    const params = `${action.query}`;
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(shipmentLogsResponseAction(params, response));
  } catch (error) {
    yield put(shipmentLogsResponseAction('', '', error.response.status));
  }
}

export function* getLogSaga(action) {
  const requestURL = `${url}/${action.logId}`;
  try {
    const response = yield call(get, requestURL);
    yield put(shipmentLogResponseAction(requestURL, response));
  } catch (err) {
    toastr.error(err);
  }
}

export function* getLogShipmentSaga(action) {
  const requestURL = `${url}/shipment/${action.shipmentId}`;
  try {
    const response = yield call(get, requestURL);
    yield put(shipmentLogShipmentResponseAction(requestURL, response));
  } catch (err) {
    toastr.error(err);
  }
}
export function* getShipmentLogRequestDetailSaga(action) {
  const requestURL = `${url}/${action.LogId}/request`;
  try {
    const response = yield call(get, requestURL);

    yield put(ShipmentLogsResquestDetailAction(requestURL, response));
  } catch (err) {
    toastr.error(err);
  }
}
export function* getShipmentLogResponseDetailSaga(action) {
  const requestURL = `${url}/${action.LogId}/response`;
  try {
    const response = yield call(get, requestURL);
    yield put(ShipmentLogsResponseDetailAction(requestURL, response));
  } catch (err) {
    toastr.error(err);
  }
}
export default function* LogReportListeners() {
  yield takeLatest(DEFAULT_ACTION, getLogsSaga);
  yield takeLatest(FILTER_ACTION, filterLogsSaga);
  yield takeLatest(PAGE_ACTION, pageLogsSaga);
  yield takeLatest(DETAIL_ACTION, getLogSaga);
  yield takeLatest(SHIPMENT_DETAIL_ACTION, getLogShipmentSaga);
  yield takeLatest(REQUEST_ACTION, getShipmentLogRequestDetailSaga);
  yield takeLatest(RESPONSE_ACTION, getShipmentLogResponseDetailSaga);
}
