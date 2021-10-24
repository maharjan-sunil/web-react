import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  // SHIPMENTLOG_DETAIL_RESPONSE_ACTION,
  // SHIPMENTLOGS_RESPONSE_ACTION,
} from '../Constants';

import {
  getLogsAction,
  filterLogsAction,
  getLogAction,
  // getShipmentLogsResponseAction,
  // ShipmentLogDetailResponseAction,
} from '../actions';

describe('Log Actions', () => {
  it('has a type of DEFAULT_ACTION', () => {
    const filterData = {
      fromDate: '',
      toDate: '',
      siteName: '',
      status: '',
      product: '',
      operation: '',
    };
    const expected = {
      type: DEFAULT_ACTION,
      filterData,
    };
    expect(getLogsAction(filterData)).toEqual(expected);
  });

  it('has a type of FILTER_ACTION', () => {
    const filterData = {
      fromDate: '',
      toDate: '',
      siteName: '',
      status: '',
      product: '',
      operation: '',
    };
    const expected = {
      type: FILTER_ACTION,
      filterData,
    };
    expect(filterLogsAction(filterData)).toEqual(expected);
  });

  // it('has a type of LOAD_SUCCESS_ACTION', () => {
  //   const response = { page: '', perPage: '', total: '', result: [] };
  //   const request = {};
  //   const expected = {
  //     type: SHIPMENTLOGS_RESPONSE_ACTION,
  //     request,
  //     response,
  //   };
  //   expect(getShipmentLogsResponseAction(request, response)).toEqual(expected);
  // });
  it('has a type of DETAIL_ACTION', () => {
    const logId = 1;
    const expected = {
      type: DETAIL_ACTION,
      logId,
    };
    expect(getLogAction(logId)).toEqual(expected);
  });

  // it('has a type of DETAIL_ACTION_RESPONSE', () => {
  //   const response = { page: '', perPage: '', total: '', result: [] };
  //   const request = {};
  //   const expected = {
  //     type: SHIPMENTLOG_DETAIL_RESPONSE_ACTION,
  //     request,
  //     response,
  //   };
  //   expect(ShipmentLogDetailResponseAction(request, response)).toEqual(
  //     expected,
  //   );
  // });
});
