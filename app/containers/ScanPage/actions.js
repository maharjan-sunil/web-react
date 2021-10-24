import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  RESET_ACTION,
  SET_ACTION,
  SCANS_RESPONSE_ACTION,
  SCAN_RESPONSE_ACTION,
  RESPONSE_RESET_ACTION,
  RESPONSE_SCANCOUNT_ACTION,
  RESET_STATUSCODE_ACTION,
  PAGE_ACTION,
  ROW_SELECT_ACTION,
  RESET_RESULT_ACTION,
} from './Constants';

export function getScansAction(filterData) {
  return {
    type: DEFAULT_ACTION,
    filterData,
  };
}

export function filterScansAction(filterData) {
  return {
    type: FILTER_ACTION,
    filterData,
  };
}

export function scansResponseAction(request, response, statusCode) {
  return {
    type: SCANS_RESPONSE_ACTION,
    request,
    response,
    statusCode,
  };
}

export function getScanDetailAction(scanId) {
  return {
    type: DETAIL_ACTION,
    scanId,
  };
}

export function scanResponseAction(request, response, statusCode) {
  return {
    type: SCAN_RESPONSE_ACTION,
    request,
    response,
    statusCode,
  };
}

export function resetScanAction(scanId) {
  return {
    type: RESET_ACTION,
    scanId,
  };
}

export function setScanAction(scanId, count) {
  return {
    type: SET_ACTION,
    scanId,
    count,
  };
}

export function responseResetAction(response) {
  return {
    type: RESPONSE_RESET_ACTION,
    response,
  };
}

export function responseScanCountAction(response) {
  return {
    type: RESPONSE_SCANCOUNT_ACTION,
    response,
  };
}

export function resetStatusCodeAction() {
  return {
    type: RESET_STATUSCODE_ACTION,
  };
}

export function pageLogsAction(query) {
  return {
    type: PAGE_ACTION,
    query,
  };
}

export function selectRowAction(selectedRow) {
  return {
    type: ROW_SELECT_ACTION,
    selectedRow,
  };
}

export function resetResultAction() {
  return {
    type: RESET_RESULT_ACTION,
  };
}
