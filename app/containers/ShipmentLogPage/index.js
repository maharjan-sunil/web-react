/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState, memo } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Body from 'components/Body';
import Navbar from 'components/Navbar';
import { Filter } from 'components/Page/Filter';
import { PageHeader } from 'components/Page/PageHeader';
import PageWrapper from 'components/PageWrapper';
import Paging from 'components/Paging';

import ShipmentLogs from './ShipmentLogs';
import { StatusFilterType, OperationFilterType } from './enum';
import {
  makeSelectLogs,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectError,
  makeSelectLoading,
  makeSelectStatusCode,
} from './selectors';
import {
  getLogsAction,
  filterLogsAction,
  pageLogsAction,
  resetStatusCodeAction,
  getShipmentLogsRequestAction,
  getShipmentLogsResponseAction,
  selectRowAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';

export function LogPage({
  onLoad,
  onFilter,
  onPage,
  loading,
  error,
  logs,
  statusCode,
  on401,
  page,
  perPage,
  total,
}) {
  useInjectReducer({ key: 'logPage', reducer });
  useInjectSaga({ key: 'logPage', saga });
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
      name: 'product',
      placeholder: 'Transport Product',
      labelText: 'Transport Product',
      defaultValue: '',
    },
    {
      type: 'text',
      name: 'awb',
      placeholder: 'AWB',
      labelText: 'AWB',
      defaultValue: '',
    },
    {
      type: 'select',
      name: 'operation',
      placeholder: 'Operation Filter Type',
      labelText: 'Operation Filter Type',
      selectOptions: OperationFilterType,
      defaultValue: '0',
    },
    {
      type: 'select',
      name: 'status',
      placeholder: 'Status Filter Type',
      labelText: 'Status Filter Type',
      selectOptions: StatusFilterType,
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
          pageTitle="Shipment Log"
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
        <ShipmentLogs
          logs={logs}
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

LogPage.propTypes = {
  onLoad: PropTypes.func,
  onFilter: PropTypes.func,
  onPage: PropTypes.func,
  logs: PropTypes.array,
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  on401: PropTypes.func,
  statusCode: PropTypes.number,
  onRequest: PropTypes.func,
  onResponse: PropTypes.func,
  req: PropTypes.object,
  res: PropTypes.object,
  resetTableRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  logs: makeSelectLogs(),
  page: makeSelectPage(),
  perPage: makeSelectPerPage(),
  total: makeSelectTotal(),
  statusCode: makeSelectStatusCode(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoad: params => {
      dispatch(getLogsAction(params));
    },
    onFilter: data => {
      dispatch(filterLogsAction(data));
    },
    onPage: page => {
      dispatch(pageLogsAction(page));
    },
    on401: () => {
      dispatch(resetStatusCodeAction());
    },
    onRequest: logid => {
      dispatch(getShipmentLogsRequestAction(logid));
    },
    onResponse: logid => {
      dispatch(getShipmentLogsResponseAction(logid));
    },
    onSelectRow: selectedRow => {
      dispatch(selectRowAction(selectedRow));
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
)(LogPage);
