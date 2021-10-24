import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  FILE_CONTENT_ACTION,
  PAGE_ACTION,
  RESPONSE_DEFAULT_ACTION,
  RESPONSE_FILTER_ACTION,
  RESPONSE_DETAIL_ACTION,
  RESPONSE_CONTENT_ACTION,
  RESPONSE_PAGE_ACTION,
  RESET_STATUSCODE_ACTION,
  ROW_SELECT_ACTION,
} from 'containers/FileInformationPage/Constants';

export function requestFilesAction(filterData) {
  return {
    type: DEFAULT_ACTION,
    filterData,
  };
}

export function requestFilterAction(filterData) {
  return {
    type: FILTER_ACTION,
    filterData,
  };
}

export function requestDetailAction(fileId) {
  return {
    type: DETAIL_ACTION,
    fileId,
  };
}

export function requestFileContentAction(fileId) {
  return {
    type: FILE_CONTENT_ACTION,
    fileId,
  };
}

export function requestFilePageAction(query) {
  return {
    type: PAGE_ACTION,
    query,
  };
}

export function responseFilesAction(request, response, statusCode) {
  return {
    type: RESPONSE_DEFAULT_ACTION,
    request,
    response,
    statusCode,
  };
}

export function responseFilterAction(request, response, statusCode) {
  return {
    type: RESPONSE_FILTER_ACTION,
    request,
    response,
    statusCode,
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

export function responseContentAction(request, response, statusCode) {
  return {
    type: RESPONSE_CONTENT_ACTION,
    request,
    response,
    statusCode,
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
