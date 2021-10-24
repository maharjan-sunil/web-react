import produce from 'immer';
import filterPageReducer from '../reducer';
import {
  getDatatConnectionDetailAction,
  resetDataConnectionAction,
  getShipmentDetailAction,
  shipmentResponseAction,
} from '../actions';
/* eslint-disable default-case, no-param-reassign */
describe('filterPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      dataconnections: [],
      dataconnection: {},
      shipment: {},
      page: 0,
      perPage: 20,
      total: 0,
      statusCode: 0,
      selectedRow: -1,
    };
  });
  it('it should   handle   DEFAULT_ACTION', () => {
    const Id = 2;
    const expectedResult = produce(state, draft => {
      draft.page = 0;
      draft.perPage = 20;
      draft.loading = true;
      draft.error = false;
    });
    expect(
      filterPageReducer(state, getDatatConnectionDetailAction(Id)),
    ).toEqual(expectedResult);
  });
  it('it should   handle   RESET_ACTION', () => {
    const Id = 2;
    const index = 12;
    const expectedResult = produce(state, draft => {
      draft.Loading = true;
    });
    expect(
      filterPageReducer(state, resetDataConnectionAction(Id, index)),
    ).toEqual(expectedResult);
  });
  it('it should   handle   SHIPMENT_DETAIL_ACTION', () => {
    const Id = 2;
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.shipment = {};
    });
    expect(filterPageReducer(state, getShipmentDetailAction(Id))).toEqual(
      expectedResult,
    );
  });
  it('it should   handle   SHIPMENT_RESPONSE_ACTION', () => {
    const request = {};
    const response = {};

    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = false;
      draft.shipment = response;
    });
    expect(
      filterPageReducer(state, shipmentResponseAction(request, response)),
    ).toEqual(expectedResult);
  });
});
