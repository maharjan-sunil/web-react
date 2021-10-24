import React, { useEffect, memo, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Filter } from 'components/Page/Filter';
import { PageHeader } from 'components/Page/PageHeader';
import Body from 'components/Body';
import Paging from 'components/Paging';
import Navbar from 'components/Navbar';
import PageWrapper from 'components/PageWrapper';
import DataConnections from './dataConnections';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectdataconnections,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectStatusCode,
  makeSelectRow,
} from './selectors';
import {
  getFilterDataConnectionAction,
  getDataConnectionsAction,
  resetStatusCodeAction,
  pageDataConnectionAction,
  resetDataConnectionAction,
  selectRowAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  DateFilterType,
  SendDataConnectionType,
  DataConnectionStatusType,
} from './enum';
const key = 'DataConnectionPage';

export function DataConnectionPage({
  onLoad,
  onFilter,
  loading,
  error,
  onPage,
  dataconnections,
  resetDataConnection,
  statusCode,
  on401,
  page,
  perPage,
  total,
  selectedRow,
  onSelectRow,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
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
      placeholder: 'Date Filter Type',
      labelText: 'Date Filter Type',
      selectOptions: DateFilterType,
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
      name: 'awb',
      placeholder: 'AWB',
      labelText: 'AWB',
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
      type: 'text',
      name: 'carrierName',
      placeholder: 'Carrier',
      labelText: 'Carrier',
      defaultValue: '',
    },
    {
      type: 'select',
      name: 'SendDataConnectionType',
      placeholder: 'Send Data Connection Type',
      labelText: 'Send Data Connection Type',
      selectOptions: SendDataConnectionType,
      defaultValue: '0',
    },
    {
      type: 'select',
      name: 'DataConnectionStatusType',
      placeholder: 'Data Connection Status Type',
      labelText: 'Data Connection Status Type',
      selectOptions: DataConnectionStatusType,
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
          pageTitle="Data Connection Report"
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
        <DataConnections
          response={dataconnections}
          loading={loading}
          error={error}
          rowStart={page === 1 ? 1 : (page - 1) * perPage + 1}
          resetDataConnection={resetDataConnection}
          selectedRow={selectedRow}
          onSelectRow={onSelectRow}
        />
        {total > 0 && (
          <Paging page={page} perPage={perPage} total={total} onPage={onPage} />
        )}
      </PageWrapper>
    </React.Fragment>
  );
}
DataConnectionPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  dataconnections: PropTypes.array,
  onLoad: PropTypes.func,
  onFilter: PropTypes.func,
  resetDataConnection: PropTypes.func,
  statusCode: PropTypes.number,
  on401: PropTypes.func,
  page: PropTypes.number,
  onPage: PropTypes.func,
  perPage: PropTypes.number,
  total: PropTypes.number,
  selectedRow: PropTypes.number,
  onSelectRow: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  dataconnections: makeSelectdataconnections(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  page: makeSelectPage(),
  perPage: makeSelectPerPage(),
  total: makeSelectTotal(),
  statusCode: makeSelectStatusCode(),
  selectedRow: makeSelectRow(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoad: params => {
      dispatch(getDataConnectionsAction(params));
    },
    onFilter: data => {
      dispatch(getFilterDataConnectionAction(data));
    },
    on401: () => {
      dispatch(resetStatusCodeAction());
    },
    onPage: page => {
      dispatch(pageDataConnectionAction(page));
    },
    resetDataConnection: (id, index) => {
      dispatch(resetDataConnectionAction(id, index));
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
)(DataConnectionPage);
