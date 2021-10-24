import React, { useEffect, memo } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { Row } from '@bootstrap-styled/v4';

import Body from 'components/Body';
import Navbar from 'components/Navbar';
import PageWrapper from 'components/PageWrapper';
import PageTitle from 'components/PageTitle';
import PageTitleText from 'components/PageTitleText';
import GridLayout from 'components/Grid';

import styled from 'styled-components';

import reducer from './reducer';
import saga from './saga';

import {
  requestDailyByMonthAction,
  requestDailyByCurrentWeekAction,
  requestDailyByLastDaysAction,
  requestMonthlyByYearAction,
  requestSiteMonthlySuccessByYearAction,
  requestSiteMonthlyFailureByYearAction,
  resetStatusCodeAction,
  updateReportLayout,
  updateGridDraggable,
} from './actions';
import { makeSelectGridLayouts, makeSelectStatusCode } from './selectors';
import { getMonthNumber } from './tools';
import DashboardMenu from './DashboardMenu';

function HomePage({
  on401,
  dailyByMonth,
  dailyByCurrentWeek,
  dailyByLastDays,
  monthlyByYear,
  siteMonthlySuccessByYear,
  siteMonthlyFailureByYear,
  setReportLayout,
  setGridDraggable,
  gridLayouts,
  statusCode,
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  useEffect(() => {
    gridLayouts.forEach(layout => {
      reportFilter(layout.key, layout.filterValue);
    });
  }, []);

  const reportFilter = async (reportType, value) => {
    switch (reportType) {
      case 'daily-by-month':
        // eslint-disable-next-line no-case-declarations
        const month = getMonthNumber(value);
        dailyByMonth(month);
        break;
      case 'daily-by-current-week':
        dailyByCurrentWeek();
        break;
      case 'daily-by-last-days':
        dailyByLastDays(value);
        break;
      case 'monthly-by-year':
        monthlyByYear(value);
        break;
      case 'site-monthly-success-by-year':
        siteMonthlySuccessByYear(value);
        break;
      case 'site-monthly-failure-by-year':
        siteMonthlyFailureByYear(value);
        break;
      default:
        break;
    }
  };

  if (statusCode === 401) {
    on401();
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            from: `${window.location.pathname}${window.location.search}`,
          },
        }}
      />
    );
  }

  const PageTitleTextHome = styled(PageTitleText)`
    margin-right: 0px !important;
  `;

  function handleReportLayout(reportName, value) {
    setReportLayout(reportName);
    reportFilter(reportName, value);
  }

  function handleGridDraggable(reportName) {
    setGridDraggable(reportName);
  }

  return (
    <React.Fragment>
      <Body />
      <Navbar />
      <PageWrapper>
        <PageTitle>
          <PageTitleTextHome>Dashboard</PageTitleTextHome>
          <DashboardMenu
            gridLayouts={gridLayouts}
            handleReportLayout={handleReportLayout}
          />
        </PageTitle>
        <Row>
          <GridLayout
            gridLayouts={gridLayouts}
            reportFilter={reportFilter}
            handleReportLayout={handleReportLayout}
            handleGridDraggable={handleGridDraggable}
          />
        </Row>
      </PageWrapper>
    </React.Fragment>
  );
}

HomePage.propTypes = {
  on401: PropTypes.func,
  dailyByMonth: PropTypes.func,
  dailyByCurrentWeek: PropTypes.func,
  dailyByLastDays: PropTypes.func,
  monthlyByYear: PropTypes.func,
  siteMonthlySuccessByYear: PropTypes.func,
  siteMonthlyFailureByYear: PropTypes.func,
  setReportLayout: PropTypes.func,
  setGridDraggable: PropTypes.func,
  gridLayouts: PropTypes.array,
  statusCode: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  gridLayouts: makeSelectGridLayouts(),
  statusCode: makeSelectStatusCode(),
});

function mapDispatchToProps(dispatch) {
  return {
    on401: () => {
      dispatch(resetStatusCodeAction());
    },
    dailyByMonth: month => {
      dispatch(requestDailyByMonthAction(month));
    },
    dailyByCurrentWeek: () => {
      dispatch(requestDailyByCurrentWeekAction());
    },
    dailyByLastDays: days => {
      dispatch(requestDailyByLastDaysAction(days));
    },
    monthlyByYear: year => {
      dispatch(requestMonthlyByYearAction(year));
    },
    siteMonthlySuccessByYear: year => {
      dispatch(requestSiteMonthlySuccessByYearAction(year));
    },
    siteMonthlyFailureByYear: year => {
      dispatch(requestSiteMonthlyFailureByYearAction(year));
    },
    setReportLayout: reportName => {
      dispatch(updateReportLayout(reportName));
    },
    setGridDraggable: reportName => {
      dispatch(updateGridDraggable(reportName));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
