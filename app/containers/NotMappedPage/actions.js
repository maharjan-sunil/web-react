import {
  FILTER_ACTION,
  PAGE_ACTION,
  NOTMAPPED_RESPONSE_ACTION,
} from './Constants';
export function getFilterNotMappedAction(filterData) {
  return { type: FILTER_ACTION, filterData };
}
export function pageNotMappedAction(query) {
  return {
    type: PAGE_ACTION,
    query,
  };
}
export function NotMappedResponseAction(request, response, statusCode) {
  return {
    type: NOTMAPPED_RESPONSE_ACTION,
    request,
    response,
    statusCode,
  };
}
