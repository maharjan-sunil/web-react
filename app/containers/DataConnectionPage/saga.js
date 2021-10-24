import React from 'react';
import { get, puts } from 'utils/request';
import { FormattedMessage } from 'react-intl';
import { call, put, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import history from 'utils/history';
import messages from './messages';
import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  SHIPMENT_DETAIL_ACTION,
  PAGE_ACTION,
  RESET_ACTION,
} from './Constants';
import {
  dataconnectionsResponseAction,
  dataconnectionResponseAction,
  shipmentResponseAction,
  resetResponseAction,
} from './actions';

const url = '/data-connections';

export function* GetdataconnectionPageSaga(action) {
  const { filterData } = action;
  try {
    const response = yield call(get, `${url}?${filterData}`);
    yield put(dataconnectionsResponseAction(filterData, response));
  } catch (error) {
    yield put(dataconnectionsResponseAction('', '', error.response.status));
  }
}
function updateQueryString(filterData) {
  let params = '';
  if (filterData.filterType && filterData.filterType !== '0')
    params += `${params ? '&' : ''}filtertype=${filterData.filterType}`;
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
  if (filterData.accountNumber) {
    params += `${params ? '&' : ''}accountnumber=${filterData.accountNumber}`;
  }
  if (filterData.searchText) {
    params += `${params ? '&' : ''}searchtext=${filterData.searchText}`;
  }
  if (filterData.carrierName) {
    params += `${params ? '&' : ''}carrierName=${filterData.carrierName}`;
  }
  if (
    filterData.SendDataConnectionType !== '0' &&
    filterData.SendDataConnectionType !== undefined
  ) {
    params += `${params ? '&' : ''}sendfordataconnectiontype=${
      filterData.SendDataConnectionType
    }`;
  }
  if (
    filterData.DataConnectionStatusType !== '0' &&
    filterData.DataConnectionStatusType !== undefined
  ) {
    params += `${params ? '&' : ''}dataconnectionstatustype=${
      filterData.DataConnectionStatusType
    }`;
  }
  return params;
}
function* getApiFilterData(action) {
  try {
    const { filterData } = action;
    const params = updateQueryString(filterData);
    // if (filterData.carrierName) {
    //   params += `${params ? '&' : ''}carriername=${filterData.carrierName}`;
    // }
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(dataconnectionsResponseAction(params, response));
  } catch (error) {
    yield put(dataconnectionsResponseAction('', '', error.response.status));
  }
}
export function* pageDataConnectionsSaga(action) {
  try {
    const params = `${action.query}`;
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(dataconnectionsResponseAction(params, response));
  } catch (error) {
    yield put(dataconnectionsResponseAction('', '', error.response.status));
  }
}
export function* DataConnectionPageDetailSaga(action) {
  try {
    const requestUrl = `${url}/${action.Id}`;
    const response = yield call(get, requestUrl);
    yield put(dataconnectionResponseAction(action.Id, response));
  } catch (err) {
    toastr.error(err);
  }
}
export function* GetShipmentDetailSaga(action) {
  try {
    const requestUrl = `${url}/shipment/${action.Id}`;
    const response = yield call(get, requestUrl);
    yield put(shipmentResponseAction(action.Id, response));
  } catch (e) {
    toastr.error(e);
  }
}
export function* dataConnectionPageResetSaga(action) {
  try {
    const requestUrl = `${url}/${action.Id}/reset`;
    const response = yield call(puts, requestUrl);

    let message;
    if (response) message = <FormattedMessage {...messages.successOperation} />;
    else message = <FormattedMessage {...messages.errorOperation} />;
    yield put(resetResponseAction(action.Id, response));
    toastr.success(message.props.defaultMessage);
  } catch (err) {
    toastr.error(err);
  }
}
export default function* mySaga() {
  yield takeLatest(DEFAULT_ACTION, GetdataconnectionPageSaga);
  yield takeLatest(FILTER_ACTION, getApiFilterData);
  yield takeLatest(PAGE_ACTION, pageDataConnectionsSaga);
  yield takeLatest(SHIPMENT_DETAIL_ACTION, GetShipmentDetailSaga);
  yield takeLatest(RESET_ACTION, dataConnectionPageResetSaga);
  yield takeLatest(DETAIL_ACTION, DataConnectionPageDetailSaga);
}
