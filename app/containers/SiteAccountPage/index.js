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
import SiteAccounts from './siteAccounts';
import {
  makeSelectSiteAccounts,
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
  getSiteAccountsAction,
  filterSiteAccountsAction,
  resetStatusCodeAction,
  pageSiteAccountsAction,
} from './actions';

export function SiteAccountPage({
  onLoad,
  onFilter,
  siteAccounts,
  loading,
  error,
  statusCode,
  on401,
  onPage,
  page,
  perPage,
  total,
}) {
  useInjectReducer({ key: 'siteAccountPage', reducer });
  useInjectSaga({ key: 'siteAccountPage', saga });
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
      name: 'accountNumber',
      placeholder: 'Account Number',
      labelText: 'Account Number',
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
          pageTitle="Site Accounts"
          isShowFilter={isShowFilter}
          filterText={filterText}
          createUrl="/site-accounts/new"
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
        <SiteAccounts
          response={siteAccounts}
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

SiteAccountPage.propTypes = {
  onFilter: PropTypes.func,
  onLoad: PropTypes.func,
  siteAccounts: PropTypes.array,
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
  siteAccounts: makeSelectSiteAccounts(),
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
      dispatch(getSiteAccountsAction(params));
    },
    onFilter: data => {
      dispatch(filterSiteAccountsAction(data));
    },
    on401: () => {
      dispatch(resetStatusCodeAction());
    },
    onPage: page => {
      dispatch(pageSiteAccountsAction(page));
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
)(SiteAccountPage);
