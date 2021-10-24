/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import produce from 'immer';
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
} from 'containers/HomePage/Constants';

import { getMonthText } from './tools';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
function getLast5Years() {
  const last5Years = [];
  for (let i = 0; i < 5; i++) {
    last5Years.push(currentYear - i);
  }
  return last5Years;
}

function getMonths() {
  const months = [];
  for (let i = currentMonth; i >= 0; i--) {
    months.push(getMonthText(i));
  }
  return months;
}

export const initialState = {
  gridLayouts: [
    // Daily by month layout & reports.
    {
      key: 'daily-by-month',
      chart: {
        type: 'LineChart',
        title1: 'Daily Shipment Report of',
        title2: `${currentYear}.`,
        hAxisTitle: 'Date',
        vAxisTitle: 'Shipment',
        isStacked: false,
      },
      layout: {
        i: 'daily-by-month',
        x: 0,
        y: 0,
        w: 6,
        h: 3,
        isResizable: false,
        isDraggable: false,
      },
      reports: [],
      loading: true,
      hasFilter: true,
      filterInput: 'dropdown',
      filterData: getMonths(),
      filterValue: getMonthText(currentMonth),
      showReport: true,
    },
    // Daily by current week layout & reports.
    {
      key: 'daily-by-current-week',
      chart: {
        type: 'LineChart',
        title1: 'Daily Shipment Report of Current Week',
        title2: '.',
        hAxisTitle: 'Date',
        vAxisTitle: 'Shipment',
        isStacked: false,
      },
      layout: {
        i: 'daily-by-current-week',
        x: 6,
        y: 0,
        w: 6,
        h: 3,
        isResizable: false,
        isDraggable: false,
      },
      reports: [],
      loading: true,
      hasFilter: false,
      filterInput: '',
      filterData: '',
      filterValue: '',
      showReport: true,
    },
    // Daily by last days layout & reports.
    {
      key: 'daily-by-last-days',
      chart: {
        type: 'LineChart',
        title1: 'Daily Shipment Report of Last',
        title2: 'Days.',
        hAxisTitle: 'Date',
        vAxisTitle: 'Shipment',
        isStacked: false,
      },
      layout: {
        i: 'daily-by-last-days',
        x: 0,
        y: 3,
        w: 6,
        h: 3,
        isResizable: false,
        isDraggable: false,
      },
      reports: [],
      loading: true,
      hasFilter: true,
      filterInput: 'textbox',
      filterData: '',
      filterValue: 7,
      showReport: false,
    },
    // Monthly by year layout & reports.
    {
      key: 'monthly-by-year',
      chart: {
        type: 'BarChart',
        title1: 'Monthly Shipment Report of',
        title2: '.',
        hAxisTitle: 'Shipment',
        vAxisTitle: 'Month',
        isStacked: true,
      },
      layout: {
        i: 'monthly-by-year',
        x: 6,
        y: 3,
        w: 6,
        h: 3,
        isResizable: false,
        isDraggable: false,
      },
      reports: [],
      loading: true,
      hasFilter: true,
      filterInput: 'dropdown',
      filterData: getLast5Years(),
      filterValue: currentYear,
      showReport: false,
    },
    // Site monthly by year layout & reports.
    // TODO
    // {
    //   key: 'site-monthly-by-year',
    //   chart: {
    //     type: 'BarChart',
    //     title: 'Monthly Site Shipment Report of Current Year.',
    //     hAxisTitle: 'Month',
    //     vAxisTitle: 'Shipment',
    //     isStacked: true,
    //   },
    //   layout: { i: 'site-monthly-by-year', x: 0, y: 6, w: 12, h: 3 },
    //   reports: [],
    //   loading: true,
    // },
    // Site monthly success by year layout and reports.
    {
      key: 'site-monthly-success-by-year',
      chart: {
        type: 'LineChart',
        title1: 'Monthly Site Shipment Success Report of',
        title2: '.',
        hAxisTitle: 'Month',
        vAxisTitle: 'Shipment',
        isStacked: false,
      },
      layout: {
        i: 'site-monthly-success-by-year',
        x: 0,
        y: 6,
        w: 6,
        h: 3,
        isResizable: false,
        isDraggable: false,
      },
      reports: [],
      loading: true,
      hasFilter: true,
      filterInput: 'dropdown',
      filterData: getLast5Years(),
      filterValue: currentYear,
      showReport: true,
    },
    // Site monthly failure by year layout and reports.
    {
      key: 'site-monthly-failure-by-year',
      chart: {
        type: 'LineChart',
        title1: 'Monthly Site Shipment Failure Report of',
        title2: '.',
        hAxisTitle: 'Month',
        vAxisTitle: 'Shipment',
        isStacked: false,
      },
      layout: {
        i: 'site-monthly-failure-by-year',
        x: 6,
        y: 6,
        w: 6,
        h: 3,
        isResizable: false,
        isDraggable: false,
      },
      reports: [],
      loading: true,
      hasFilter: true,
      filterInput: 'dropdown',
      filterData: getLast5Years(),
      filterValue: currentYear,
      showReport: true,
    },
  ],
  error: false,
  statusCode: 0,
};

