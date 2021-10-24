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
import { reducer } from './reducer';
import saga from './saga';
import {
  getEmailsAction,
  filterEmailsAction,
  resetStatusCodeAction,
  pageLogsAction,
} from './actions';
import Emails from './emails';
import {
  makeSelectEmails,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectLoader,
  makeSelectError,
  makeSelectStatusCode,
} from './selectors';
import { EmailType, EmailStatus } from './enum';

export function emailPage({
  onLoad,
  onFilter,
  emails,
  loading,
  error,
  statusCode,
  on401,
  page,
  onPage,
  perPage,
  total,
}) {
  useInjectReducer({ key: 'emailPage', reducer });
  useInjectSaga({ key: 'emailPage', saga });
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
      placeholder: 'Site ',
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
      name: 'subject',
      placeholder: 'Subject',
      labelText: 'Subject',
      defaultValue: '',
    },
    {
      type: 'select',
      name: 'status',
      placeholder: 'emailStatus',
      labelText: 'Email Status',
      selectOptions: EmailStatus,
      defaultValue: '0',
    },
    {
      type: 'select',
      name: 'type',
      placeholder: 'EmailTypes',
      labelText: 'Email Types',
      selectOptions: EmailType,
      defaultValue: '0',
    },
    {
      type: 'checkbox',
      name: 'isDeleted',
      placeholder: 'Get Deleted',
      labelText: 'Get Deleted',
      checked: '',
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
          pageTitle="Emails"
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
        <Emails
          response={emails}
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

emailPage.propTypes = {
  onFilter: PropTypes.func,
  onLoad: PropTypes.func,
  emails: PropTypes.array,
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
  emails: makeSelectEmails(),
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
      dispatch(getEmailsAction(params));
    },
    onFilter: data => {
      dispatch(filterEmailsAction(data));
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
)(emailPage);
