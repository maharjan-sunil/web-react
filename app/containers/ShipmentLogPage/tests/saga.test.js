import { put, takeLatest } from 'redux-saga/effects';

import {
  shipmentLogResponseAction,
  shipmentLogsResponseAction,
  shipmentLogShipmentResponseAction,
  ShipmentLogsResquestDetailAction,
  ShipmentLogsResponseDetailAction,
} from 'containers/ShipmentLogPage/actions';
import history from 'utils/history';
import {
  DEFAULT_ACTION,
  //   SUCCESS_ACTION,
  //   ERROR_ACTION,
} from '../Constants';

// import { getLogsAction, loadSuccess } from 'containers/LogPage/actions';

import LogReportListeners, {
  getLogsSaga,
  filterLogsSaga,
  getLogSaga,
  getLogShipmentSaga,
  getShipmentLogRequestDetailSaga,
  getShipmentLogResponseDetailSaga,
} from '../saga';
import logs from './api/logs';

// test for getLogsSaga
describe('getLogsSaga Saga', () => {
  let getLogsGenerator;
  const action = {
    filterData: '&fromdate=01-01-2020&&todate=01-01-2020',
  };
  let params = '';
  if (action.filterData) {
    params = `${action.filterData}`;
  }
  beforeEach(() => {
    getLogsGenerator = getLogsSaga(action);
    getLogsGenerator.next();
  });
  it('should dispatch the getlogs action if it requests the data successfully', () => {
    const response = logs;
    const putDescriptor = getLogsGenerator.next(response).value;
    expect(putDescriptor).toEqual(
      put(shipmentLogsResponseAction(params, response)),
    );
  });
});
// test for filterLogsSaga
describe('getLogsSaga Saga', () => {
  let getLogsGenerator;
  let params = '';
  beforeEach(() => {
    const action = {
      filterData: {
        fromDate: '8/23/2020',
        toDate: '8/23/2020',
        siteName: '',
        status: 1,
        product: '',
        operation: 1,
      },
    };
    if (action.filterData.fromDate) {
      params += `${params ? '&' : ''}fromdate=${action.filterData.fromDate}`;
    }
    if (action.filterData.toDate) {
      params += `${params ? '&' : ''}todate=${action.filterData.toDate}`;
    }
    if (action.filterData.siteName) {
      params += `&sitename=${action.filterData.siteName}`;
    }
    if (action.filterData.status && action.filterData.status > 0)
      params += `&status=${action.filterData.status}`;
    if (action.filterData.product) {
      params += `${params ? '&' : ''}product=${action.filterData.product}`;
    }
    if (action.filterData.operation && action.filterData.operation > 0)
      params += `&operation=${action.filterData.operation}`;
    history.push(`?${params}`);
    getLogsGenerator = filterLogsSaga(action);
    getLogsGenerator.next();
  });
  it('should dispatch the filterLogsAction action if it requests the data successfully', () => {
    const response = logs;
    const putDescriptor = getLogsGenerator.next(response).value;
    expect(putDescriptor).toEqual(
      put(shipmentLogsResponseAction(params, response)),
    );
  });
});

// test for getLogSaga
describe('getLogSaga Saga', () => {
  let getLogsGenerator;
  const url = '/shipment-logs';
  const action = { LogID: 1 };
  const requestURL = `${url}/${action.logId}`;
  beforeEach(() => {
    getLogsGenerator = getLogSaga(action);
    getLogsGenerator.next();
  });

  it('should dispatch the getlog action if it requests the data successfully', () => {
    const response = logs;
    const putDescriptor = getLogsGenerator.next(response).value;

    expect(putDescriptor).toEqual(
      put(shipmentLogResponseAction(requestURL, response)),
    );
  });
});

// test for getLogShipmentSaga
describe('getLogSaga Saga', () => {
  let getLogsGenerator;
  const url = '/shipment-logs';
  const action = { shipmentId: 1 };
  const requestURL = `${url}/shipment/${action.shipmentId}`;
  beforeEach(() => {
    getLogsGenerator = getLogShipmentSaga(action);
    getLogsGenerator.next();
  });

  it('should dispatch the getlog action if it requests the data successfully', () => {
    const response = logs;
    const putDescriptor = getLogsGenerator.next(response).value;

    expect(putDescriptor).toEqual(
      put(shipmentLogShipmentResponseAction(requestURL, response)),
    );
  });
});
// test for getShipmentLogRequestDetailSaga
describe('getShipmentLogRequestDetailSaga Saga', () => {
  let getLogsGenerator;
  const url = '/shipment-logs';
  const action = { LogId: 1 };
  const requestURL = `${url}/${action.LogId}/request`;
  beforeEach(() => {
    getLogsGenerator = getShipmentLogRequestDetailSaga(action);
    getLogsGenerator.next();
  });

  it('should dispatch the getlog action if it requests the data successfully', () => {
    const response = logs;
    const putDescriptor = getLogsGenerator.next(response).value;

    expect(putDescriptor).toEqual(
      put(ShipmentLogsResquestDetailAction(requestURL, response)),
    );
  });
});
// test for getShipmentLogResponseDetailSaga
describe('getShipmentLogRequestDetailSaga Saga', () => {
  let getLogsGenerator;
  const url = '/shipment-logs';
  const action = { LogId: 1 };
  const requestURL = `${url}/${action.LogId}/response`;
  beforeEach(() => {
    getLogsGenerator = getShipmentLogResponseDetailSaga(action);
    getLogsGenerator.next();
  });

  it('should dispatch the getlog action if it requests the data successfully', () => {
    const response = logs;
    const putDescriptor = getLogsGenerator.next(response).value;

    expect(putDescriptor).toEqual(
      put(ShipmentLogsResponseDetailAction(requestURL, response)),
    );
  });
});
describe('LogReportListeners Saga', () => {
  const githubDataSaga = LogReportListeners();

  it('should start task to watch for LOAD_REPOS action', () => {
    const takeLatestDescriptor = githubDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(DEFAULT_ACTION, getLogsSaga),
    );
  });
});
