import React, { useEffect, memo } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import LoaderIndicator from 'components/Loader';
import Body from 'components/Body';
import Navbar from 'components/Navbar';
import PageWrapper, { DetailWrapper } from 'components/PageWrapper';
import { PageHeader } from 'components/Page/PageHeader';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectFile,
  makeSelectStatusCode,
} from 'containers/FileInformationPage/selectors';
import {
  requestDetailAction,
  resetStatusCodeAction,
} from 'containers/FileInformationPage/actions';
import reducer from 'containers/FileInformationPage/reducer';
import saga from 'containers/FileInformationPage/saga';

import {
  InfoDetailWrap,
  InfoDetail,
  InfoDetailRow,
  DetailLabel,
  DetailValue,
} from 'components/Page/StyledDetail';
import { createStructuredSelector } from 'reselect';

function Detail({ match, onLoad, on401, loading, error, statusCode, file }) {
  useInjectReducer({ key: 'fileInformationPage', reducer });
  useInjectSaga({ key: 'fileInformationPage', saga });

  useEffect(() => {
    const { id } = match.params;
    onLoad(id);
  }, []);

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
        <PageHeader pageTitle="File Detail" back="true" />
        <DetailWrapper>
          <FileDetail loading={loading} file={file} />
        </DetailWrapper>
      </PageWrapper>
    </React.Fragment>
  );
}

Detail.propTypes = {
  onLoad: PropTypes.func,
  on401: PropTypes.func,
  match: PropTypes.any,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  statusCode: PropTypes.number,
  file: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  file: makeSelectFile(),
  statusCode: makeSelectStatusCode(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: id => {
      dispatch(requestDetailAction(id));
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
)(Detail);

function FileDetail({ loading, file }) {
  if (loading === true) {
    return (
      <React.Fragment>
        <LoaderIndicator />
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <InfoDetailWrap>
        <InfoDetail>
          <InfoDetailRow>
            <DetailLabel>Original Name</DetailLabel>
            <DetailValue>{file.originalName}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>New Name</DetailLabel>
            <DetailValue>{file.newName}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Creation Datetime</DetailLabel>
            <DetailValue>{file.fileCreationTime}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Collection Datetime</DetailLabel>
            <DetailValue>{file.fileCollectionTime}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Type</DetailLabel>
            <DetailValue>{file.fileType}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Carrier</DetailLabel>
            <DetailValue>{file.carrier}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Status</DetailLabel>
            <DetailValue>
              {file.processed}&nbsp;{file.success}
            </DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Original Path</DetailLabel>
            <DetailValue>{file.originalPath}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Destination Path</DetailLabel>
            <DetailValue>{file.destinationPath}</DetailValue>
          </InfoDetailRow>
        </InfoDetail>
      </InfoDetailWrap>
    </React.Fragment>
  );
}

FileDetail.propTypes = {
  loading: PropTypes.bool,
  file: PropTypes.object,
};
