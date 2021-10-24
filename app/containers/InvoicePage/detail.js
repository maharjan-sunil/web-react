/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import Body from 'components/Body';
import Navbar from 'components/Navbar';
import PageWrapper from 'components/PageWrapper';
import LoaderIndicator from 'components/Loader';
import {
  Row,
  Col,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Badge,
  A,
  Tooltip,
} from '@bootstrap-styled/v4';
import StyledTable from 'components/Table';
import { PageHeader } from 'components/Page/PageHeader';
import {
  makeSelectInvoice,
  makeSelectError,
  makeSelectLoader,
} from './selectors';
import { reducer } from './reducer';
import saga from './saga';
import { getInvoiceAction } from './actions';
export function detail({ match, onLoad, invoice, error, loading }) {
  useInjectReducer({ key: 'invoicePage', reducer });
  useInjectSaga({ key: 'invoicePage', saga });

  const { id } = match.params;

  useEffect(() => {
    onLoad(id);
  }, []);

  return (
    <React.Fragment>
      <Body />
      <Navbar />
      <PageWrapper>
        <PageHeader pageTitle="Invoice Detail" back="true" />
        <Row>
          <Col md="12">
            {invoice.id > 0 && (
              <InvoiceDetail
                invoice={invoice}
                loading={loading}
                error={error}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col md="12">
            {invoice && invoice.id > 0 && (
              <FileProcessDetails
                fileProcesses={invoice.fileProcesses}
                loading={loading}
                error={error}
              />
            )}
          </Col>
        </Row>
      </PageWrapper>
    </React.Fragment>
  );
}
function Status(props) {
  return (
    <React.Fragment>
      <Badge color="danger">
        <b>{`${props.status}`}</b>
      </Badge>
      &nbsp;
    </React.Fragment>
  );
}

function StatusToolTip(props) {
  return (
    <React.Fragment>
      <Tooltip
        placement="right"
        isOpen={props.isShowToolTip}
        target={props.target}
        delay={{ shape: 0, hide: 100 }}
      >
        <b>{`[${props.errorSource}]`}</b>&nbsp;
        <div>{`${props.serviceError}`}</div>
        <b>[Application]</b>&nbsp;<div>{`${props.applicationError}`}</div>
      </Tooltip>
    </React.Fragment>
  );
}

function InvoiceDetail(props) {
  if (props.loading) {
    return <LoaderIndicator />;
  }
  if (props.error) {
    return <React.Fragment>Error occurred</React.Fragment>;
  }

  const [
    { isShowToolTip, target, errorSource, serviceError, applicationError },
    setToolTipState,
  ] = useState({
    isShowToolTip: false,
    target: '',
    errorSource: '',
    serviceError: '',
    applicationError: '',
  });
  const toolTipHandler = (
    flag,
    logTarget,
    logErrorSource,
    logServiceError,
    logApplicationError,
  ) => {
    setToolTipState({
      isShowToolTip: flag,
      target: logTarget,
      errorSource: logErrorSource,
      serviceError: logServiceError,
      applicationError: logApplicationError,
    });
  };
  return (
    <React.Fragment>
      <StyledTable>
        <Thead>
          <Tr>
            <Th colSpan="2">Invoice Details</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Site</Td>
            <Td>{props.invoice.applicationName}</Td>
          </Tr>
          <Tr>
            <Td>Carrier</Td>
            <Td>{props.invoice.carrierText}</Td>
          </Tr>
          <Tr>
            <Td>File Name</Td>
            <Td>{props.invoice.name}</Td>
          </Tr>
          <Tr>
            <Td>PickUp Date</Td>
            <Td>{props.invoice.pickUpDate}</Td>
          </Tr>
          <Tr>
            <Td>Status</Td>
            <Td>
              {props.invoice.status !== 2 ? (
                props.invoice.fileProcesses[0].activityErrorLogs != null ? (
                  <A
                    id={`target_${props.invoice.id}`}
                    onMouseEnter={() => {
                      toolTipHandler(
                        true,
                        `target_${props.invoice.id}`,
                        props.invoice.name,
                        props.invoice.fileProcesses[0].activityErrorLogs[0]
                          .errorMessage,
                        '',
                      );
                    }}
                    onMouseLeave={() => {
                      toolTipHandler(false, '', '', '', '', '');
                    }}
                  >
                    <Status status={props.invoice.statusText} />
                  </A>
                ) : (
                  <Status status={props.invoice.statusText} />
                )
              ) : (
                <Badge color="success">{props.invoice.statusText}</Badge>
              )}
            </Td>
          </Tr>
        </Tbody>
      </StyledTable>
      <StatusToolTip
        isShowToolTip={isShowToolTip}
        target={target}
        errorSource={errorSource}
        serviceError={serviceError}
        applicationError={applicationError}
      />
    </React.Fragment>
  );
}

function FileProcessDetails(props) {
  if (props.loading) {
    return <LoaderIndicator />;
  }
  if (props.error) {
    return <React.Fragment>Error occurred</React.Fragment>;
  }

  const [
    { isShowToolTip, target, errorSource, serviceError, applicationError },
    setToolTipState,
  ] = useState({
    isShowToolTip: false,
    target: '',
    errorSource: '',
    serviceError: '',
    applicationError: '',
  });
  const toolTipHandler = (
    flag,
    logTarget,
    logErrorSource,
    logServiceError,
    logApplicationError,
  ) => {
    setToolTipState({
      isShowToolTip: flag,
      target: logTarget,
      errorSource: logErrorSource,
      serviceError: logServiceError,
      applicationError: logApplicationError,
    });
  };
  const invoiceDetailsArray = props.fileProcesses || [];
  return (
    <React.Fragment>
      <StyledTable>
        <Thead>
          <Tr>
            <Th colSpan="5">File Process Details</Th>
          </Tr>
          <Tr>
            <Th>S/N</Th>
            <Th>PId</Th>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {invoiceDetailsArray.map((invoiceDetail, i) => (
            <Tr key={invoiceDetail.id}>
              <Td>{i + 1}</Td>
              <Td>{invoiceDetail.id}</Td>
              <Td>{invoiceDetail.activityText}</Td>
              <Td>{invoiceDetail.activityDateTime}</Td>
              <Td>
                {invoiceDetail.status !== 2 ? (
                  <A
                    id={`target_${invoiceDetail.id}`}
                    onMouseEnter={() => {
                      toolTipHandler(
                        true,
                        `target_${invoiceDetail.id}`,
                        invoiceDetail.activityText,
                        invoiceDetail.activityErrorLogs[0].errorMessage,
                        '',
                      );
                    }}
                    onMouseLeave={() => {
                      toolTipHandler(false, '', '', '', '', '');
                    }}
                  >
                    <Status status={invoiceDetail.statusText} />
                  </A>
                ) : (
                  <Badge color="success">{invoiceDetail.statusText}</Badge>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </StyledTable>
      <StatusToolTip
        isShowToolTip={isShowToolTip}
        target={target}
        errorSource={errorSource}
        serviceError={serviceError}
        applicationError={applicationError}
      />
    </React.Fragment>
  );
}
detail.propTypes = {
  match: PropTypes.any,
  onLoad: PropTypes.func,
  invoice: PropTypes.oneOfType([PropTypes.bool, PropTypes.any]),
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  invoice: makeSelectInvoice(),
  error: makeSelectError(),
  loading: makeSelectLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: id => {
      dispatch(getInvoiceAction(id));
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
