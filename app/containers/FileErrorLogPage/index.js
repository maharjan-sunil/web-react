import React, { useEffect, useState, memo } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectFileErrors,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectStatusCode,
  makeSelectRow,
  makeSelectResult,
} from 'containers/FileErrorLogPage/selectors';
import {
  requestDefaultAction,
  requestFilterAction,
  requestPageAction,
  resetStatusCodeAction,
  requestDeleteAction,
  selectRowAction,
} from 'containers/FileErrorLogPage/actions';
import reducer from 'containers/FileErrorLogPage/reducer';
import saga from 'containers/FileErrorLogPage/saga';

import { Filter } from 'components/Page/Filter';
import { PageHeader } from 'components/Page/PageHeader';
import Body from 'components/Body';
import Paging from 'components/Paging';
import Navbar from 'components/Navbar';
import PageWrapper from 'components/PageWrapper';

import FileErrors from 'containers/FileErrorLogPage/FileErrorLogs';

function FileErrorLogPage({
  onLoad,
  onFilter,
  onPage,
  on401,
  onSelectRow,
  onDelete,
  result,
  page,
  perPage,
  total,
  loading,
  error,
  statusCode,
  fileErrors,
  selectedRow,
}) {
  useInjectReducer({ key: 'fileErrorLogPage', reducer });
  useInjectSaga({ key: 'fileErrorLogPage', saga });

  useEffect(() => {
    const params = window.location.href.split('?')[1];
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
      name: 'awb',
      placeholder: 'AWB',
      labelText: 'AWB',
      defaultValue: '',
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
      placeholder: 'File',
      labelText: 'File',
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

  if (statusCode === 401 || error === true) {
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
          pageTitle="File Error Log"
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
        <FileErrors
          loading={loading}
          records={fileErrors}
          rowStart={page === 1 ? 1 : (page - 1) * perPage + 1}
          selectedRow={selectedRow}
          onSelectRow={onSelectRow}
          onDelete={onDelete}
          result={result}
        />
        {total > 0 && (
          <Paging page={page} perPage={perPage} total={total} onPage={onPage} />
        )}
      </PageWrapper>
    </React.Fragment>
  );
}

FileErrorLogPage.propTypes = {
  onLoad: PropTypes.func,
  onFilter: PropTypes.func,
  onPage: PropTypes.func,
  on401: PropTypes.func,
  onDelete: PropTypes.func,
  onSelectRow: PropTypes.func,
  result: PropTypes.number,
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  statusCode: PropTypes.number,
  fileErrors: PropTypes.array,
  selectedRow: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  statusCode: makeSelectStatusCode(),
  page: makeSelectPage(),
  perPage: makeSelectPerPage(),
  total: makeSelectTotal(),
  selectedRow: makeSelectRow(),
  fileErrors: makeSelectFileErrors(),
  result: makeSelectResult(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: params => {
      dispatch(requestDefaultAction(params));
    },
    onFilter: data => {
      dispatch(requestFilterAction(data));
    },
    onPage: data => {
      dispatch(requestPageAction(data));
    },
    on401: () => {
      dispatch(resetStatusCodeAction());
    },
    onSelectRow: selectedRow => {
      dispatch(selectRowAction(selectedRow));
    },
    onDelete: errorId => {
      dispatch(requestDeleteAction(errorId));
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
)(FileErrorLogPage);
