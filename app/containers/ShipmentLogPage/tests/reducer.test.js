import produce from 'immer';

import logReducer from '../reducer';
// import {
//   SHIPMENTLOGS_RESPONSE_ACTION,
//   SHIPMENTLOG_DETAIL_RESPONSE_ACTION,
// } from '../Constants';
import {
  getLogsAction,
  // filterLogsAction
  // ShipmentLogDetailResponseAction,
  // getShipmentLogsResponseAction,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('logReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: true,
      error: false,
      logs: [],
      log: {},
      shipment: {},
      page: 0,
      perPage: 20,
      total: 0,
      statusCode: 0,
      req: {},
      res: {},
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(logReducer(undefined, {})).toEqual(expectedResult);
  });

  describe('produceDefaultAction', () => {
    it('should produce default action and set state', () => {
      const expectedResult = produce(state, draft => {
        draft.loading = true;
        draft.error = false;
        draft.logs = [];
      });
      expect(logReducer(state, getLogsAction())).toEqual(expectedResult);
    });
  });
  //   it('should produce FILTER_ACTION and set state', () => {
  //     const expectedResult = produce(state, draft => {
  //       draft.loading = true;
  //       draft.error = false;
  //       draft.logs = [];
  //     });
  //     expect(logReducer(state, filterLogsAction())).toEqual(expectedResult);
  //   });
  // });

  // it('should handle SHIPMENTLOGS_RESPONSE_ACTION', () => {
  //   const response = {result:undefined}
  //   const request = undefined;
  //   const expectedResponse = {
  //     type: SHIPMENTLOGS_RESPONSE_ACTION,
  //     logs: getShipmentLogsResponseAction(request, response),
  //   };

  //   const expectedResult = produce(state, draft => {
  //     draft.loading = false;
  //     draft.error = false;
  //     draft.logs = response.result;
  //   });

  //   expect(logReducer(state, expectedResponse)).toEqual(expectedResult);
  // });
  // it('should handle SHIPMENTLOG_DETAIL_RESPONSE_ACTION', () => {
  //   const request = undefined;
  //   const response = undefined;

  //   const expectedResult = produce(state, draft => {
  //     draft.log = request;
  //   });
  //   const expectedResponse = {
  //     type: SHIPMENTLOG_DETAIL_RESPONSE_ACTION,
  //     log: ShipmentLogDetailResponseAction(request, response),
  //   };
  //   expect(logReducer(state, expectedResponse)).toEqual(expectedResult);
  // });
});
