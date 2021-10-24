import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  RESEND_ACTION,
  DELETE_ACTION,
  RESTORE_ACTION,
  PERMANENT_DELETE_ACTION,
  RESPONSE_ACTION,
  RESPONSE_DELETE_ACTION,
  RESPONSE_RESTORE_ACTION,
  FTPFILES_RESPONSE_ACTION,
  FTPFILE_RESPONSE_ACTION,
  RESPONSE_PERMANENT_DELETE_ACTION,
  RESET_RESULT_ACTION,
  RESET_STATUSCODE_ACTION,
  PAGE_ACTION,
  DOWNLOAD_ACTION,
  RESPONSE_DOWNLOAD_ACTION,
} from './Constants';

export function getFTPFilesAction(filterParams) {
  return {
    type: DEFAULT_ACTION,
    filterParams,
  };
}

export function filterFTPFilesAction(filterParams) {
  return {
    type: FILTER_ACTION,
    filterParams,
  };
}

export function getFTPFileAction(id) {
  return {
    type: DETAIL_ACTION,
    id,
  };
}

export function resendFTPFileAction(id) {
  return {
    type: RESEND_ACTION,
    id,
  };
}

export function downloadFTPFileAction(id) {
  return {
    type: DOWNLOAD_ACTION,
    id,
  };
}

export function deleteFTPFileAction(id) {
  return {
    type: DELETE_ACTION,
    id,
  };
}

export function restoreFTPFileAction(id) {
  return {
    type: RESTORE_ACTION,
    id,
  };
}

export function permanentDeleteFTPFileAction(id) {
  return {
    type: PERMANENT_DELETE_ACTION,
    id,
  };
}

export function responseAction(request, response) {
  return {
    type: RESPONSE_ACTION,
    request,
    response,
  };
}

export function responseDownloadAction(request, response) {
  return {
    type: RESPONSE_DOWNLOAD_ACTION,
    request,
    response,
  };
}

export function responseDeleteAction(request, response) {
  return {
    type: RESPONSE_DELETE_ACTION,
    request,
    response,
  };
}

export function responseRestoreAction(request, response) {
  return {
    type: RESPONSE_RESTORE_ACTION,
    request,
    response,
  };
}

export function responsePermanentDeleteAction(request, response) {
  return {
    type: RESPONSE_PERMANENT_DELETE_ACTION,
    request,
    response,
  };
}

export function ftpFilesResponseAction(request, response, statusCode) {
  return {
    type: FTPFILES_RESPONSE_ACTION,
    request,
    response,
    statusCode,
  };
}

export function ftpFileResponseAction(request, response, statusCode) {
  return {
    type: FTPFILE_RESPONSE_ACTION,
    request,
    response,
    statusCode,
  };
}

export function resetResultAction() {
  return {
    type: RESET_RESULT_ACTION,
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
