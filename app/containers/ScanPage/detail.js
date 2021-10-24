/* eslint-disable react/prop-types */
import React, { useEffect, memo } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { FormattedMessage } from 'react-intl';

import Body from 'components/Body';
import Navbar from 'components/Navbar';
import PageWrapper, { DetailWrapper } from 'components/PageWrapper';
import { PageHeader } from 'components/Page/PageHeader';
import LoaderIndicator from 'components/Loader';
import {
  InfoDetailWrap,
  InfoDetail,
  InfoDetailRow,
  DetailLabel,
  DetailValue,
} from 'components/Page/StyledDetail';
import reducer from './reducer';
import saga from './saga';
import { getScanDetailAction } from './actions';
import messages from './messages';
import {
  makeSelectScan,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
const key = 'scanPage';

export function DetailsPage({ match, scan, loading, error, onLoad }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { id } = match.params;
  useEffect(() => {
    onLoad(id);
  }, []);

  return (
    <React.Fragment>
      <Body />
      <Navbar />
      <PageWrapper>
        <PageHeader pageTitle="Scan Detail" back="true" />
        <DetailWrapper>
          <ScanDetail loading={loading} error={error} scan={scan} />
        </DetailWrapper>
      </PageWrapper>
    </React.Fragment>
  );
}

function ScanDetail(props) {
  if (props.loading) {
    return <LoaderIndicator />;
  }
  if (props.error) {
    return <React.Fragment>Error occurred</React.Fragment>;
  }
  return (
    <React.Fragment>
      <InfoDetailWrap>
        <InfoDetail>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.awb} />
            </DetailLabel>
            <DetailValue>{props.scan.awb}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.carrierAccount} />
            </DetailLabel>
            <DetailValue>{props.scan.carrierAccount}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.scanTypeCarrier} />
            </DetailLabel>
            <DetailValue>{props.scan.scanTypeCarrier}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.siteName} />
            </DetailLabel>
            <DetailValue>{props.scan.siteName}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.accountNumber} />
            </DetailLabel>
            <DetailValue>{props.scan.accountNumber}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.signature} />
            </DetailLabel>
            <DetailValue>{props.scan.signature}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.countryCode} />
            </DetailLabel>
            <DetailValue>{props.scan.countryCode}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.city} />
            </DetailLabel>
            <DetailValue>{props.scan.city}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.zip} />
            </DetailLabel>
            <DetailValue>{props.scan.zip}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.scanCount} />
            </DetailLabel>
            <DetailValue>{props.scan.scanCount}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.fileExtractedTime} />
            </DetailLabel>
            <DetailValue>{props.scan.fileExtractedDateTimeText}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.scanLocation} />
            </DetailLabel>
            <DetailValue>{props.scan.scanLocation}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.scanMessage} />
            </DetailLabel>
            <DetailValue>{props.scan.scanMessage}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.scanDateTime} />
            </DetailLabel>
            <DetailValue>{props.scan.scanDateTimeText}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.lastScanDateTime} />
            </DetailLabel>
            <DetailValue>{props.scan.lastScanDateTimeText}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>
              <FormattedMessage {...messages.sendToSite} />
            </DetailLabel>
            <DetailValue>{props.scan.sendToSite ? 'Yes' : 'No'}</DetailValue>
          </InfoDetailRow>
        </InfoDetail>
      </InfoDetailWrap>
    </React.Fragment>
  );
}

DetailsPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  scan: PropTypes.object,
  onLoad: PropTypes.func,
  match: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  scan: makeSelectScan(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoad: id => dispatch(getScanDetailAction(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DetailsPage);
