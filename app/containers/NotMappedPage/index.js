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
import NotMapped from './NotMapped';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectNotMapped,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectStatusCode,
} from './selectors';
import { getFilterNotMappedAction, pageNotMappedAction } from './actions';

import reducer from './reducer';
import saga from './saga';

const key = 'NotMappedPage';

export function NotMappedPage({
  onFilter,
  loading,
  error,
  notMapped,
  onPage,
  statusCode,
  on401,
  page,
  perPage,
  total,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const params = window.location.href.split('/')[1];
  useEffect(() => {
    onFilter(params);
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
      name: 'carrierName',
      placeholder: 'Carrier',
      labelText: 'Carrier',
      defaultValue: '',
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
          pageTitle="Not Mapped Report"
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
        <NotMapped
          response={notMapped}
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
NotMappedPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  notMapped: PropTypes.array,
  onFilter: PropTypes.func,
  statusCode: PropTypes.number,
  on401: PropTypes.func,
  page: PropTypes.number,
  onPage: PropTypes.func,
  perPage: PropTypes.number,
  total: PropTypes.number,
};
const mapStateToProps = createStructuredSelector({
  notMapped: makeSelectNotMapped(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  page: makeSelectPage(),
  perPage: makeSelectPerPage(),
  total: makeSelectTotal(),
  statusCode: makeSelectStatusCode(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onFilter: params => {
      dispatch(getFilterNotMappedAction(params));
    },
    onPage: page => {
      dispatch(pageNotMappedAction(page));
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
)(NotMappedPage);
