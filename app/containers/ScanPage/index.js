import React, { useEffect, useState, memo } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Filter } from 'components/Page/Filter';
import { PageHeader } from 'components/Page/PageHeader';
import Body from 'components/Body';
import Navbar from 'components/Navbar';
import PageWrapper from 'components/PageWrapper';
import Paging from 'components/Paging';

import {
  getScansAction,
  filterScansAction,
  resetStatusCodeAction,
  pageLogsAction,
} from './actions';
import saga from './saga';
import reducer from './reducer';
import Scans from './scans';
import {
  FilterType,
  SendForScanType,
  UpdateScanType,
  DeliverType,
} from './enum';

import {
  makeSelectScans,
  makeSelectLoading,
  makeSelectError,
  makeSelectStatusCode,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
} from './selectors';

export function ScanPage({
  onLoad,
  onFilter,
  loading,
  error,
  scans,
  statusCode,
  on401,
  page,
  onPage,
  perPage,
  total,
}) {
  useInjectReducer({ key: 'scanPage', reducer });
  useInjectSaga({ key: 'scanPage', saga });
  const params = window.location.href.split('?')[1];
  useEffect(() => {
    onLoad(params);
  }, []);

  const [{ isShowFilter, filterText }, setFilter] = useState({
    isShowFilter: false,
    filterText: 'Show Filter',
  });

  const inputFields = [
    {
      type: 'select',
      name: 'filterType',
      placeholder: 'Filter Type',
      labelText: 'Filter Type',
      selectOptions: FilterType,
      defaultValue: '0',
    },
    {
      type: 'daterange',
      from: {
        name: 'fromDate',
        placeholder: 'From Date',
        defaultValue: '',
      },
      to: {
        name: 'toDate',
        placeholder: 'To Date',
        defaultValue: '',
      },
    },
    {
      type: 'text',
      name: 'siteName',
      placeholder: 'Site',
      labelText: 'Site',
      defaultValue: '',
    },
    {
      type: 'text',
      name: 'carrierName',
      placeholder: 'Carrier',
      labelText: 'Carrier',
      defaultValue: '',
    },
    {
      type: 'text',
      name: 'awb',
      placeholder: 'AWB',
      labelText: 'Awb',
      defaultValue: '',
    },
    {
      type: 'text',
      name: 'accountNumber',
      placeholder: 'Account Number',
      labelText: 'Account Number',
      defaultValue: '',
    },
    {
      type: 'text',
      name: 'searchText',
      placeholder: 'Search Text',
      labelText: 'Search Text',
      defaultValue: '',
    },
    {
      type: 'select',
      name: 'sendForScanType',
      placeholder: 'Scan Type',
      labelText: 'Scan Type',
      selectOptions: SendForScanType,
      defaultValue: '0',
    },
    {
      type: 'select',
      name: 'updateScanType',
      placeholder: 'Update Scan Type',
      labelText: 'Update Scan Type',
      selectOptions: UpdateScanType,
      defaultValue: '0',
    },
    {
      type: 'select',
      name: 'deliverType',
      placeholder: 'Deliver Type',
      labelText: 'Deliver Type',
      selectOptions: DeliverType,
      defaultValue: '0',
    },
  ];

  const toggleFilter = async () => {
    if (isShowFilter) {
      setFilter({
        isShowFilter: false,
        filterText: 'Show Filter',
      });
    } else {
      setFilter({
        isShowFilter: true,
        filterText: 'Hide Filter',
      });
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

  return (
    <React.Fragment>
      <Body />
      <Navbar />
      <PageWrapper>
        <PageHeader
          pageTitle="Scan Report"
          isShowFilter={isShowFilter}
          filterText={filterText}
          handler={toggleFilter}
        />
        <Filter
          isShowFilter={isShowFilter}
          inputFields={inputFields}
          handler={onFilter}
        />

        {total > 0 && (
          <Paging page={page} perPage={perPage} total={total} onPage={onPage} />
        )}
        <Scans
          response={scans}
          loading={loading}
          error={error}
          rowStart={page === 1 ? 1 : (page - 1) * perPage + 1}
        />
        {total > 0 && (
          <Paging page={page} perPage={perPage} total={total} onPage={onPage} />
        )}
      </PageWrapper>
    </React.Fragment>
  );
}

ScanPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  scans: PropTypes.array,
  onLoad: PropTypes.func,
  onFilter: PropTypes.func,
  statusCode: PropTypes.number,
  on401: PropTypes.func,
  onPage: PropTypes.func,
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  scans: makeSelectScans(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  statusCode: makeSelectStatusCode(),
  page: makeSelectPage(),
  perPage: makeSelectPerPage(),
  total: makeSelectTotal(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoad: params => {
      dispatch(getScansAction(params));
    },
    onFilter: data => {
      dispatch(filterScansAction(data));
    },
    on401: () => {
      dispatch(resetStatusCodeAction());
    },
    onPage: page => {
      dispatch(pageLogsAction(page));
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
)(ScanPage);
