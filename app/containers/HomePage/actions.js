import {
  DAILY_BY_MONTH_ACTION,
  RESPONSE_DAILY_BY_MONTH_ACTION,
  DAILY_BY_CURRENT_WEEK_ACTION,
  RESPONSE_DAILY_BY_CURRENT_WEEK_ACTION,
  DAILY_BY_LAST_DAYS_ACTION,
  RESPONSE_DAILY_BY_LAST_DAYS_ACTION,
  MONTHLY_BY_YEAR_ACTION,
  RESPONSE_MONTHLY_BY_YEAR_ACTION,
  SITE_MONTHLY_BY_YEAR_ACTION,
  RESPONSE_SITE_MONTHLY_BY_YEAR_ACTION,
  SITE_MONTHLY_SUCCESS_BY_YEAR_ACTION,
  RESPONSE_SITE_MONTHLY_SUCCESS_BY_YEAR_ACTION,
  SITE_MONTHLY_FAILURE_BY_YEAR_ACTION,
  RESPONSE_SITE_MONTHLY_FAILURE_BY_YEAR_ACTION,
  RESET_STATUSCODE_ACTION,
  UPDATE_REPORT_LAYOUT,
  UPDATE_GRID_DRAGGABLE,
} from './Constants';

export function requestDailyByMonthAction(month) {
  return {
    type: DAILY_BY_MONTH_ACTION,
    month,
  };
}

export function responseDailyByMonthAction(request, response, statusCode) {
  return {
    type: RESPONSE_DAILY_BY_MONTH_ACTION,
    request,
    response,
    statusCode,
  };
}

export function requestDailyByCurrentWeekAction() {
  return {
    type: DAILY_BY_CURRENT_WEEK_ACTION,
  };
}

export function responseDailyByCurrentWeekAction(response, statusCode) {
  return {
    type: RESPONSE_DAILY_BY_CURRENT_WEEK_ACTION,
    response,
    statusCode,
  };
}

export function requestDailyByLastDaysAction(days) {
  return {
    type: DAILY_BY_LAST_DAYS_ACTION,
    days,
  };
}

export function responseDailyByLastDaysAction(request, response, statusCode) {
  return {
    type: RESPONSE_DAILY_BY_LAST_DAYS_ACTION,
    request,
    response,
    statusCode,
  };
}

export function requestMonthlyByYearAction(year) {
  return {
    type: MONTHLY_BY_YEAR_ACTION,
    year,
  };
}

export function responseMonthlyByYearAction(request, response, statusCode) {
  return {
    type: RESPONSE_MONTHLY_BY_YEAR_ACTION,
    request,
    response,
    statusCode,
  };
}

export function requestSiteMonthlyByYearAction(year) {
  return {
    type: SITE_MONTHLY_BY_YEAR_ACTION,
    year,
  };
}

export function responseSiteMonthlyByYearAction(request, response, statusCode) {
  return {
    type: RESPONSE_SITE_MONTHLY_BY_YEAR_ACTION,
    request,
    response,
    statusCode,
  };
}

export function requestSiteMonthlySuccessByYearAction(year) {
  return {
    type: SITE_MONTHLY_SUCCESS_BY_YEAR_ACTION,
    year,
  };
}

export function responseSiteMonthlySuccessByYearAction(
  request,
  response,
  statusCode,
) {
  return {
    type: RESPONSE_SITE_MONTHLY_SUCCESS_BY_YEAR_ACTION,
    request,
    response,
    statusCode,
  };
}

export function requestSiteMonthlyFailureByYearAction(year) {
  return {
    type: SITE_MONTHLY_FAILURE_BY_YEAR_ACTION,
    year,
  };
}

export function responseSiteMonthlyFailureByYearAction(
  request,
  response,
  statusCode,
) {
  return {
    type: RESPONSE_SITE_MONTHLY_FAILURE_BY_YEAR_ACTION,
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

export function updateReportLayout(reportName) {
  return {
    type: UPDATE_REPORT_LAYOUT,
    reportName,
  };
}

export function updateGridDraggable(reportName) {
  return {
    type: UPDATE_GRID_DRAGGABLE,
    reportName,
  };
}
