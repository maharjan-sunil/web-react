import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  SHIPMENT_RESPONSE_ACTION,
  PAGE_ACTION,
  DETAIL_ACTION,
  DATACONNECTIONS_RESPONSE_ACTION,
  RESET_STATUSCODE_ACTION,
  DATACONNECTION_RESPONSE_ACTION,
  SHIPMENT_DETAIL_ACTION,
  RESET_ACTION,
  RESET_RESPONSE_ACTION,
  ROW_SELECT_ACTION,
} from './Constants';

export function getDatatConnectionDetailAction(Id) {
  return {
    type: DETAIL_ACTION,
    Id,
  };
}
export function pageDataConnectionAction(query) {
  return {
    type: PAGE_ACTION,
    query,
  };
}
export function getDataConnectionsAction(filterData) {
  return { type: DEFAULT_ACTION, filterData };
}

export function getShipmentDetailAction(Id) {
  return {
    type: SHIPMENT_DETAIL_ACTION,
    Id,
  };
}

export function getFilterDataConnectionAction(filterData) {
  return {
    type: FILTER_ACTION,
    filterData,
  };
}
export function shipmentResponseAction(request, response) {
  return {
    type: SHIPMENT_RESPONSE_ACTION,
    request,
    response,
  };
}
export function dataconnectionResponseAction(request, response) {
  return {
    type: DATACONNECTION_RESPONSE_ACTION,
    request,
    response,
  };
}

export function dataconnectionsResponseAction(request, response, statusCode) {
  return {
    type: DATACONNECTIONS_RESPONSE_ACTION,
    request,
    response,
    statusCode,
  };
}

export function resetStatusCodeAction() {
  return {
    type: RESET_STATUSCODE_ACTION,
  };
}

export function resetDataConnectionAction(Id, index) {
  return {
    type: RESET_ACTION,
    Id,
    index,
  };
}
export function resetResponseAction(request, response) {
  return {
    type: RESET_RESPONSE_ACTION,
    request,
    response,
  };
}
export function selectRowAction(selectedRow) {
  return {
    type: ROW_SELECT_ACTION,
    selectedRow,
  };
}
