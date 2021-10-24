import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Th, Tr, Td, Badge, A } from '@bootstrap-styled/v4';
import { StatusToolTip } from './ToolTip';

export default function Processes({ response }) {
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

  if (response != null && response.length > 0) {
    const processesArray = response || [];
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
        <Tr className="tr_body">
          <Th />
          <Th>PId</Th>
          <Th>Name</Th>
          <Th>Date</Th>
          <Th colSpan="4">Status</Th>
        </Tr>
        {processesArray.map(process => (
          <Tr key={process.id} className="tr_body sub-row">
            <Td />
            <Td>{process.id}</Td>
            <Td>{process.activityText}</Td>
            <Td>{process.activityDateTimeText}</Td>
            <Td colSpan="4">
              <SetStatus
                status={process.status}
                statusText={process.statusText}
                activityText={process.activityText}
                errorMessage={
                  process.ftpFileActivityErrorLogs !== null
                    ? process.ftpFileActivityErrorLogs[0].errorMessage
                    : ''
                }
                toolTipHandler={toolTipHandler}
              />
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
      <Tr className="tr_body">
        <Th />
        <Th>PId</Th>
        <Th>Name</Th>
        <Th>Date</Th>
        <Th colSpan="4">Status</Th>
      </Tr>
      <Tr>
        <Td colSpan="5">No Processes Found</Td>
      </Tr>
    </React.Fragment>
  );
}

function SetStatus({
  status,
  statusText,
  activityText,
  errorMessage,
  toolTipHandler,
}) {
  if (status === 1) {
    return (
      <React.Fragment>
        <Badge color="info">{statusText}</Badge>
      </React.Fragment>
    );
  }
  if (status === 2) {
    return (
      <React.Fragment>
        <Badge color="success">{statusText}</Badge>
      </React.Fragment>
    );
  }
  if (status === 3) {
    return (
      <React.Fragment>
        <A
          id={`target_${process.id}`}
          onMouseEnter={() => {
            toolTipHandler(
              true,
              `target_${process.id}`,
              activityText,
              errorMessage,
              '',
            );
          }}
          onMouseLeave={() => {
            toolTipHandler(false, '', '', '', '', '');
          }}
        >
          <Badge color="danger">
            <b>{`${statusText}`}</b>
          </Badge>
          &nbsp;
        </A>
      </React.Fragment>
    );
  }
}

SetStatus.propTypes = {
  status: PropTypes.number,
  statusText: PropTypes.string,
  activityText: PropTypes.string,
  errorMessage: PropTypes.string,
  toolTipHandler: PropTypes.func,
};

Processes.propTypes = {
  response: PropTypes.array,
};
