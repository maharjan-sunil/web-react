import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Info } from '@styled-icons/fa-solid/Info';
import { Truck } from '@styled-icons/fa-solid/Truck';
import { SignOutAlt } from '@styled-icons/fa-solid/SignOutAlt';
import { SignInAlt } from '@styled-icons/fa-solid/SignInAlt';
import LinkButton from 'components/LinkButton';
import { Tr, Td, Badge, Tooltip, A } from '@bootstrap-styled/v4';

import List from 'components/List';
import ListItem from 'components/ListItem';
import TableLoader from 'components/TableLoadingIndicator';

export default function ShipmentLogsList({
  loading,
  error,
  logs,
  rowStart,
  resetTableRow,
  selectedRow,
  onActionClick,
}) {
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

  if (loading) {
    return <TableLoader />;
  }
  if (error) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return (
      <React.Fragment>
        <Tr>
          <Td colSpan="6">
            <List component={ErrorComponent} />
          </Td>
        </Tr>
      </React.Fragment>
    );
  }
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
  if (logs.length > 0) {
    if (selectedRow >= 0) {
      resetTableRow(5000);
    }
    return (
      <React.Fragment>
        {logs.map((log, index) => (
          <Tr
            key={log.logID}
            data-testid="shipmentLogList"
            className={selectedRow === index ? 'active' : ''}
          >
            <Td scope="row">{index + rowStart}</Td>
            <Td>{log.siteName}</Td>
            <Td>
              {`${log.productName}`}&nbsp;
              <Badge color="primary" title="Product Number">
                <b>{log.productNo}</b>
              </Badge>
              &nbsp;
              {log.status === 'Success' && (
                <Badge color="success" title="AWB">
                  {log.awbLabel}
                </Badge>
              )}
              &nbsp;
              <SelectCountry log={log} />
              <span> -&gt; </span>
              {log.receiver !== null && (
                <Badge title={log.receiverText}>{log.receiver}</Badge>
              )}
            </Td>
            <Td>{log.datetimeText}</Td>
            <Td>
              {log.status !== 'Success' ? (
                <A
                  id={`target_${log.logID}`}
                  onMouseEnter={() => {
                    toolTipHandler(
                      true,
                      `target_${log.logID}`,
                      log.errorSource,
                      log.serviceError,
                      log.applicationError,
                    );
                  }}
                  onMouseLeave={() => {
                    toolTipHandler(false, '', '', '', '', '');
                  }}
                >
                  <Status status={log.status} />
                </A>
              ) : (
                <Badge color="success">{log.status}</Badge>
              )}
            </Td>
            <Td>
              <LinkButton
                className="mr-1"
                data-toggle="tooltip"
                data-placement="top"
                title="Shipment Log Detail"
                tag={Link}
                to={`/shipment-logs/${log.logID}`}
                onClick={() => {
                  onActionClick('0', '', '', index);
                }}
              >
                <Info size="12" />
              </LinkButton>
              <LinkButton
                className="mr-1"
                data-toggle="tooltip"
                data-placement="top"
                title="Shipment Detail"
                tag={Link}
                to={`/shipment-logs/shipment/${log.shipmentID}`}
                onClick={() => {
                  onActionClick('0', '', '', index);
                }}
              >
                <Truck size="12" />
              </LinkButton>
              <LinkButton
                data-toggle="tooltip"
                data-placement="top"
                title="Request"
                className="mr-1"
                onClick={() => {
                  const header = 'Shipment Request';
                  onActionClick(log.logID, header, 'request', index);
                }}
              >
                <SignInAlt size="12" />
              </LinkButton>
              <LinkButton
                data-toggle="tooltip"
                data-placement="top"
                title="Response"
                className="mr-1"
                onClick={() => {
                  const header = 'Shipment Response';
                  onActionClick(log.logID, header, 'response', index);
                }}
              >
                <SignOutAlt
                  style={{
                    transform: 'rotate(180deg)',
                  }}
                  size="12"
                />
              </LinkButton>
            </Td>
          </Tr>
        ))}
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
  return (
    <React.Fragment>
      <Tr>
        <Td colSpan="9">No Data Available</Td>
      </Tr>
    </React.Fragment>
  );
}

ShipmentLogsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  logs: PropTypes.array,
  rowStart: PropTypes.number,
  selectedRow: PropTypes.number,
  onActionClick: PropTypes.func,
  resetTableRow: PropTypes.func,
};

function SelectCountry(data) {
  let countryCode = '';
  let countryName = '';
  if (data.log.pickUp !== null) {
    countryCode = data.log.pickUp;
    countryName = data.log.pickUpText;
  } else if (data.log.shipper !== null) {
    countryCode = data.log.shipper;
    countryName = data.log.shipperText;
  } else if (data.log.sender !== null) {
    countryCode = data.log.sender;
    countryName = data.log.senderText;
  }
  return <Badge title={countryName}>{countryCode}</Badge>;
}

function Status(props) {
  if (props.status === 'Failure') {
    return (
      <React.Fragment>
        <Badge color="danger">
          <b>{`${props.status}`}</b>
        </Badge>{' '}
        &nbsp;
      </React.Fragment>
    );
  }
  if (props.status === 'Warning') {
    return (
      <React.Fragment>
        <Badge color="warning">
          <b>{`${props.status}`}</b>
        </Badge>{' '}
        &nbsp;
      </React.Fragment>
    );
  }
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

StatusToolTip.propTypes = {
  isShowToolTip: PropTypes.bool,
  target: PropTypes.string,
  errorSource: PropTypes.string,
  serviceError: PropTypes.string,
  applicationError: PropTypes.string,
};
