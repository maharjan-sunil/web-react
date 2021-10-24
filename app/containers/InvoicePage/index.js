/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, memo } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import Body from 'components/Body';
import Navbar from 'components/Navbar';
import PageWrapper from 'components/PageWrapper';
import { Filter } from 'components/Page/Filter';
import { PageHeader } from 'components/Page/PageHeader';
import Paging from 'components/Paging';
import Invoices from 'containers/InvoicePage/Invoices';

import {
  makeSelectInvoices,
  makeSelectLoader,
  makeSelectError,
  makeSelectStatusCode,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
} from './selectors';
import { reducer } from './reducer';
import saga from './saga';
import {
  getInvoicesAction,
  filterInvoicesAction,
  resetStatusCodeAction,
  pageLogsAction,
} from './actions';
import { StatusFilterType } from './enum';
export function InvoicePage({
  onLoad,
  onFilter,
  invoices,
  loading,
  error,
  statusCode,
  on401,
  page,
  perPage,
  total,
  onPage,
}) {
  useInjectReducer({ key: 'invoicePage', reducer });
  useInjectSaga({ key: 'invoicePage', saga });
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
        name: 'pickupDateFrom',
        placeholder: 'From Date',
        defaultValue: '',
      },
      to: {
        name: 'pickupDateTo',
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
      name: 'fileName',
      placeholder: 'File Name',
      labelText: 'File Name',
      defaultValue: '',
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
          pageTitle="Invoices"
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
        <Invoices
          response={invoices}
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

InvoicePage.propTypes = {
  onFilter: PropTypes.func,
  onLoad: PropTypes.func,
  invoices: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  statusCode: PropTypes.number,
  on401: PropTypes.func,
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  onPage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  invoices: makeSelectInvoices(),
  loading: makeSelectLoader(),
  error: makeSelectError(),
  statusCode: makeSelectStatusCode(),
  page: makeSelectPage(),
  perPage: makeSelectPerPage(),
  total: makeSelectTotal(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: params => {
      dispatch(getInvoicesAction(params));
    },
    onFilter: data => {
      dispatch(filterInvoicesAction(data));
    },
    onPage: page => {
      dispatch(pageLogsAction(page));
    },
    on401: () => {
      dispatch(resetStatusCodeAction());
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
)(InvoicePage);
