/* eslint-disable react/prop-types */
import React, { useEffect, memo } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Badge } from '@bootstrap-styled/v4';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { PageHeader } from 'components/Page/PageHeader';
import Body from 'components/Body';
import Navbar from 'components/Navbar';
import PageWrapper, { DetailWrapper } from 'components/PageWrapper';
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
import { getDatatConnectionDetailAction } from './actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectdataconnection,
} from './selectors';
const key = 'DataConnectionPage';

export function DetailPage({ match, dataConnection, loading, error, onLoad }) {
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
        <PageHeader pageTitle="Data Connection Detail" back="true" />
        <DetailWrapper>
          <DataConnectionDetail
            loading={loading}
            error={error}
            dataConnection={dataConnection}
          />
        </DetailWrapper>
      </PageWrapper>
    </React.Fragment>
  );
}
function DataConnectionDetail(props) {
  if (props.loading || !props.dataConnection.id) {
    return <LoaderIndicator />;
  }
  if (props.error) {
    return <React.Fragment>Error occurred</React.Fragment>;
  }
  if (props.dataConnection != null) {
    return (
      <React.Fragment>
        <InfoDetailWrap>
          <InfoDetail>
            <InfoDetailRow>
              <DetailLabel>Carrier</DetailLabel>
              <DetailValue>
                {props.dataConnection.scanTypeCarrier}{' '}
                <Badge color="danger" title="Carrier Id">
                  {props.dataConnection.carrierID}
                </Badge>
              </DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>Signature</DetailLabel>
              <DetailValue>{props.dataConnection.signature}</DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>Country Code</DetailLabel>
              <DetailValue>
                {props.dataConnection.countryText}{' '}
                <Badge color="danger" title="Country ISO Code">
                  {props.dataConnection.countryCode}
                </Badge>
              </DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>City</DetailLabel>
              <DetailValue>{props.dataConnection.city}</DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>Zip</DetailLabel>
              <DetailValue>{props.dataConnection.zip}</DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>Carrier Account</DetailLabel>
              <DetailValue>{props.dataConnection.carrierAccount}</DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>AWB</DetailLabel>
              <DetailValue>{props.dataConnection.awb}</DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>Scan Location</DetailLabel>
              <DetailValue>{props.dataConnection.scanLocation}</DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>Scan Transport Id Type</DetailLabel>
              <DetailValue>
                {props.dataConnection.scanTransportIdType}
              </DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>Scan Message</DetailLabel>
              <DetailValue>{props.dataConnection.scanMessage}</DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>Send To Site</DetailLabel>
              <DetailValue>{props.dataConnection.sendToSite}</DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>File Extracted Time</DetailLabel>
              <DetailValue>
                {props.dataConnection.fileExtratedDateTimeText}
              </DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>Scan Date Time</DetailLabel>
              <DetailValue>{props.dataConnection.scanDateTimeText}</DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>Last Scan Date Time</DetailLabel>
              <DetailValue>
                {props.dataConnection.lastScanDateTimeText}
              </DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>Data Conn Is Processed</DetailLabel>
              <DetailValue>
                {props.dataConnection.dataConnIsProcessed != null
                  ? props.dataConnection.dataConnIsProcessed
                  : 'Null'}
              </DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>Data Conn Status</DetailLabel>
              <DetailValue>
                {props.dataConnection.dataConnStatus != null
                  ? props.dataConnection.dataConnStatus
                  : 'Null'}
              </DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>Data Conn Error Msg</DetailLabel>
              <DetailValue>{props.dataConnection.dataConnErrorMsg}</DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>Site Name</DetailLabel>
              <DetailValue>{props.dataConnection.siteName}</DetailValue>
            </InfoDetailRow>
            <InfoDetailRow>
              <DetailLabel>Shipment Id</DetailLabel>
              <DetailValue>{props.dataConnection.shipmentId}</DetailValue>
            </InfoDetailRow>
          </InfoDetail>
        </InfoDetailWrap>
      </React.Fragment>
    );
  }
  return null;
}
DetailPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  dataConnection: PropTypes.oneOfType([PropTypes.bool, PropTypes.any]),
  onLoad: PropTypes.func,
  match: PropTypes.any,
};
const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  dataConnection: makeSelectdataconnection(),
});
export function mapDispatchToProps(dispatch) {
  return {
    onLoad: id => dispatch(getDatatConnectionDetailAction(id)),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(DetailPage);
