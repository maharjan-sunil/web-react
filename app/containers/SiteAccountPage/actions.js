import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  INSERT_ACTION,
  UPDATE_ACTION,
  DELETE_ACTION,
  RESTORE_ACTION,
  PERMANENT_DELETE_ACTION,
  CREATE_SELECT_LIST_ACTION,
  RESPONSE_ACTION,
  RESPONSE_DELETE_ACTION,
  RESPONSE_RESTORE_ACTION,
  SITEACCOUNTS_RESPONSE_ACTION,
  SITEACCOUNT_RESPONSE_ACTION,
  RESPONSE_PERMANENT_DELETE_ACTION,
  RESPONSE_CREATE_SELECT_LIST_ACTION,
  RESET_RESULT_ACTION,
  RESET_STATUSCODE_ACTION,
  PAGE_ACTION,
} from './Constants';

export function getSiteAccountsAction(filterParams) {
  return {
    type: DEFAULT_ACTION,
    filterParams,
  };
}

export function filterSiteAccountsAction(filterParams) {
  return {
    type: FILTER_ACTION,
    filterParams,
  };
}

export function getSiteAccountAction(id) {
  return {
    type: DETAIL_ACTION,
    id,
  };
}

export function insertSiteAccountAction(siteAccount) {
  return {
    type: INSERT_ACTION,
    siteAccount,
  };
}

export function updateSiteAccountAction(siteAccount) {
  return {
    type: UPDATE_ACTION,
    siteAccount,
  };
}

export function deleteSiteAccountAction(id) {
  return {
    type: DELETE_ACTION,
    id,
  };
}

export function restoreSiteAccountAction(id) {
  return {
    type: RESTORE_ACTION,
    id,
  };
}

export function permanentDeleteSiteAccountAction(id) {
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

export function siteAccountsResponseAction(request, response, statusCode) {
  return {
    type: SITEACCOUNTS_RESPONSE_ACTION,
    request,
    response,
    statusCode,
  };
}

export function siteAccountResponseAction(request, response, statusCode) {
  return {
    type: SITEACCOUNT_RESPONSE_ACTION,
    request,
    response,
    statusCode,
  };
}

export function getCreateSelectListAction() {
  return {
    type: CREATE_SELECT_LIST_ACTION,
  };
}

export function responseCreateSelectListAction(request, response) {
  return {
    type: RESPONSE_CREATE_SELECT_LIST_ACTION,
    request,
    response,
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

export function pageSiteAccountsAction(query) {
  return {
    type: PAGE_ACTION,
    query,
  };
}
