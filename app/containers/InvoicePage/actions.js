import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  REVIEW_ACTION,
  RESEND_ACTION,
  REVALIDATE_ACTION,
  DELETE_ACTION,
  RESTORE_ACTION,
  PERMANENT_DELETE_ACTION,
  RESPONSE_ACTION,
  RESPONSE_DELETE_ACTION,
  RESPONSE_RESTORE_ACTION,
  INVOICES_RESPONSE_ACTION,
  INVOICE_RESPONSE_ACTION,
  RESPONSE_PERMANENT_DELETE_ACTION,
  RESET_RESULT_ACTION,
  RESET_STATUSCODE_ACTION,
  PAGE_ACTION,
  DOWNLOAD_ACTION,
  RESPONSE_DOWNLOAD_ACTION,
} from './Constants';

export function getInvoicesAction(filterParams) {
  return {
    type: DEFAULT_ACTION,
    filterParams,
  };
}

export function filterInvoicesAction(filterParams) {
  return {
    type: FILTER_ACTION,
    filterParams,
  };
}

export function getInvoiceAction(id) {
  return {
    type: DETAIL_ACTION,
    id,
  };
}

export function reviewInvoiceAction(id) {
  return {
    type: REVIEW_ACTION,
    id,
  };
}

export function resendInvoiceAction(id) {
  return {
    type: RESEND_ACTION,
    id,
  };
}

export function revalidateInvoiceAction(id) {
  return {
    type: REVALIDATE_ACTION,
    id,
  };
}
export function downloadInvoiceAction(id) {
  return {
    type: DOWNLOAD_ACTION,
    id,
  };
}

export function deleteInvoiceAction(id) {
  return {
    type: DELETE_ACTION,
    id,
  };
}

export function restoreInvoiceAction(id) {
  return {
    type: RESTORE_ACTION,
    id,
  };
}

export function permanentDeleteInvoiceAction(id) {
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

export function invoicesResponseAction(request, response, statusCode) {
  return {
    type: INVOICES_RESPONSE_ACTION,
    request,
    response,
    statusCode,
  };
}

export function invoiceResponseAction(request, response, statusCode) {
  return {
    type: INVOICE_RESPONSE_ACTION,
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
