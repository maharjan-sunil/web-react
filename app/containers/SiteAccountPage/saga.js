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
  CREATE_SELECT_LIST_ACTION,
  PAGE_ACTION,
} from './Constants';
import {
  siteAccountsResponseAction,
  siteAccountResponseAction,
  responseAction,
  responseDeleteAction,
  responseRestoreAction,
  responsePermanentDeleteAction,
  responseCreateSelectListAction,
} from './actions';

const url = '/site-accounts';
export function* getSiteAccountsSaga(action) {
  const { filterParams } = action;
  try {
    const response = yield call(get, `${url}?${filterParams}`);
    yield put(siteAccountsResponseAction(filterParams, response));
  } catch (error) {
    yield put(siteAccountsResponseAction('', '', error.response.status));
  }
}

export function* filterSiteAccountsSaga(action) {
  let params = '';
  try {
    const { filterParams } = action;
    if (filterParams.siteName) {
      params += `sitename=${filterParams.siteName}`;
    }
    if (filterParams.carrierName) {
      params += `${params ? '&' : ''}carriername=${filterParams.carrierName}`;
    }
    if (filterParams.accountNumber) {
      params += `${params ? '&' : ''}accountnumber=${
        filterParams.accountNumber
      }`;
    }
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(siteAccountsResponseAction(params, response));
  } catch (error) {
    yield put(siteAccountsResponseAction('', '', error.response.status));
  }
}

export function* getSiteAccountSaga(action) {
  try {
    const response = yield call(get, `${url}/${action.id}`);
    yield put(siteAccountResponseAction(action.id, response));
  } catch (error) {
    toastr.error(error);
  }
}

export function* insertSiteAccountSaga(action) {
  try {
    const response = yield call(post, url, action.siteAccount);
    yield put(responseAction(action.siteAccount, response.result));
    toastr.success('New siteAccount added.');
  } catch (error) {
    toastr.error(error);
  }
}

export function* updateSiteAccountSaga(action) {
  try {
    let response = yield call(
      puts,
      `${url}/${action.siteAccount.id}`,
      action.siteAccount,
    );
    response = response.result === 0 ? 1 : response.result;
    yield put(responseAction(action.siteAccount, response));
    toastr.success('SiteAccount updated.');
  } catch (error) {
    toastr.error(error);
  }
}

export function* deleteSiteAccountSaga(action) {
  try {
    const response = yield call(puts, `${url}/${action.id}/delete`);
    yield put(responseDeleteAction(action.id, response.result));
    toastr.success('SiteAccount deleted.');
  } catch (error) {
    toastr.error(error);
  }
}

export function* restoreSiteAccountSaga(action) {
  try {
    const response = yield call(puts, `${url}/${action.id}/restore`);
    yield put(responseRestoreAction(action.id, response.result));
    toastr.success('SiteAccount restored.');
  } catch (error) {
    toastr.error(error);
  }
}

export function* permanentDeleteSiteAccountSaga(action) {
  try {
    const response = yield call(
      destroy,
      `${url}/${action.id}/permanent-delete`,
    );
    yield put(responsePermanentDeleteAction(action.id, response.result));
    toastr.success('SiteAccount permanently deleted.');
  } catch (error) {
    toastr.error(error);
  }
}

export function* getCreateSelectListSaga() {
  try {
    const siteSelectList = yield call(get, `/sites/select-list`);
    const carrierSelectList = yield call(get, `/transports/select-list`);
    const response = {
      sites: siteSelectList,
      carriers: carrierSelectList,
    };
    yield put(responseCreateSelectListAction('', response));
  } catch (error) {
    toastr.error(error);
  }
}

export function* pageSiteAccountsSaga(action) {
  try {
    const params = `${action.query}`;
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(siteAccountsResponseAction(params, response));
  } catch (error) {
    yield put(siteAccountsResponseAction('', '', error.response.status));
  }
}

export default function* siteAccountListener() {
  yield takeLatest(DEFAULT_ACTION, getSiteAccountsSaga);
  yield takeLatest(FILTER_ACTION, filterSiteAccountsSaga);
  yield takeLatest(DETAIL_ACTION, getSiteAccountSaga);
  yield takeLatest(INSERT_ACTION, insertSiteAccountSaga);
  yield takeLatest(UPDATE_ACTION, updateSiteAccountSaga);
  yield takeLatest(DELETE_ACTION, deleteSiteAccountSaga);
  yield takeLatest(RESTORE_ACTION, restoreSiteAccountSaga);
  yield takeLatest(PERMANENT_DELETE_ACTION, permanentDeleteSiteAccountSaga);
  yield takeLatest(CREATE_SELECT_LIST_ACTION, getCreateSelectListSaga);
  yield takeLatest(PAGE_ACTION, pageSiteAccountsSaga);
}
