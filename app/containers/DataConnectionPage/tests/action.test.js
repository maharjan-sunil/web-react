import {
  getDataConnectionsAction,
  getFilterDataConnectionAction,
  getShipmentDetailAction,
  getDatatConnectionDetailAction,
  pageDataConnectionAction,
  shipmentResponseAction,
  dataconnectionResponseAction,
  dataconnectionsResponseAction,
  resetStatusCodeAction,
  resetDataConnectionAction,
  resetResponseAction,
  selectRowAction,
} from '../actions';
import {
  FILTER_ACTION,
  DEFAULT_ACTION,
  SHIPMENT_DETAIL_ACTION,
  DETAIL_ACTION,
  PAGE_ACTION,
  SHIPMENT_RESPONSE_ACTION,
  DATACONNECTION_RESPONSE_ACTION,
  DATACONNECTIONS_RESPONSE_ACTION,
  RESET_STATUSCODE_ACTION,
  RESET_ACTION,
  RESET_RESPONSE_ACTION,
  ROW_SELECT_ACTION,
} from '../Constants';
describe('dataconnection actions', () => {
  it('has a type of DEFAULT_ACTION', () => {
    const expected = {
      type: DEFAULT_ACTION,
    };
    expect(getDataConnectionsAction()).toEqual(expected);
  });

  it('has a type of FILTER_ACTION', () => {
    const filterData = {
      id: 1,
      fileInfoID: 10021,
      scanType: null,
      scanTypeCarrier: 'POSTNORDSE',
      carrierID: 11,
      signature: null,
      countryCode: 'SE        ',
      city: null,
      zip: null,
      carrierAccount: '0123456782',
      awb: '92151510600',
      fileExtractedTime: '2020-04-21T08:06:29.967',
      scanLocation: 'VÃ¤xjÃ¶-1',
      scanMessage: 'The shipment item has been delivered',
      scanDateTime: '2013-08-06T13:40:00',
      scanTransportIdType: '21',
      sendToSite: null,
      lastScanDateTime: '2020-07-29T17:41:04.507',
      dataConnIsProcessed: null,
      dataConnStatus: null,
      dataConnErrorMsg: null,
      siteName: 'SEKO',
      shipmentId: null,
      accountNumber: '0123456782',
    };
    const expected = {
      type: FILTER_ACTION,
      filterData,
    };
    expect(getFilterDataConnectionAction(filterData)).toEqual(expected);
  });
  it('has a type of SHIPMENT_DETAIL_ACTION', () => {
    const Id = 1;
    const expected = {
      type: SHIPMENT_DETAIL_ACTION,
      Id,
    };
    expect(getShipmentDetailAction(Id)).toEqual(expected);
  });
  it('has a type of DETAIL_ACTION', () => {
    const Id = 1;
    const expected = {
      type: DETAIL_ACTION,
      Id,
    };
    expect(getDatatConnectionDetailAction(Id)).toEqual(expected);
  });
  it('has a type of PAGE_ACTION', () => {
    const query = '';
    const expected = {
      type: PAGE_ACTION,
      query,
    };
    expect(pageDataConnectionAction(query)).toEqual(expected);
  });
  it('has a type of SHIPMENT_RESPONSE_ACTION', () => {
    const request = {};
    const response = {};
    const expected = {
      type: SHIPMENT_RESPONSE_ACTION,
      request,
      response,
    };
    expect(shipmentResponseAction(request, response)).toEqual(expected);
  });
  it('has a type of DATACONNECTION_RESPONSE_ACTION', () => {
    const request = {};
    const response = {};
    const expected = {
      type: DATACONNECTION_RESPONSE_ACTION,
      request,
      response,
    };
    expect(dataconnectionResponseAction(request, response)).toEqual(expected);
  });
  it('has a type of DATACONNECTIONS_RESPONSE_ACTION', () => {
    const request = {};
    const response = {};
    const statusCode = 404;
    const expected = {
      type: DATACONNECTIONS_RESPONSE_ACTION,
      request,
      response,
      statusCode,
    };
    expect(
      dataconnectionsResponseAction(request, response, statusCode),
    ).toEqual(expected);
  });
  it('has a type of DATACONNECTIONS_RESPONSE_ACTION', () => {
    const expected = {
      type: RESET_STATUSCODE_ACTION,
    };
    expect(resetStatusCodeAction()).toEqual(expected);
  });

  it('has a type of RESET_ACTION', () => {
    const Id = 12;
    const index = 1;
    const expected = {
      type: RESET_ACTION,
      Id,
      index,
    };
    expect(resetDataConnectionAction(Id, index)).toEqual(expected);
  });
  it('has a type of RESET_RESPONSE_ACTION', () => {
    const request = {};
    const response = {};
    const expected = {
      type: RESET_RESPONSE_ACTION,
      request,
      response,
    };
    expect(resetResponseAction(request, response)).toEqual(expected);
  });
  it('has a type of RESET_RESPONSE_ACTION', () => {
    const request = {};
    const response = {};
    const expected = {
      type: RESET_RESPONSE_ACTION,
      request,
      response,
    };
    expect(resetResponseAction(request, response)).toEqual(expected);
  });
  it('has a type of ROW_SELECT_ACTION', () => {
    const selectedRow = 234;
    const expected = {
      type: ROW_SELECT_ACTION,
      selectedRow,
    };
    expect(selectRowAction(selectedRow)).toEqual(expected);
  });
});
