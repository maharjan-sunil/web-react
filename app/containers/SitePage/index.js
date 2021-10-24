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
import saga from './saga';
import Sites from './sites';
import {
  makeSelectSites,
  makeSelectLoader,
  makeSelectError,
  makeSelectStatusCode,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
} from './selectors';
import { reducer } from './reducer';
import {
  getSitesAction,
  filterSitesAction,
  resetStatusCodeAction,
  pageSitesAction,
} from './actions';

export function sitePage({
  onLoad,
  onFilter,
  sites,
  loading,
  error,
  statusCode,
  on401,
  onPage,
  page,
  perPage,
  total,
}) {
  useInjectReducer({ key: 'sitePage', reducer });
  useInjectSaga({ key: 'sitePage', saga });
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
      type: 'text',
      name: 'siteName',
      placeholder: 'Site Name',
      labelText: 'Site',
      defaultValue: '',
    },
    {
      type: 'text',
      name: 'siteUsername',
      placeholder: 'Site Username',
      labelText: 'Username',
      defaultValue: '',
    },
    {
      type: 'text',
      name: 'ftpUsername',
      placeholder: 'FTP Username',
      labelText: 'FTP Username',
      defaultValue: '',
    },
    {
      type: 'text',
      name: 'siteIP',
      placeholder: 'Site IP',
      labelText: 'Site IP',
      defaultValue: '',
    },
    {
      type: 'text',
      name: 'siteFTPIP',
      placeholder: 'FTP IP',
      labelText: 'FTP IP',
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
          pageTitle="Sites"
          isShowFilter={isShowFilter}
          filterText={filterText}
          createUrl="/sites/new"
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
        <Sites
          response={sites}
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

sitePage.propTypes = {
  onFilter: PropTypes.func,
  onLoad: PropTypes.func,
  sites: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  statusCode: PropTypes.number,
  on401: PropTypes.func,
  onPage: PropTypes.func,
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  sites: makeSelectSites(),
  loading: makeSelectLoader(),
  error: makeSelectError(),
  statusCode: makeSelectStatusCode(),
  page: makeSelectPage(),
  perPage: makeSelectPerPage(),
  total: makeSelectTotal(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoad: params => {
      dispatch(getSitesAction(params));
    },
    onFilter: data => {
      dispatch(filterSitesAction(data));
    },
    on401: () => {
      dispatch(resetStatusCodeAction());
    },
    onPage: page => {
      dispatch(pageSitesAction(page));
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
)(sitePage);
