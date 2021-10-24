import { get, puts, destroy } from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import history from 'utils/history';

import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  REVIEW_ACTION,
  RESEND_ACTION,
  REVALIDATE_ACTION,
  DELETE_ACTION,
  RESTORE_ACTION,
  PERMANENT_DELETE_ACTION,
  PAGE_ACTION,
  DOWNLOAD_ACTION,
} from './Constants';
import {
  invoicesResponseAction,
  invoiceResponseAction,
  responseAction,
  responseDeleteAction,
  responseRestoreAction,
  responsePermanentDeleteAction,
  responseDownloadAction,
} from './actions';

const url = '/invoice-files';
export function* getInvoicesSaga(action) {
  const { filterParams } = action;
  try {
    const response = yield call(get, `${url}?${filterParams}`);
    yield put(invoicesResponseAction(filterParams, response));
  } catch (error) {
    yield put(invoicesResponseAction('', '', error.response.status));
  }
}
function updateQueryString(filterData) {
  let params = '';
  const queryString = new URLSearchParams(window.location.search);
  queryString.forEach((value, key) => {
    if (key === 'siteName' && filterData.siteName !== '') {
      params += `${params ? '&' : ''}siteName=${filterData.siteName}`;
    }
    if (key === 'carrierName' && filterData.carrierName !== '') {
      params += `${params ? '&' : ''}carrierName=${filterData.carrierName}`;
    }
    if (key === 'pickupDateFrom' && filterData.pickupDateFrom !== '') {
      params += `${params ? '&' : ''}pickupDateFrom=${
        filterData.pickupDateFrom
      }`;
    }
    if (key === 'pickupDateTo' && filterData.pickupDateTo !== '') {
      params += `${params ? '&' : ''}pickupDateTo=${filterData.pickupDateTo}`;
    }
    if (key === 'fileName' && filterData.fileName !== '') {
      params += `${params ? '&' : ''}fileName=${filterData.fileName}`;
    }
    if (key === 'status' && filterData.status !== '0') {
      params += `${params ? '&' : ''}status=${filterData.status}`;
    }
  });
  // check and set
  if (!queryString.get('siteName') && filterData.siteName !== '') {
    params += `${params ? '&' : ''}siteName=${filterData.siteName}`;
  }
  if (!queryString.get('carrierName') && filterData.carrierName !== '') {
    params += `${params ? '&' : ''}carrierName=${filterData.carrierName}`;
  }
  if (!queryString.get('pickupDateFrom') && filterData.pickupDateFrom !== '') {
    params += `${params ? '&' : ''}pickupDateFrom=${filterData.pickupDateFrom}`;
  }
  if (!queryString.get('pickupDateTo') && filterData.pickupDateTo !== '') {
    params += `${params ? '&' : ''}pickupDateTo=${filterData.pickupDateTo}`;
  }
  if (!queryString.get('fileName') && filterData.fileName !== '') {
    params += `${params ? '&' : ''}fileName=${filterData.fileName}`;
  }
  if (!queryString.get('status') && filterData.status !== '0') {
    params += `${params ? '&' : ''}status=${filterData.status}`;
  }
  return params;
}
export function* filterInvoicesSaga(action) {
  const { filterParams } = action;
  try {
    const params = updateQueryString(filterParams);
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(invoicesResponseAction(params, response));
  } catch (error) {
    yield put(invoicesResponseAction('', '', error.response.status));
  }
}

export function* getInvoiceSaga(action) {
  try {
    const response = yield call(get, `${url}/${action.id}`);
    yield put(invoiceResponseAction(action.id, response));
  } catch (error) {
    toastr.error(error);
  }
}

export function* reviewInvoiceSaga(action) {
  try {
    const response = yield call(puts, `${url}/${action.id}/review`);
    yield put(responseAction(action.id, response));
    toastr.success('Invoice review.');
  } catch (error) {
    toastr.error(error);
  }
}

export function* resendInvoiceSaga(action) {
  try {
    const response = yield call(puts, `${url}/${action.id}/resend`);
    yield put(responseAction(action.id, response));
    toastr.success('Invoice resend.');
  } catch (error) {
    toastr.error(error);
  }
}

export function* revalidateInvoiceSaga(action) {
  try {
    const response = yield call(puts, `${url}/${action.id}/revalidate`);
    yield put(responseAction(action.id, response));
    toastr.success('Invoice revalidate.');
  } catch (error) {
    toastr.error(error);
  }
}
export function* downloadInvoiceSaga(action) {
  try {
    const response = yield call(get, `${url}/${action.id}/content`);
    yield put(responseDownloadAction(action.id, response));
  } catch (error) {
    toastr.error(error);
  }
}

export function* deleteInvoiceSaga(action) {
  try {
    const response = yield call(puts, `${url}/${action.id}/delete`);
    yield put(responseDeleteAction(action.id, response.result));
    toastr.success('Invoice deleted.');
  } catch (error) {
    toastr.error(error);
  }
}

export function* restoreInvoiceSaga(action) {
  try {
    const response = yield call(puts, `${url}/${action.id}/restore`);
    yield put(responseRestoreAction(action.id, response.result));
    toastr.success('Invoice restored.');
  } catch (error) {
    toastr.error(error);
  }
}

export function* permanentDeleteInvoiceSaga(action) {
  try {
    const response = yield call(
      destroy,
      `${url}/${action.id}/permanent-delete`,
    );
    yield put(responsePermanentDeleteAction(action.id, response.result));
    toastr.success('Invoice permanently deleted.');
  } catch (error) {
    toastr.error(error);
  }
}

export function* pageLogsSaga(action) {
  try {
    const params = `${action.query}`;
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(invoicesResponseAction(params, response));
  } catch (error) {
    yield put(invoicesResponseAction('', '', error.response.status));
  }
}

export default function* InvoiceListener() {
  yield takeLatest(DEFAULT_ACTION, getInvoicesSaga);
  yield takeLatest(FILTER_ACTION, filterInvoicesSaga);
  yield takeLatest(DETAIL_ACTION, getInvoiceSaga);
  yield takeLatest(REVIEW_ACTION, reviewInvoiceSaga);
  yield takeLatest(RESEND_ACTION, resendInvoiceSaga);
  yield takeLatest(REVALIDATE_ACTION, revalidateInvoiceSaga);
  yield takeLatest(DOWNLOAD_ACTION, downloadInvoiceSaga);
  yield takeLatest(DELETE_ACTION, deleteInvoiceSaga);
  yield takeLatest(RESTORE_ACTION, restoreInvoiceSaga);
  yield takeLatest(PERMANENT_DELETE_ACTION, permanentDeleteInvoiceSaga);
  yield takeLatest(PAGE_ACTION, pageLogsSaga);
}
