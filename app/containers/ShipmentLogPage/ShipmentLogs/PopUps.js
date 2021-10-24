import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import vkBeautify from 'vkbeautify';
import { FormattedMessage } from 'react-intl';
import toastr from 'toastr';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@bootstrap-styled/v4';
import { Clipboard } from '@styled-icons/fa-regular/Clipboard';
import messages from 'containers/ShipmentLogPage/messages';

const ReqCode = styled.div`
  background: #ffffff;
  border: 1px solid #ddd;
  padding: 15px;
  position: relative;
  height: 100%;
  overflow-y: auto;
  white-space: pre-wrap;
  clear: both;
  margin-top: 10px;
  width: 100%;
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
const StyledSpan = styled.span`
  white-space: pre-line;
`;

export default function PopUps({ showModal, handleClose, title, data }) {
  const copyToClipboard = documentTitle => {
    const elm = document.getElementById(documentTitle);
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(elm);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    let message = '';
    // eslint-disable-next-line default-case
    switch (title) {
      case 'AppReq':
        message = <FormattedMessage {...messages.applicationReqCopy} />;
        break;
      case 'ServiceReq':
        message = <FormattedMessage {...messages.serviceReqCopy} />;
        break;
      case 'PaperlessReq':
        message = <FormattedMessage {...messages.paperlessReqCopy} />;
        break;
      case 'PickupReq':
        message = <FormattedMessage {...messages.pickupReqCopy} />;
        break;
      case 'RateReq':
        message = <FormattedMessage {...messages.rateReqCopy} />;
        break;
      case 'LabelReq':
        message = <FormattedMessage {...messages.labelReqCopy} />;
        break;
      case 'RoutingLabelReq':
        message = <FormattedMessage {...messages.routingLabelReqCopy} />;
        break;
      case 'ShipmentReq':
        message = <FormattedMessage {...messages.shipmentReqCopy} />;
        break;
      case 'ConnoteReq':
        message = <FormattedMessage {...messages.connoteReqCopy} />;
        break;
      case 'TntLabelReq':
        message = <FormattedMessage {...messages.tntLabelReqCopy} />;
        break;
      case 'AppRes':
        message = <FormattedMessage {...messages.applicationResCopy} />;
        break;
      case 'ServiceRes':
        message = <FormattedMessage {...messages.serviceResCopy} />;
        break;
      case 'PaperlessRes':
        message = <FormattedMessage {...messages.paperlessResCopy} />;
        break;
      case 'PickupRes':
        message = <FormattedMessage {...messages.pickupResCopy} />;
        break;
      case 'RateRes':
        message = <FormattedMessage {...messages.rateResCopy} />;
        break;
      case 'LabelRes':
        message = <FormattedMessage {...messages.labelResCopy} />;
        break;
      case 'RoutingLabelRes':
        message = <FormattedMessage {...messages.routingLabelResCopy} />;
        break;
      case 'ShipmentRes':
        message = <FormattedMessage {...messages.shipmentResCopy} />;
        break;
    }
    toastr.info(message.props.defaultMessage);
  };

  return (
    <React.Fragment>
      <Modal isOpen={showModal} size="lg">
        <ModalHeader toggle={handleClose}> {title} </ModalHeader>
        <ModalBody
          style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}
        >
          {title === 'Shipment Request' ? (
            <StyledSpan>
              <Row>
                <WCol>
                  <ColHeader>
                    Application Request
                    <Button
                      data-toggle="tooltip"
                      title="Copy"
                      color="primary"
                      onClick={() => {
                        copyToClipboard('AppReq');
                      }}
                    >
                      <Clipboard size="12" />
                    </Button>
                  </ColHeader>
                  <ReqCode id="AppReq">
                    {data.applicationRequest !== undefined &&
                    data.applicationRequest !== null &&
                    (data.applicationRequest.toString().includes('<') ||
                      (!data.applicationRequest.toString().includes('<') &&
                        !data.applicationRequest.toString().includes('{')))
                      ? data.applicationRequest
                      : vkBeautify.json(data.applicationRequest)}
                  </ReqCode>
                </WCol>
                {data.serviceRequest && (
                  <WCol>
                    <ColHeader>
                      Service Request
                      <Button
                        data-toggle="tooltip"
                        title="Copy"
                        color="primary"
                        onClick={() => {
                          copyToClipboard('ServiceReq');
                        }}
                      >
                        <Clipboard size="12" />
                      </Button>
                    </ColHeader>
                    <ReqCode id="ServiceReq">
                      {data.serviceRequest !== undefined &&
                      data.serviceRequest !== null &&
                      (data.serviceRequest.toString().includes('<') ||
                        (!data.serviceRequest.toString().includes('<') &&
                          !data.serviceRequest.toString().includes('{')))
                        ? data.serviceRequest
                        : vkBeautify.json(data.serviceRequest)}
                    </ReqCode>
                  </WCol>
                )}
                {data.paperlessRequest && (
                  <WCol>
                    <ColHeader>
                      Paperless Request
                      <Button
                        data-toggle="tooltip"
                        title="Copy"
                        color="primary"
                        onClick={() => {
                          copyToClipboard('PaperlessReq');
                        }}
                      >
                        <Clipboard size="12" />
                      </Button>
                    </ColHeader>
                    <ReqCode id="PaperlessReq">
                      {data.paperlessRequest !== undefined &&
                      data.paperlessRequest !== null &&
                      (data.paperlessRequest.toString().includes('<') ||
                        (!data.paperlessRequest.toString().includes('<') &&
                          !data.paperlessRequest.toString().includes('{')))
                        ? data.paperlessRequest
                        : vkBeautify.json(data.paperlessRequest)}
                    </ReqCode>
                  </WCol>
                )}
                {data.bookPickupRequest && (
                  <WCol>
                    <ColHeader>
                      Book Pickup Request
                      <Button
                        data-toggle="tooltip"
                        title="Copy"
                        color="primary"
                        onClick={() => {
                          copyToClipboard('PickupReq');
                        }}
                      >
                        <Clipboard size="12" />
                      </Button>
                    </ColHeader>
                    <ReqCode id="PickupReq">
                      {data.bookPickupRequest !== undefined &&
                      data.bookPickupRequest !== null &&
                      (data.bookPickupRequest.toString().includes('<') ||
                        (!data.bookPickupRequest.toString().includes('<') &&
                          !data.bookPickupRequest.toString().includes('{')))
                        ? data.bookPickupRequest
                        : vkBeautify.json(data.bookPickupRequest)}
                    </ReqCode>
                  </WCol>
                )}
                {data.rateRequest && (
                  <WCol>
                    <ColHeader>
                      Rate Request
                      <Button
                        data-toggle="tooltip"
                        title="Copy"
                        color="primary"
                        onClick={() => {
                          copyToClipboard('RateReq');
                        }}
                      >
                        <Clipboard size="12" />
                      </Button>
                    </ColHeader>
                    <ReqCode id="RateReq">
                      {data.rateRequest !== undefined &&
                      data.rateRequest !== null &&
                      (data.rateRequest.toString().includes('<') ||
                        (!data.rateRequest.toString().includes('<') &&
                          !data.rateRequest.toString().includes('{')))
                        ? data.rateRequest
                        : vkBeautify.json(data.rateRequest)}
                    </ReqCode>
                  </WCol>
                )}
                {data.connoteRequest && (
                  <WCol>
                    <ColHeader>
                      Connote Request
                      <Button
                        data-toggle="tooltip"
                        title="Copy"
                        color="primary"
                        onClick={() => {
                          copyToClipboard('ConnoteReq');
                        }}
                      >
                        <Clipboard size="12" />
                      </Button>
                    </ColHeader>
                    <ReqCode id="ConnoteReq">
                      {data.connoteRequest !== undefined &&
                      data.connoteRequest !== null &&
                      (data.connoteRequest.toString().includes('<') ||
                        (!data.connoteRequest.toString().includes('<') &&
                          !data.connoteRequest.toString().includes('{')))
                        ? data.connoteRequest
                        : vkBeautify.json(data.connoteRequest)}
                    </ReqCode>
                  </WCol>
                )}
                {data.labelRequest && (
                  <WCol>
                    <ColHeader>
                      Label Request
                      <Button
                        data-toggle="tooltip"
                        title="Copy"
                        color="primary"
                        onClick={() => {
                          copyToClipboard('LabelReq');
                        }}
                      >
                        <Clipboard size="12" />
                      </Button>
                    </ColHeader>
                    <ReqCode id="LabelReq">
                      {data.labelRequest !== undefined &&
                      data.labelRequest !== null &&
                      (data.labelRequest.toString().includes('<') ||
                        (!data.labelRequest.toString().includes('<') &&
                          !data.labelRequest.toString().includes('{')))
                        ? data.labelRequest
                        : vkBeautify.json(data.labelRequest)}
                    </ReqCode>
                  </WCol>
                )}
                {data.routingLabelRequest && (
                  <WCol>
                    <ColHeader>
                      Routing Label Request
                      <Button
                        data-toggle="tooltip"
                        title="Copy"
                        color="primary"
                        onClick={() => {
                          copyToClipboard('RoutingLabelReq');
                        }}
                      >
                        <Clipboard size="12" />
                      </Button>
                    </ColHeader>
                    <ReqCode id="RoutingLabelReq">
                      {data.routingLabelRequest !== undefined &&
                      data.routingLabelRequest !== null &&
                      (data.routingLabelRequest.toString().includes('<') ||
                        (!data.routingLabelRequest.toString().includes('<') &&
                          !data.routingLabelRequest.toString().includes('{')))
                        ? data.routingLabelRequest
                        : vkBeautify.json(data.routingLabelRequest)}
                    </ReqCode>
                  </WCol>
                )}
                {data.shipmentRequest && (
                  <WCol>
                    <ColHeader>
                      Shipment Request
                      <Button
                        data-toggle="tooltip"
                        title="Copy"
                        color="primary"
                        onClick={() => {
                          copyToClipboard('ShipmentReq');
                        }}
                      >
                        <Clipboard size="12" />
                      </Button>
                    </ColHeader>
                    <ReqCode id="ShipmentReq">
                      {data.shipmentRequest !== undefined &&
                      data.shipmentRequest !== null &&
                      (data.shipmentRequest.toString().includes('<') ||
                        (!data.shipmentRequest.toString().includes('<') &&
                          !data.shipmentRequest.toString().includes('{')))
                        ? data.shipmentRequest
                        : vkBeautify.json(data.shipmentRequest)}
                    </ReqCode>
                  </WCol>
                )}
                {data.tntLabelRequest && (
                  <WCol>
                    <ColHeader>
                      TNT Label Request
                      <Button
                        data-toggle="tooltip"
                        title="Copy"
                        color="primary"
                        onClick={() => {
                          copyToClipboard('TntLabelReq');
                        }}
                      >
                        <Clipboard size="12" />
                      </Button>
                    </ColHeader>
                    <ReqCode id="TntLabelReq">
                      {data.tntLabelRequest !== undefined &&
                      data.tntLabelRequest !== null &&
                      (data.tntLabelRequest.toString().includes('<') ||
                        (!data.tntLabelRequest.toString().includes('<') &&
                          !data.tntLabelRequest.toString().includes('{')))
                        ? data.tntLabelRequest
                        : vkBeautify.json(data.tntLabelRequest)}
                    </ReqCode>
                  </WCol>
                )}
              </Row>
            </StyledSpan>
          ) : (
            <StyledSpan>
              <Row>
                <WCol>
                  <ColHeader>
                    Application Response
                    <Button
                      data-toggle="tooltip"
                      title="Copy"
                      color="primary"
                      onClick={() => {
                        copyToClipboard('AppRes');
                      }}
                    >
                      <Clipboard size="12" />
                    </Button>
                  </ColHeader>
                  <ReqCode id="AppRes">
                    {data.applicationResponse !== undefined &&
                    data.applicationResponse !== null &&
                    (data.applicationResponse.toString().includes('<') ||
                      (!data.applicationResponse.toString().includes('<') &&
                        !data.applicationResponse.toString().includes('{')))
                      ? data.applicationResponse
                      : vkBeautify.json(data.applicationResponse)}
                  </ReqCode>
                </WCol>
                {data.serviceResponse && (
                  <WCol>
                    <ColHeader>
                      Service Response
                      <Button
                        data-toggle="tooltip"
                        title="Copy"
                        color="primary"
                        onClick={() => {
                          copyToClipboard('ServiceRes');
                        }}
                      >
                        <Clipboard size="12" />
                      </Button>
                    </ColHeader>
                    <ReqCode id="ServiceRes">
                      {data.serviceResponse !== undefined &&
                      data.serviceResponse !== null &&
                      (data.serviceResponse.toString().includes('<') ||
                        (!data.serviceResponse.toString().includes('<') &&
                          !data.serviceResponse.toString().includes('{')))
                        ? data.serviceResponse
                        : vkBeautify.json(data.serviceResponse)}
                    </ReqCode>
                  </WCol>
                )}
                {data.paperlessResponse && (
                  <WCol>
                    <ColHeader>
                      Paperless Response
                      <Button
                        data-toggle="tooltip"
                        title="Copy"
                        color="primary"
                        onClick={() => {
                          copyToClipboard('PaperlessRes');
                        }}
                      >
                        <Clipboard size="12" />
                      </Button>
                    </ColHeader>
                    <ReqCode id="PaperlessRes">
                      {data.paperlessResponse !== undefined &&
                      data.paperlessResponse !== null &&
                      (data.paperlessResponse.toString().includes('<') ||
                        (!data.paperlessResponse.toString().includes('<') &&
                          !data.paperlessResponse.toString().includes('{')))
                        ? data.paperlessResponse
                        : vkBeautify.json(data.paperlessResponse)}
                    </ReqCode>
                  </WCol>
                )}
                {data.bookPickupResponse && (
                  <WCol>
                    <ColHeader>
                      Book Pickup Response
                      <Button
                        data-toggle="tooltip"
                        title="Copy"
                        color="primary"
                        onClick={() => {
                          copyToClipboard('PickupRes');
                        }}
                      >
                        <Clipboard size="12" />
                      </Button>
                    </ColHeader>
                    <ReqCode id="PickupRes">
                      {data.bookPickupResponse !== undefined &&
                      data.bookPickupResponse !== null &&
                      (data.bookPickupResponse.toString().includes('<') ||
                        (!data.bookPickupResponse.toString().includes('<') &&
                          !data.bookPickupResponse.toString().includes('{')))
                        ? data.bookPickupResponse
                        : vkBeautify.json(data.bookPickupResponse)}
                    </ReqCode>
                  </WCol>
                )}
                {data.rateResponse && (
                  <WCol>
                    <ColHeader>
                      Rate Response
                      <Button
                        data-toggle="tooltip"
                        title="Copy"
                        color="primary"
                        onClick={() => {
                          copyToClipboard('RateRes');
                        }}
                      >
                        <Clipboard size="12" />
                      </Button>
                    </ColHeader>
                    <ReqCode id="RateRes">
                      {data.rateResponse !== undefined &&
                      data.rateResponse !== null &&
                      (data.rateResponse.toString().includes('<') ||
                        (!data.rateResponse.toString().includes('<') &&
                          !data.rateResponse.toString().includes('{')))
                        ? data.rateResponse
                        : vkBeautify.json(data.rateResponse)}
                    </ReqCode>
                  </WCol>
                )}
                {data.shipmentResponse && (
                  <WCol>
                    <ColHeader>
                      Shipment Response
                      <Button
                        data-toggle="tooltip"
                        title="Copy"
                        color="primary"
                        onClick={() => {
                          copyToClipboard('ShipmentRes');
                        }}
                      >
                        <Clipboard size="12" />
                      </Button>
                    </ColHeader>
                    <ReqCode id="ShipmentRes">
                      {data.shipmentResponse !== undefined &&
                      data.shipmentResponse !== null &&
                      (data.shipmentResponse.toString().includes('<') ||
                        (!data.shipmentResponse.toString().includes('<') &&
                          !data.shipmentResponse.toString().includes('{')))
                        ? data.shipmentResponse
                        : vkBeautify.json(data.shipmentResponse)}
                    </ReqCode>
                  </WCol>
                )}
                {data.labelResponse && (
                  <WCol>
                    <ColHeader>
                      Label Response
                      <Button
                        data-toggle="tooltip"
                        title="Copy"
                        color="primary"
                        onClick={() => {
                          copyToClipboard('LabelRes');
                        }}
                      >
                        <Clipboard size="12" />
                      </Button>
                    </ColHeader>
                    <ReqCode id="LabelRes">
                      {data.labelResponse !== undefined &&
                      data.labelResponse !== null &&
                      (data.labelResponse.toString().includes('<') ||
                        (!data.labelResponse.toString().includes('<') &&
                          !data.labelResponse.toString().includes('{')))
                        ? data.labelResponse
                        : vkBeautify.json(data.labelResponse)}
                    </ReqCode>
                  </WCol>
                )}
                {data.routingLabelResponse && (
                  <WCol>
                    <ColHeader>
                      Routing Label Response
                      <Button
                        data-toggle="tooltip"
                        title="Copy"
                        color="primary"
                        onClick={() => {
                          copyToClipboard('RoutingLabelRes');
                        }}
                      >
                        <Clipboard size="12" />
                      </Button>
                    </ColHeader>
                    <ReqCode id="RoutingLabelRes">
                      {data.routingLabelResponse !== undefined &&
                      data.routingLabelResponse !== null &&
                      (data.routingLabelResponse.toString().includes('<') ||
                        (!data.routingLabelResponse.toString().includes('<') &&
                          !data.routingLabelResponse.toString().includes('{')))
                        ? data.routingLabelResponse
                        : vkBeautify.json(data.routingLabelResponse)}
                    </ReqCode>
                  </WCol>
                )}
              </Row>
            </StyledSpan>
          )}
        </ModalBody>
        <ModalFooter />
      </Modal>
    </React.Fragment>
  );
}

PopUps.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  data: PropTypes.object,
};
