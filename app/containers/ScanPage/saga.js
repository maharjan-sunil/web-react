import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import { FormattedMessage } from 'react-intl';
import history from 'utils/history';
import { get, puts } from 'utils/request';
import toastr from 'toastr';
import messages from './messages';
import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  RESET_ACTION,
  SET_ACTION,
  PAGE_ACTION,
} from './Constants';

import {
  scansResponseAction,
  scanResponseAction,
  responseResetAction,
  responseScanCountAction,
} from './actions';

const url = '/scans';
export function* scanPageSaga(action) {
  const { filterData } = action;
  try {
    const response = yield call(get, `${url}?${filterData}`);
    yield put(scansResponseAction('', response));
  } catch (error) {
    yield put(scansResponseAction('', '', error.response.status));
  }
}
function updateQueryString(filterData) {
  let params = '';
  if (filterData.siteName) {
    params += `sitename=${filterData.siteName}`;
  }
  if (filterData.carrierName) {
    params += `${params ? '&' : ''}carrierName=${filterData.carrierName}`;
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
  if (filterData.filterType !== '0' && filterData.filterType !== undefined) {
    params += `${params ? '&' : ''}filtertype=${filterData.filterType}`;
  }
  if (filterData.fromDate) {
    params += `${params ? '&' : ''}fromdate=${filterData.fromDate}`;
  }
  if (filterData.toDate) {
    params += `${params ? '&' : ''}todate=${filterData.toDate}`;
  }
  if (
    filterData.sendForScanType !== '0' &&
    filterData.sendForScanType !== undefined
  )
    params += `${params ? '&' : ''}sendforscantype=${
      filterData.sendForScanType
    }`;

  if (
    filterData.updateScanType !== '0' &&
    filterData.updateScanType !== undefined
  )
    params += `${params ? '&' : ''}updatescantype=${filterData.updateScanType}`;

  if (filterData.deliverType !== '0' && filterData.deliverType !== undefined)
    params += `${params ? '&' : ''}delivertype=${filterData.deliverType}`;

  return params;
}
export function* scanPageFilterSaga(action) {
  let params = '';
  try {
    const { filterData } = action;
    params = updateQueryString(filterData);
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(scansResponseAction('', response));
  } catch (error) {
    yield put(scansResponseAction('', '', error.response.status));
  }
}
export function* scanPageDetailSaga(action) {
  try {
    const requestUrl = `${url}/${action.scanId}`;
    const response = yield call(get, requestUrl);
    yield put(scanResponseAction('', response));
  } catch (err) {
    toastr.error(err);
  }
}
export function* scanPageResetSaga(action) {
  try {
    const requestUrl = `${url}/${action.scanId}/reset`;
    const response = yield call(puts, requestUrl);
    let message;
    if (response) message = <FormattedMessage {...messages.successOperation} />;
    else message = <FormattedMessage {...messages.errorOperation} />;
    yield put(responseResetAction(response));
    toastr.success(message.props.defaultMessage);
  } catch (err) {
    toastr.error(err);
  }
}
export function* scanPageSetCountSaga(action) {
  try {
    const requestUrl = `${url}/${action.scanId}/set-count/${action.count}`;
    const response = yield call(puts, requestUrl);
    const data = {
      index: action.scanId,
      count: action.count,
      response,
    };
    let message;
    if (response) message = <FormattedMessage {...messages.successOperation} />;
    else message = <FormattedMessage {...messages.errorOperation} />;
    yield put(responseScanCountAction(data));
    toastr.success(message.props.defaultMessage);
  } catch (err) {
    toastr.error(err);
  }
}
export function* pageLogsSaga(action) {
  try {
    const params = `${action.query}`;
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(scansResponseAction(params, response));
  } catch (error) {
    yield put(scansResponseAction('', '', error.response.status));
  }
}

export default function* scanReportListener() {
  yield takeLatest(DEFAULT_ACTION, scanPageSaga);
  yield takeLatest(FILTER_ACTION, scanPageFilterSaga);
  yield takeLatest(DETAIL_ACTION, scanPageDetailSaga);
  yield takeLatest(RESET_ACTION, scanPageResetSaga);
  yield takeLatest(SET_ACTION, scanPageSetCountSaga);
  yield takeLatest(PAGE_ACTION, pageLogsSaga);
}
