import { get } from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import toastr from 'toastr';
import history from 'utils/history';
import { PAGE_ACTION, FILTER_ACTION } from './Constants';
import { NotMappedResponseAction } from './actions';

const url = '/not-mapped';
function updateQueryString(filterData) {
  let params = '';
  if (filterData.fromDate) {
    params += `${params ? '&' : ''}fromdate=${filterData.fromDate}`;
  }
  if (filterData.toDate) {
    params += `${params ? '&' : ''}todate=${filterData.toDate}`;
  }

  if (filterData.awb) {
    params += `${params ? '&' : ''}awb=${filterData.awb}`;
  }
  if (filterData.accountNumber) {
    params += `${params ? '&' : ''}accountnumber=${filterData.accountNumber}`;
  }
  if (filterData.carrierName) {
    params += `${params ? '&' : ''}carrierName=${filterData.carrierName}`;
  }
  return params;
}

function* getApiFilterData(action) {
  try {
    const { filterData } = action;
    const params = updateQueryString(filterData);
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(NotMappedResponseAction(params, response));
  } catch (error) {
    toastr.error(error);
  }
}
function* pageNotMappedSaga(action) {
  try {
    const params = `${action.query}`;
    history.push(`?${params}`);
    const response = yield call(get, `${url}?${params}`);
    yield put(NotMappedResponseAction(params, response));
  } catch (error) {
    toastr.error(error);
  }
}
export default function* mySaga() {
  yield takeLatest(FILTER_ACTION, getApiFilterData);
  yield takeLatest(PAGE_ACTION, pageNotMappedSaga);
}
