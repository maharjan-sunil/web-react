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
  makeSelectContentLoading,
  makeSelectError,
  makeSelectFiles,
  makeSelectPage,
  makeSelectPerPage,
  makeSelectTotal,
  makeSelectStatusCode,
  makeSelectRow,
  makeSelectFileContent,
} from 'containers/FileInformationPage/selectors';
import {
  requestFilesAction,
  requestFilterAction,
  requestFilePageAction,
  requestFileContentAction,
  resetStatusCodeAction,
  selectRowAction,
} from 'containers/FileInformationPage/actions';
import reducer from 'containers/FileInformationPage/reducer';
import saga from 'containers/FileInformationPage/saga';

import { Filter } from 'components/Page/Filter';
import { PageHeader } from 'components/Page/PageHeader';
import Body from 'components/Body';
import Paging from 'components/Paging';
import Navbar from 'components/Navbar';
import PageWrapper from 'components/PageWrapper';

import Files from 'containers/FileInformationPage/Files';
function FileInformationPage({
  onLoad,
  onFilter,
  onPage,
  onContent,
  on401,
  onSelectRow,
  page,
  perPage,
  total,
  loading,
  contentLoading,
  error,
  statusCode,
  files,
  fileContent,
  selectedRow,
}) {
  useInjectReducer({ key: 'fileInformationPage', reducer });
  useInjectSaga({ key: 'fileInformationPage', saga });

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
          pageTitle="File Information"
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
        <Files
          loading={loading}
          contentLoading={contentLoading}
          records={files}
          rowStart={page === 1 ? 1 : (page - 1) * perPage + 1}
          selectedRow={selectedRow}
          onSelectRow={onSelectRow}
          onContent={onContent}
          fileContent={fileContent}
        />
        {total > 0 && (
          <Paging page={page} perPage={perPage} total={total} onPage={onPage} />
        )}
      </PageWrapper>
    </React.Fragment>
  );
}

FileInformationPage.propTypes = {
  onLoad: PropTypes.func,
  onFilter: PropTypes.func,
  onPage: PropTypes.func,
  onContent: PropTypes.func,
  on401: PropTypes.func,
  onSelectRow: PropTypes.func,
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  statusCode: PropTypes.number,
  files: PropTypes.array,
  contentLoading: PropTypes.bool,
  fileContent: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  selectedRow: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  contentLoading: makeSelectContentLoading(),
  error: makeSelectError(),
  files: makeSelectFiles(),
  statusCode: makeSelectStatusCode(),
  page: makeSelectPage(),
  perPage: makeSelectPerPage(),
  total: makeSelectTotal(),
  selectedRow: makeSelectRow(),
  fileContent: makeSelectFileContent(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: params => {
      dispatch(requestFilesAction(params));
    },
    onFilter: data => {
      dispatch(requestFilterAction(data));
    },
    onPage: data => {
      dispatch(requestFilePageAction(data));
    },
    onContent: fileId => {
      dispatch(requestFileContentAction(fileId));
    },
    on401: () => {
      dispatch(resetStatusCodeAction());
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
)(FileInformationPage);