export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DAILY_BY_MONTH_ACTION:
        draft.error = false;
        draft.gridLayouts.forEach(gridLayout => {
          if (gridLayout.key === 'daily-by-month') {
            gridLayout.loading = true;
          }
        });
        break;
      case RESPONSE_DAILY_BY_MONTH_ACTION:
        draft.error = false;
        draft.filterValue = action.request;
        draft.gridLayouts.forEach(gridLayout => {
          if (gridLayout.key === 'daily-by-month') {
            gridLayout.loading = false;
            gridLayout.reports = [['Day', 'Success', 'Failure']];
            action.response.forEach(dailyReportByMonth => {
              gridLayout.reports.push([
                dailyReportByMonth.dayMonthText,
                dailyReportByMonth.success,
                dailyReportByMonth.failure,
              ]);
            });
          }
        });
        break;
      case DAILY_BY_CURRENT_WEEK_ACTION:
        draft.error = false;
        draft.gridLayouts.forEach(gridLayout => {
          if (gridLayout.key === 'daily-by-current-week') {
            gridLayout.loading = true;
          }
        });
        break;
      case RESPONSE_DAILY_BY_CURRENT_WEEK_ACTION:
        draft.error = false;
        draft.gridLayouts.forEach(gridLayout => {
          if (gridLayout.key === 'daily-by-current-week') {
            gridLayout.loading = false;
            gridLayout.reports = [['Day', 'Success', 'Failure']];
            action.response.forEach(dailyReportByCurrentWeek => {
              gridLayout.reports.push([
                dailyReportByCurrentWeek.dayMonthText,
                dailyReportByCurrentWeek.success,
                dailyReportByCurrentWeek.failure,
              ]);
            });
          }
        });
        break;
      case DAILY_BY_LAST_DAYS_ACTION:
        draft.error = false;
        draft.gridLayouts.forEach(gridLayout => {
          if (gridLayout.key === 'daily-by-last-days') {
            gridLayout.loading = true;
          }
        });
        break;
      case RESPONSE_DAILY_BY_LAST_DAYS_ACTION:
        draft.error = false;
        draft.filterValue = action.request;
        draft.gridLayouts.forEach(gridLayout => {
          if (gridLayout.key === 'daily-by-last-days') {
            gridLayout.loading = false;
            gridLayout.reports = [['Day', 'Success', 'Failure']];
            action.response.forEach(dailyReportByLastDays => {
              gridLayout.reports.push([
                dailyReportByLastDays.dayMonthText,
                dailyReportByLastDays.success,
                dailyReportByLastDays.failure,
              ]);
            });
          }
        });
        break;
      case MONTHLY_BY_YEAR_ACTION:
        draft.error = false;
        draft.gridLayouts.forEach(gridLayout => {
          if (gridLayout.key === 'monthly-by-year') {
            gridLayout.loading = true;
          }
        });
        break;
      case RESPONSE_MONTHLY_BY_YEAR_ACTION:
        draft.error = false;
        draft.filterValue = action.request;
        draft.gridLayouts.forEach(gridLayout => {
          if (gridLayout.key === 'monthly-by-year') {
            gridLayout.loading = false;
            gridLayout.reports = [['Day', 'Success', 'Failure']];
            action.response.forEach(monthlyReportByYear => {
              gridLayout.reports.push([
                monthlyReportByYear.monthText,
                monthlyReportByYear.success,
                monthlyReportByYear.failure,
              ]);
            });
          }
        });
        break;
      case SITE_MONTHLY_BY_YEAR_ACTION:
        draft.error = false;
        draft.gridLayouts.forEach(gridLayout => {
          if (gridLayout.key === 'site-monthly-by-year') {
            gridLayout.loading = true;
          }
        });
        break;
      case RESPONSE_SITE_MONTHLY_BY_YEAR_ACTION:
        draft.error = false;
        draft.filterValue = action.request;
        draft.gridLayouts.forEach(gridLayout => {
          if (gridLayout.key === 'site-monthly-by-year') {
            gridLayout.loading = false;
            gridLayout.reports = [['Site', 'Success', 'Failure']];
            action.response.forEach(monthlySiteReportByYear => {
              gridLayout.reports.push([
                monthlySiteReportByYear.siteName,
                monthlySiteReportByYear.reports.length,
                monthlySiteReportByYear.reports.length,
              ]);
            });
          }
        });
        break;
      case SITE_MONTHLY_SUCCESS_BY_YEAR_ACTION:
        draft.error = false;
        draft.gridLayouts.forEach(gridLayout => {
          if (gridLayout.key === 'site-monthly-success-by-year') {
            gridLayout.loading = true;
          }
        });
        break;
      case RESPONSE_SITE_MONTHLY_SUCCESS_BY_YEAR_ACTION:
        draft.error = false;
        draft.filterValue = action.request;
        draft.gridLayouts.forEach(gridLayout => {
          if (gridLayout.key === 'site-monthly-success-by-year') {
            gridLayout.loading = false;
            const sites = ['Month'];
            if (action.response) {
              action.response[0].shipmentReportSites.forEach(site => {
                sites.push(site.siteName);
              });
              gridLayout.reports = [sites];
              action.response.forEach(siteSuccessReport => {
                const recordRow = [siteSuccessReport.monthText];
                siteSuccessReport.shipmentReportSites.forEach(site => {
                  recordRow.push(site.total);
                });
                gridLayout.reports.push(recordRow);
              });
            }
          }
        });
        break;
      case SITE_MONTHLY_FAILURE_BY_YEAR_ACTION:
        draft.error = false;
        draft.gridLayouts.forEach(gridLayout => {
          if (gridLayout.key === 'site-monthly-failure-by-year') {
            gridLayout.loading = true;
          }
        });
        break;
      case RESPONSE_SITE_MONTHLY_FAILURE_BY_YEAR_ACTION:
        draft.error = false;
        draft.filterValue = action.request;
        draft.gridLayouts.forEach(gridLayout => {
          if (gridLayout.key === 'site-monthly-failure-by-year') {
            gridLayout.loading = false;
            const sites = ['Month'];
            if (action.response) {
              action.response[0].shipmentReportSites.forEach(site => {
                sites.push(site.siteName);
              });
              gridLayout.reports = [sites];
              action.response.forEach(siteSuccessReport => {
                const recordRow = [siteSuccessReport.monthText];
                siteSuccessReport.shipmentReportSites.forEach(site => {
                  recordRow.push(site.total);
                });
                gridLayout.reports.push(recordRow);
              });
            }
          }
        });
        break;
      case UPDATE_REPORT_LAYOUT:
        draft.gridLayouts.forEach(gridLayout => {
          if (gridLayout.key === action.reportName) {
            if (gridLayout.showReport === true) {
              gridLayout.showReport = false;
            } else if (gridLayout.showReport === false) {
              gridLayout.showReport = true;
            }
          }
        });
        break;
      case UPDATE_GRID_DRAGGABLE:
        draft.gridLayouts.forEach(gridLayout => {
          if (gridLayout.key === action.reportName) {
            if (gridLayout.layout.isDraggable === true) {
              gridLayout.layout.isDraggable = false;
            } else if (gridLayout.layout.isDraggable === false) {
              gridLayout.layout.isDraggable = true;
            }
          }
        });
        break;
      case RESET_STATUSCODE_ACTION:
        draft.error = false;
        draft.statusCode = 0;
        break;
      default:
        draft.error = true;
        break;
    }
  });

export default reducer;
