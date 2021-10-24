import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  INSERT_ACTION,
  UPDATE_ACTION,
  DELETE_ACTION,
  RESPONSE_ACTION,
  RESPONSE_DELETE_ACTION,
  SITES_RESPONSE_ACTION,
  SITE_RESPONSE_ACTION,
  RESET_RESULT_ACTION,
  RESET_STATUSCODE_ACTION,
  PAGE_ACTION,
} from './Constants';

export function getSitesAction(filterParams) {
  return {
    type: DEFAULT_ACTION,
    filterParams,
  };
}

export function filterSitesAction(filterParams) {
  return {
    type: FILTER_ACTION,
    filterParams,
  };
}

export function getSiteAction(id) {
  return {
    type: DETAIL_ACTION,
    id,
  };
}

export function insertSiteAction(site) {
  return {
    type: INSERT_ACTION,
    site,
  };
}

export function updateSiteAction(site) {
  return {
    type: UPDATE_ACTION,
    site,
  };
}

export function deleteSiteAction(id) {
  return {
    type: DELETE_ACTION,
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

export function sitesResponseAction(request, response, statusCode) {
  return {
    type: SITES_RESPONSE_ACTION,
    request,
    response,
    statusCode,
  };
}

export function siteResponseAction(request, response, statusCode) {
  return {
    type: SITE_RESPONSE_ACTION,
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

export function pageSitesAction(query) {
  return {
    type: PAGE_ACTION,
    query,
  };
}
