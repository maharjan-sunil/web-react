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

import Users from './users';
import {
  makeSelectUsers,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectLoader,
  makeSelectError,
  makeSelectStatusCode,
} from './selectors';
import { reducer } from './reducer';
import saga from './saga';
import {
  getUsersAction,
  filterUsersAction,
  resetStatusCodeAction,
  pageLogsAction,
} from './actions';

export function userPage({
  onLoad,
  onFilter,
  users,
  loading,
  error,
  statusCode,
  on401,
  page,
  onPage,
  perPage,
  total,
}) {
  useInjectReducer({ key: 'userPage', reducer });
  useInjectSaga({ key: 'userPage', saga });
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
      name: 'name',
      placeholder: 'Name',
      labelText: 'Name',
      defaultValue: '',
    },
    {
      type: 'text',
      name: 'email',
      placeholder: 'Email',
      labelText: 'Email',
      defaultValue: '',
    },
    {
      type: 'text',
      name: 'mobile',
      placeholder: 'Mobile',
      labelText: 'Mobile',
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
          pageTitle="Users"
          isShowFilter={isShowFilter}
          filterText={filterText}
          createUrl="/users/new"
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
        <Users
          response={users}
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

userPage.propTypes = {
  onFilter: PropTypes.func,
  onLoad: PropTypes.func,
  users: PropTypes.array,
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  statusCode: PropTypes.number,
  on401: PropTypes.func,
  onPage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
  page: makeSelectPage(),
  perPage: makeSelectPerPage(),
  total: makeSelectTotal(),
  loading: makeSelectLoader(),
  error: makeSelectError(),
  statusCode: makeSelectStatusCode(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: params => {
      dispatch(getUsersAction(params));
    },
    onFilter: data => {
      dispatch(filterUsersAction(data));
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
)(userPage);
