import React, { useEffect, useState, memo } from 'react';
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

import FTPFiles from 'containers/FTPFilePage/FTPFiles';
import { FTPFileStatus } from './enum';

import {
  getFTPFilesAction,
  filterFTPFilesAction,
  pageLogsAction,
} from './actions';
import {
  makeSelectFTPFiles,
  makeSelectLoader,
  makeSelectError,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
} from './selectors';
import { reducer } from './reducer';
import saga from './saga';

function FTPFilePage({
  onFilter,
  onLoad,
  onPage,
  ftpFiles,
  loading,
  error,
  page,
  perPage,
  total,
}) {
  useInjectReducer({ key: 'ftpFilePage', reducer });
  useInjectSaga({ key: 'ftpFilePage', saga });
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
      name: 'name',
      placeholder: 'File Name',
      labelText: 'File Name',
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
      name: 'carrier',
      placeholder: 'Carrier',
      labelText: 'Carrier',
      defaultValue: '',
    },
    {
      type: 'text',
      name: 'product',
      placeholder: 'Product',
      labelText: 'Product',
      defaultValue: '',
    },
    {
      type: 'select',
      name: 'status',
      placeholder: 'File Status',
      labelText: 'File Status',
      selectOptions: FTPFileStatus,
      defaultValue: '0',
    },
    {
      type: 'text',
      name: 'taskName',
      placeholder: 'Task Name',
      labelText: 'Task Name',
      note: '(at least 3 characters)',
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

  return (
    <React.Fragment>
      <Body />
      <Navbar />
      <PageWrapper>
        <PageHeader
          pageTitle="FTP Files"
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
        <FTPFiles
          ftpFiles={ftpFiles}
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

FTPFilePage.propTypes = {
  onFilter: PropTypes.func,
  onLoad: PropTypes.func,
  onPage: PropTypes.func,
  ftpFiles: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  ftpFiles: makeSelectFTPFiles(),
  loading: makeSelectLoader(),
  error: makeSelectError(),
  page: makeSelectPage(),
  perPage: makeSelectPerPage(),
  total: makeSelectTotal(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: params => {
      dispatch(getFTPFilesAction(params));
    },
    onFilter: data => {
      dispatch(filterFTPFilesAction(data));
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
)(FTPFilePage);
