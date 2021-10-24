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
  makeSelectFileError,
  makeSelectStatusCode,
} from 'containers/FileErrorLogPage/selectors';
import {
  requestDetailAction,
  resetStatusCodeAction,
} from 'containers/FileErrorLogPage/actions';
import reducer from 'containers/FileErrorLogPage/reducer';
import saga from 'containers/FileErrorLogPage/saga';

import {
  InfoDetailWrap,
  InfoDetail,
  InfoDetailRow,
  DetailLabel,
  DetailValue,
} from 'components/Page/StyledDetail';
import { createStructuredSelector } from 'reselect';

function Detail({
  match,
  onLoad,
  on401,
  loading,
  error,
  statusCode,
  fileError,
}) {
  useInjectReducer({ key: 'fileErrorLogPage', reducer });
  useInjectSaga({ key: 'fileErrorLogPage', saga });

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
        <PageHeader pageTitle="File Error Log Detail" back="true" />
        <DetailWrapper>
          <FileDetail loading={loading} fileError={fileError} />
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
  fileError: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  fileError: makeSelectFileError(),
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

function FileDetail({ loading, fileError }) {
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
            <DetailLabel>File</DetailLabel>
            <DetailValue>{fileError.fileName}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Site</DetailLabel>
            <DetailValue>{fileError.siteName}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Carrier</DetailLabel>
            <DetailValue>{fileError.carrierName}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Product</DetailLabel>
            <DetailValue>{fileError.productName}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>AWB</DetailLabel>
            <DetailValue>{fileError.awb}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Status</DetailLabel>
            <DetailValue>
              {fileError.processed}&nbsp;{fileError.success}
            </DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Log Date</DetailLabel>
            <DetailValue>{fileError.logDate}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Exception</DetailLabel>
            <DetailValue>{fileError.exception}</DetailValue>
          </InfoDetailRow>
        </InfoDetail>
      </InfoDetailWrap>
    </React.Fragment>
  );
}

FileDetail.propTypes = {
  loading: PropTypes.bool,
  fileError: PropTypes.object,
};
