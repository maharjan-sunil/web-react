import React from 'react';
import { call, put, takeLatest } from 'redux-saga/effects';
import { get, post, puts, destroy } from 'utils/request';
import toastr from 'toastr';
import { FormattedMessage } from 'react-intl';
import history from 'utils/history';
import messages from './messages';

import {
  sitesResponseAction,
  siteResponseAction,
  responseAction,
  responseDeleteAction,
} from './actions';

import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  INSERT_ACTION,
  UPDATE_ACTION,
  DELETE_ACTION,
  PAGE_ACTION,
} from './Constants';

const url = '/sites';

export function* getSitesSaga(action) {
  const { filterParams } = action;
  try {
    const response = yield call(get, `${url}?${filterParams}`);
    yield put(sitesResponseAction(filterParams, response));
  } catch (error) {
    yield put(sitesResponseAction('', '', error.response.status));
  }
}

export function* filterSitesSaga(action) {
  let params = '';
  try {
    const { filterParams } = action;
    if (filterParams.siteName) {
      params += `${params ? '&' : ''}sitename=${filterParams.siteName}`;
    }
    if (filterParams.ftpUsername) {
      params += `${params ? '&' : ''}ftpusername=${filterParams.ftpUsername}`;
    }
    if (filterParams.siteUsername) {
      params += `${params ? '&' : ''}siteusername=${filterParams.siteUsername}`;
    }
    if (filterParams.siteIP) {
      params += `${params ? '&' : ''}siteip=${filterParams.siteIP}`;
    }
    if (filterParams.siteFTPIP) {
      params += `${params ? '&' : ''}siteftpip=${filterParams.siteFTPIP}`;
    }
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(sitesResponseAction(params, response));
  } catch (error) {
    yield put(sitesResponseAction('', '', error.response.status));
  }
}

export function* getSiteSaga(action) {
  try {
    const response = yield call(get, `${url}/${action.id}`);
    yield put(siteResponseAction(action.id, response));
  } catch (error) {
    toastr.error(error);
  }
}

export function* insertSiteSaga(action) {
  try {
    const response = yield call(post, url, action.site);
    let message = '';
    if (response.result)
      message = <FormattedMessage {...messages.createSuccess} />;
    else message = <FormattedMessage {...messages.createFailed} />;
    yield put(responseAction(action.site, response.result));
    toastr.success(message.props.defaultMessage);
  } catch (error) {
    toastr.error(error);
  }
}

export function* updateSiteSaga(action) {
  try {
    const response = yield call(
      puts,
      `${url}/${action.site.siteId}`,
      action.site,
    );
    let message = '';
    if (response.result)
      message = <FormattedMessage {...messages.updateSuccess} />;
    else message = <FormattedMessage {...messages.updateFailed} />;
    yield put(responseAction(action.site, response.result));
    toastr.success(message.props.defaultMessage);
  } catch (error) {
    toastr.error(error);
  }
}

export function* deleteSiteSaga(action) {
  try {
    const response = yield call(destroy, `${url}/${action.id}`);
    let message = '';
    if (response.result)
      message = <FormattedMessage {...messages.deleteSuccess} />;
    else message = <FormattedMessage {...messages.deleteFailed} />;
    yield put(responseDeleteAction(action.id, response.result));
    toastr.success(message.props.defaultMessage);
  } catch (error) {
    toastr.error(error);
  }
}

export function* pageSitesSaga(action) {
  try {
    const params = `${action.query}`;
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(sitesResponseAction(params, response));
  } catch (error) {
    yield put(sitesResponseAction('', '', error.response.status));
  }
}

export default function* allActions() {
  yield takeLatest(DEFAULT_ACTION, getSitesSaga);
  yield takeLatest(FILTER_ACTION, filterSitesSaga);
  yield takeLatest(DETAIL_ACTION, getSiteSaga);
  yield takeLatest(INSERT_ACTION, insertSiteSaga);
  yield takeLatest(UPDATE_ACTION, updateSiteSaga);
  yield takeLatest(DELETE_ACTION, deleteSiteSaga);
  yield takeLatest(PAGE_ACTION, pageSitesSaga);
}
