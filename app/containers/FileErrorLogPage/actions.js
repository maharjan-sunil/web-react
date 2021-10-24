import {
  DEFAULT_ACTION,
  RESPONSE_DEFAULT_ACTION,
  FILTER_ACTION,
  RESPONSE_FILTER_ACTION,
  DETAIL_ACTION,
  RESPONSE_DETAIL_ACTION,
  DELETE_ACTION,
  RESPONSE_DELETE_ACTION,
  PAGE_ACTION,
  RESPONSE_PAGE_ACTION,
  RESET_STATUSCODE_ACTION,
  ROW_SELECT_ACTION,
} from 'containers/FileErrorLogPage/Constants';

export function requestDefaultAction(filterData) {
  return {
    type: DEFAULT_ACTION,
    filterData,
  };
}

export function responseDefaultAction(request, response, statusCode) {
  return {
    type: RESPONSE_DEFAULT_ACTION,
    request,
    response,
    statusCode,
  };
}

export function requestFilterAction(filterData) {
  return {
    type: FILTER_ACTION,
    filterData,
  };
}

export function responseFilterAction(request, response, statusCode) {
  return {
    types: RESPONSE_FILTER_ACTION,
    request,
    response,
    statusCode,
  };
}

export function requestDetailAction(errorId) {
  return {
    type: DETAIL_ACTION,
    errorId,
  };
}

export function responseDetailAction(request, response, statusCode) {
  return {
    type: RESPONSE_DETAIL_ACTION,
    request,
    response,
    statusCode,
  };
}

export function requestDeleteAction(errorId) {
  return {
    type: DELETE_ACTION,
    errorId,
  };
}

export function responseDeleteAction(request, response, statusCode) {
  return {
    type: RESPONSE_DELETE_ACTION,
    request,
    response,
    statusCode,
  };
}

export function requestPageAction(query) {
  return {
    type: PAGE_ACTION,
    query,
  };
}

export function responsePageAction(request, response, statusCode) {
  return {
    type: RESPONSE_PAGE_ACTION,
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

export function selectRowAction(selectedRow) {
  return {
    type: ROW_SELECT_ACTION,
    selectedRow,
  };
}
