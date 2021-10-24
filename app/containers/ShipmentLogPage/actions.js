import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  PAGE_ACTION,
  DETAIL_ACTION,
  SHIPMENT_DETAIL_ACTION,
  SHIPMENTLOGS_RESPONSE_ACTION,
  SHIPMENTLOG_RESPONSE_ACTION,
  SHIPMENTLOG_SHIPMENT_RESPONSE_ACTION,
  RESET_STATUSCODE_ACTION,
  RESPONSE_ACTION,
  REQUEST_ACTION,
  SHIPMENTLOGS_REQUEST_DETAIL_ACTION,
  SHIPMENTLOGS_RESPONSE_DETAIL_ACTION,
  ROW_SELECT_ACTION,
} from './Constants';

export function getLogsAction(filterData) {
  return {
    type: DEFAULT_ACTION,
    filterData,
  };
}

export function filterLogsAction(filterData) {
  return {
    type: FILTER_ACTION,
    filterData,
  };
}

export function pageLogsAction(query) {
  return {
    type: PAGE_ACTION,
    query,
  };
}

export function getLogAction(logId) {
  return {
    type: DETAIL_ACTION,
    logId,
  };
}

export function getLogShipmentAction(shipmentId) {
  return {
    type: SHIPMENT_DETAIL_ACTION,
    shipmentId,
  };
}

export function shipmentLogsResponseAction(request, response, statusCode) {
  return {
    type: SHIPMENTLOGS_RESPONSE_ACTION,
    request,
    response,
    statusCode,
  };
}

export function shipmentLogResponseAction(request, response, statusCode) {
  return {
    type: SHIPMENTLOG_RESPONSE_ACTION,
    request,
    response,
    statusCode,
  };
}

export function shipmentLogShipmentResponseAction(
  request,
  response,
  statusCode,
) {
  return {
    type: SHIPMENTLOG_SHIPMENT_RESPONSE_ACTION,
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
export function getShipmentLogsResponseAction(LogId) {
  return {
    type: RESPONSE_ACTION,
    LogId,
  };
}
export function getShipmentLogsRequestAction(LogId) {
  return {
    type: REQUEST_ACTION,
    LogId,
  };
}

export function ShipmentLogsResponseDetailAction(request, response) {
  return {
    type: SHIPMENTLOGS_RESPONSE_DETAIL_ACTION,
    request,
    response,
  };
}
export function ShipmentLogsResquestDetailAction(request, response) {
  return {
    type: SHIPMENTLOGS_REQUEST_DETAIL_ACTION,
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
