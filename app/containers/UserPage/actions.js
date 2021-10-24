import {
  DEFAULT_ACTION,
  FILTER_ACTION,
  DETAIL_ACTION,
  INSERT_ACTION,
  UPDATE_ACTION,
  DELETE_ACTION,
  RESTORE_ACTION,
  PERMANENT_DELETE_ACTION,
  RESPONSE_ACTION,
  RESPONSE_DELETE_ACTION,
  RESPONSE_RESTORE_ACTION,
  USERS_RESPONSE_ACTION,
  USER_RESPONSE_ACTION,
  RESPONSE_PERMANENT_DELETE_ACTION,
  RESET_RESULT_ACTION,
  RESET_STATUSCODE_ACTION,
  USER_PROFILE_ACTION,
  PAGE_ACTION,
  ROW_SELECT_ACTION,
} from './Constants';

export function getUsersAction(filterParams) {
  return {
    type: DEFAULT_ACTION,
    filterParams,
  };
}

export function filterUsersAction(filterParams) {
  return {
    type: FILTER_ACTION,
    filterParams,
  };
}

export function getUserAction(id) {
  return {
    type: DETAIL_ACTION,
    id,
  };
}

export function insertUserAction(user) {
  return {
    type: INSERT_ACTION,
    user,
  };
}

export function updateUserAction(user) {
  return {
    type: UPDATE_ACTION,
    user,
  };
}

export function deleteUserAction(id) {
  return {
    type: DELETE_ACTION,
    id,
  };
}

export function restoreUserAction(id) {
  return {
    type: RESTORE_ACTION,
    id,
  };
}

export function permanentDeleteUserAction(id) {
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

export function usersResponseAction(request, response, statusCode) {
  return {
    type: USERS_RESPONSE_ACTION,
    request,
    response,
    statusCode,
  };
}

export function userResponseAction(request, response, statusCode) {
  return {
    type: USER_RESPONSE_ACTION,
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

export function getUserProfileAction() {
  return {
    type: USER_PROFILE_ACTION,
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
