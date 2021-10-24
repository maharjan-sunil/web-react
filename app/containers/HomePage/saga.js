import { get } from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  DAILY_BY_MONTH_ACTION,
  DAILY_BY_CURRENT_WEEK_ACTION,
  DAILY_BY_LAST_DAYS_ACTION,
  MONTHLY_BY_YEAR_ACTION,
  SITE_MONTHLY_BY_YEAR_ACTION,
  SITE_MONTHLY_SUCCESS_BY_YEAR_ACTION,
  SITE_MONTHLY_FAILURE_BY_YEAR_ACTION,
} from './Constants';
import {
  responseDailyByMonthAction,
  responseDailyByCurrentWeekAction,
  responseDailyByLastDaysAction,
  responseMonthlyByYearAction,
  responseSiteMonthlyByYearAction,
  responseSiteMonthlySuccessByYearAction,
  responseSiteMonthlyFailureByYearAction,
} from './actions';

const url = '/shipment-reports';
function* getDailyByMonthSaga(action) {
  const { month } = action;
  try {
    const response = yield call(get, `${url}/daily-by-month/${month}`);
    yield put(responseDailyByMonthAction(month, response));
  } catch (error) {
    yield put(responseDailyByMonthAction(month, '', error.response.status));
  }
}

function* getDailyByCurrentWeekSaga() {
  try {
    const response = yield call(get, `${url}/daily-by-current-week`);
    yield put(responseDailyByCurrentWeekAction(response));
  } catch (error) {
    yield put(responseDailyByCurrentWeekAction('', error.response.status));
  }
}

function* getDailyByLastDays(action) {
  const { days } = action;
  try {
    const response = yield call(get, `${url}/daily-by-last-days/${days}`);
    yield put(responseDailyByLastDaysAction(days, response));
  } catch (error) {
    yield put(responseDailyByLastDaysAction(days, '', error.response.status));
  }
}

function* getMonthlyByYear(action) {
  const { year } = action;
  try {
    const response = yield call(get, `${url}/monthly-by-year/${year}`);
    yield put(responseMonthlyByYearAction(year, response));
  } catch (error) {
    yield put(responseMonthlyByYearAction(year, '', error.response.status));
  }
}

function* getSiteMonthlyByYear(action) {
  const { year } = action;
  try {
    const response = yield call(get, `${url}/site-monthly-by-year/${year}`);
    yield put(responseSiteMonthlyByYearAction(year, response));
  } catch (error) {
    yield put(responseSiteMonthlyByYearAction(year, '', error.response.status));
  }
}

function* getSiteMonthlySuccessByYear(action) {
  const { year } = action;
  try {
    const response = yield call(
      get,
      `${url}/site-monthly-success-by-year/${year}`,
    );
    yield put(responseSiteMonthlySuccessByYearAction(year, response));
  } catch (error) {
    yield put(
      responseSiteMonthlySuccessByYearAction(year, '', error.response.status),
    );
  }
}

function* getSiteMonthlyFailureByYear(action) {
  const { year } = action;
  try {
    const response = yield call(
      get,
      `${url}/site-monthly-failure-by-year/${year}`,
    );
    yield put(responseSiteMonthlyFailureByYearAction(year, response));
  } catch (error) {
    yield put(
      responseSiteMonthlyFailureByYearAction(year, '', error.response.status),
    );
  }
}

export default function* HomeListener() {
  yield takeLatest(DAILY_BY_MONTH_ACTION, getDailyByMonthSaga);
  yield takeLatest(DAILY_BY_CURRENT_WEEK_ACTION, getDailyByCurrentWeekSaga);
  yield takeLatest(DAILY_BY_LAST_DAYS_ACTION, getDailyByLastDays);
  yield takeLatest(MONTHLY_BY_YEAR_ACTION, getMonthlyByYear);
  yield takeLatest(SITE_MONTHLY_BY_YEAR_ACTION, getSiteMonthlyByYear);
  yield takeLatest(
    SITE_MONTHLY_SUCCESS_BY_YEAR_ACTION,
    getSiteMonthlySuccessByYear,
  );
  yield takeLatest(
    SITE_MONTHLY_FAILURE_BY_YEAR_ACTION,
    getSiteMonthlyFailureByYear,
  );
}
