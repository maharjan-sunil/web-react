/* eslint-disable no-nested-ternary */
/* eslint-disable default-case */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import styled from 'styled-components';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Badge,
  Col,
  Row,
} from '@bootstrap-styled/v4';
import toastr from 'toastr';
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
import { Clipboard } from '@styled-icons/fa-regular/Clipboard';
import vkBeautify from 'vkbeautify';
import { FormattedMessage } from 'react-intl';
import reducer from './reducer';
import saga from './saga';
import { getLogAction } from './actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectShipmentLog,
} from './selectors';
import messages from './messages';
const ReqCode = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  padding: 15px;
  position: relative;
  height: 100%;
  overflow-y: auto;
  & > .btn {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  white-space: pre-wrap;
`;
const ColHeader = styled.h3`
  clear: both;
  min-height: 20px;
  margin-top: 0;
  & > .btn {
    float: right;
  }
`;
const WCol = styled(Col)`
  && {
    padding-right: 5px;
    padding-left: 5px;
  }
`;

export function detail({ match, onLoad, log, error, loading }) {
  useInjectReducer({ key: 'logPage', reducer });
  useInjectSaga({ key: 'logPage', saga });

  const { id } = match.params;

  useEffect(() => {
    onLoad(id);
  }, []);

  return (
    <React.Fragment>
      <Body />
      <Navbar />
      <PageWrapper>
        <PageHeader pageTitle="Shipment Log Detail" back="true" />
        <DetailWrapper>
          <ShipmentLogDetail loading={loading} error={error} log={log} />
        </DetailWrapper>
      </PageWrapper>
    </React.Fragment>
  );
}

function ShipmentLogDetail(props) {
  if (props.loading || !props.log.logID) {
    return <LoaderIndicator />;
  }
  if (props.error) {
    return <React.Fragment>Error occurred</React.Fragment>;
  }

  const [{ isShowPopUp, title, content }, setDialogProps] = useState({
    isShowPopUp: false,
    title: '',
    content: '',
  });

  const closeHandler = () => {
    if (isShowPopUp) {
      setDialogProps({
        isShowPopUp: false,
        title: '',
        content: '',
      });
    }
  };

  const onActionClick = (popupTitle, popupContent) => {
    setDialogProps({
      isShowPopUp: true,
      title: popupTitle,
      content: popupContent,
    });
  };

  const copyToClipboard = name => {
    const elm = document.getElementById('PopupData');
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(elm);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    let message = '';
    switch (name) {
      case 'Application Request':
        message = <FormattedMessage {...messages.applicationReqCopy} />;
        break;
      case 'Service Request':
        message = <FormattedMessage {...messages.serviceReqCopy} />;
        break;
      case 'Paperless Request':
        message = <FormattedMessage {...messages.paperlessReqCopy} />;
        break;
      case 'Pickup Request':
        message = <FormattedMessage {...messages.pickupReqCopy} />;
        break;
      case 'Rate Request':
        message = <FormattedMessage {...messages.rateReqCopy} />;
        break;
      case 'Label Request':
        message = <FormattedMessage {...messages.labelReqCopy} />;
        break;
      case 'Routing Label Request':
        message = <FormattedMessage {...messages.routingLabelReqCopy} />;
        break;
      case 'Shipment Request':
        message = <FormattedMessage {...messages.shipmentReqCopy} />;
        break;
      case 'Connote Request':
        message = <FormattedMessage {...messages.connoteReqCopy} />;
        break;
      case 'TNT Label Request':
        message = <FormattedMessage {...messages.tntLabelReqCopy} />;
        break;
      case 'Application Response':
        message = <FormattedMessage {...messages.applicationResCopy} />;
        break;
      case 'Service Response':
        message = <FormattedMessage {...messages.serviceResCopy} />;
        break;
      case 'Paperless Response':
        message = <FormattedMessage {...messages.paperlessResCopy} />;
        break;
      case 'Pickup Response':
        message = <FormattedMessage {...messages.pickupResCopy} />;
        break;
      case 'Rate Response':
        message = <FormattedMessage {...messages.rateResCopy} />;
        break;
      case 'Label Response':
        message = <FormattedMessage {...messages.labelResCopy} />;
        break;
      case 'Routing Label Response':
        message = <FormattedMessage {...messages.routingLabelResCopy} />;
        break;
      case 'Shipment Response':
        message = <FormattedMessage {...messages.shipmentResCopy} />;
        break;
    }
    toastr.info(message.props.defaultMessage);
  };
  return (
    <React.Fragment>
      <InfoDetailWrap>
        <InfoDetail>
          <InfoDetailRow>
            <DetailLabel>Product</DetailLabel>
            <DetailValue>
              {`${props.log.productName}`}&nbsp;
              <Badge color="primary" title="Product Number">
                <b>{props.log.productNo}</b>
              </Badge>
            </DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Status</DetailLabel>
            <DetailValue>{props.log.status}</DetailValue>
          </InfoDetailRow>
          {props.log.status !== 'Success' && (
            <React.Fragment>
              <InfoDetailRow>
                <DetailLabel>Error Source</DetailLabel>
                <DetailValue>{props.log.errorSource}</DetailValue>
              </InfoDetailRow>
              <InfoDetailRow>
                <DetailLabel>Service Error</DetailLabel>
                <DetailValue>{props.log.serviceError}</DetailValue>
              </InfoDetailRow>
              <InfoDetailRow>
                <DetailLabel>Application Error</DetailLabel>
                <DetailValue>{props.log.applicationError}</DetailValue>
              </InfoDetailRow>
            </React.Fragment>
          )}
          <InfoDetailRow>
            <DetailLabel>Date</DetailLabel>
            <DetailValue>{props.log.datetimeText}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>User Name</DetailLabel>
            <DetailValue>{props.log.userName}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Operation</DetailLabel>
            <DetailValue>{props.log.operation}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Site Name</DetailLabel>
            <DetailValue>{props.log.siteName}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>AWB Label</DetailLabel>
            <DetailValue>{props.log.awbLabel}</DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Request</DetailLabel>
            <DetailValue className="btn-flex">
              <Button
                onClick={() => {
                  onActionClick(
                    'Application Request',
                    props.log.shipmentLogRequest.applicationRequest,
                  );
                }}
              >
                Application
              </Button>
              {props.log.shipmentLogRequest.serviceRequest && (
                <Button
                  onClick={() => {
                    onActionClick(
                      'Service Request',
                      props.log.shipmentLogRequest.serviceRequest,
                    );
                  }}
                >
                  Service
                </Button>
              )}
              {props.log.shipmentLogRequest.paperlessRequest && (
                <Button
                  onClick={() => {
                    onActionClick(
                      'Paperless Request',
                      props.log.shipmentLogRequest.paperlessRequest,
                    );
                  }}
                >
                  Paperless
                </Button>
              )}
              {props.log.shipmentLogRequest.bookPickupRequest && (
                <Button
                  onClick={() => {
                    onActionClick(
                      'Pickup Request',
                      props.log.shipmentLogRequest.bookPickupRequest,
                    );
                  }}
                >
                  Book Pickup
                </Button>
              )}
              {props.log.shipmentLogRequest.rateRequest && (
                <Button
                  onClick={() => {
                    onActionClick(
                      'Rate Request',
                      props.log.shipmentLogRequest.rateRequest,
                    );
                  }}
                >
                  Rate
                </Button>
              )}
              {props.log.shipmentLogRequest.labelRequest && (
                <Button
                  onClick={() => {
                    onActionClick(
                      'Label Request',
                      props.log.shipmentLogRequest.labelRequest,
                    );
                  }}
                >
                  Label
                </Button>
              )}
              {props.log.shipmentLogRequest.routingLabelRequest && (
                <Button
                  onClick={() => {
                    onActionClick(
                      'Routing Label Request',
                      props.log.shipmentLogRequest.routingLabelRequest,
                    );
                  }}
                >
                  Routing Label
                </Button>
              )}
              {props.log.shipmentLogRequest.shipmentRequest && (
                <Button
                  onClick={() => {
                    onActionClick(
                      'Shipment Request',
                      props.log.shipmentLogRequest.shipmentRequest,
                    );
                  }}
                >
                  Shipment
                </Button>
              )}
              {props.log.shipmentLogRequest.connoteRequest && (
                <Button
                  onClick={() => {
                    onActionClick(
                      'Connote Request',
                      props.log.shipmentLogRequest.connoteRequest,
                    );
                  }}
                >
                  Connote
                </Button>
              )}
              {props.log.shipmentLogRequest.tntLabelRequest && (
                <Button
                  onClick={() => {
                    onActionClick(
                      'TNT Label Request',
                      props.log.shipmentLogRequest.tntLabelRequest,
                    );
                  }}
                >
                  TNT Label
                </Button>
              )}
            </DetailValue>
          </InfoDetailRow>
          <InfoDetailRow>
            <DetailLabel>Response</DetailLabel>
            <DetailValue className="btn-flex">
              <Button
                onClick={() => {
                  onActionClick(
                    'Application Response',
                    props.log.shipmentLogResponse.applicationResponse,
                  );
                }}
              >
                Application
              </Button>
              {props.log.shipmentLogResponse.serviceResponse && (
                <Button
                  onClick={() => {
                    onActionClick(
                      'Service Response',
                      props.log.shipmentLogResponse.serviceResponse,
                    );
                  }}
                >
                  Service
                </Button>
              )}
              {props.log.shipmentLogResponse.paperlessResponse && (
                <Button
                  onClick={() => {
                    onActionClick(
                      'Paperless Response',
                      props.log.shipmentLogResponse.serviceResponse,
                    );
                  }}
                >
                  Paperless
                </Button>
              )}
              {props.log.shipmentLogResponse.bookPickupResponse && (
                <Button
                  onClick={() => {
                    onActionClick(
                      'Book Pickup Response',
                      props.log.shipmentLogResponse.bookPickupResponse,
                    );
                  }}
                >
                  Book Pickup
                </Button>
              )}
              {props.log.shipmentLogRequest.rateResponse && (
                <Button
                  onClick={() => {
                    onActionClick(
                      'Rate Response',
                      props.log.shipmentLogRequest.rateResponse,
                    );
                  }}
                >
                  Rate
                </Button>
              )}
              {props.log.shipmentLogRequest.labelResponse && (
                <Button
                  onClick={() => {
                    onActionClick(
                      'Label Response',
                      props.log.shipmentLogRequest.labelResponse,
                    );
                  }}
                >
                  Label
                </Button>
              )}
              {props.log.shipmentLogRequest.routingLabelResponse && (
                <Button
                  onClick={() => {
                    onActionClick(
                      'Routing Label Response',
                      props.log.shipmentLogRequest.routingLabelResponse,
                    );
                  }}
                >
                  Routing Label
                </Button>
              )}
              {props.log.shipmentLogRequest.shipmentResponse && (
                <Button
                  onClick={() => {
                    onActionClick(
                      'Shipment Response',
                      props.log.shipmentLogRequest.shipmentResponse,
                    );
                  }}
                >
                  Shipment
                </Button>
              )}
            </DetailValue>
          </InfoDetailRow>
        </InfoDetail>
      </InfoDetailWrap>
      <PopUp
        isShowPopUp={isShowPopUp}
        title={title}
        content={content}
        closeHandler={closeHandler}
        handleCopy={copyToClipboard}
      />
    </React.Fragment>
  );
}

function PopUp(props) {
  const content =
    props.content !== ''
      ? props.content.toString().includes('<') ||
        (!props.content.toString().includes('<') &&
          !props.content.toString().includes('{'))
        ? props.content.toString()
        : vkBeautify.json(props.content.toString())
      : '';

  return (
    <React.Fragment>
      <Modal isOpen={props.isShowPopUp} size="lg">
        <ModalHeader toggle={props.closeHandler}>{props.title}</ModalHeader>
        <ModalBody style={{ height: 'calc(100vh - 210px)', overflowY: 'auto' }}>
          <StyledSpan>
            <Row>
              <WCol>
                <ColHeader>
                  <Button
                    data-toggle="tooltip"
                    title="Copy"
                    color="primary"
                    onClick={() => {
                      props.handleCopy(props.title);
                    }}
                  >
                    <Clipboard size="12" />
                  </Button>
                </ColHeader>
                <ReqCode id="PopupData">
                  {content === '' ? '' : content}
                </ReqCode>
              </WCol>
            </Row>
          </StyledSpan>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

const StyledSpan = styled.span`
  white-space: pre-line;
`;

detail.propTypes = {
  match: PropTypes.any,
  onLoad: PropTypes.func,
  log: PropTypes.oneOfType([PropTypes.bool, PropTypes.any]),
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  log: makeSelectShipmentLog(),
  error: makeSelectError(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: id => {
      dispatch(getLogAction(id));
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
)(detail);
