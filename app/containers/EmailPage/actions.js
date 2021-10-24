import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  DELETE_ACTION,
  RESTORE_ACTION,
  RESEND_ACTION,
  PERMANENT_DELETE_ACTION,
  RESPONSE_ACTION,
  RESPONSE_DELETE_ACTION,
  RESPONSE_RESTORE_ACTION,
  RESPONSE_RESEND_ACTION,
  EMAILS_RESPONSE_ACTION,
  EMAIL_RESPONSE_ACTION,
  RESPONSE_PERMANENT_DELETE_ACTION,
  RESET_RESULT_ACTION,
  RESET_STATUSCODE_ACTION,
  PAGE_ACTION,
  ROW_SELECT_ACTION,
} from './Constants';

export function getEmailsAction(filterParams) {
  return {
    type: DEFAULT_ACTION,
    filterParams,
  };
}

export function filterEmailsAction(filterParams) {
  return {
    type: FILTER_ACTION,
    filterParams,
  };
}

export function getEmailAction(id) {
  return {
    type: DETAIL_ACTION,
    id,
  };
}

export function deleteEmailAction(id) {
  return {
    type: DELETE_ACTION,
    id,
  };
}

export function restoreEmailAction(id) {
  return {
    type: RESTORE_ACTION,
    id,
  };
}

export function permanentDeleteEmailAction(id) {
  return {
    type: PERMANENT_DELETE_ACTION,
    id,
  };
}

export function resendEmailAction(id) {
  return {
    type: RESEND_ACTION,
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

export function responseResendAction(request, response) {
  return {
    type: RESPONSE_RESEND_ACTION,
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

export function emailsResponseAction(request, response, statusCode) {
  return {
    type: EMAILS_RESPONSE_ACTION,
    request,
    response,
    statusCode,
  };
}

export function emailResponseAction(request, response, statusCode) {
  return {
    type: EMAIL_RESPONSE_ACTION,
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

export function selectRowAction(selectedRow) {
  return {
    type: ROW_SELECT_ACTION,
    selectedRow,
  };
}
