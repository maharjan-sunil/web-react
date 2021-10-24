/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Th, Tr, Td, Badge, A } from '@bootstrap-styled/v4';
import { StatusToolTip } from './ToolTip';

export default function Processes({ response }) {
  if (response.length > 0) {
    const processesArray = response || [];
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
        <Tr className="tr_body">
          <Th />
          <Th>PId</Th>
          <Th>Name</Th>
          <Th>Date</Th>
          <Th colSpan="4">Status</Th>
        </Tr>
        {processesArray.map((invoiceDetail, i) => (
          <Tr key={i} className="tr_body sub-row">
            <Td />
            <Td>{invoiceDetail.id}</Td>
            <Td>{invoiceDetail.activityText}</Td>
            <Td>{invoiceDetail.activityDateTimeText}</Td>
            <Td colSpan="4">
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
                  <Badge color="danger">
                    <b>{`${invoiceDetail.statusText}`}</b>
                  </Badge>
                  &nbsp;
                </A>
              ) : (
                <Badge color="success">{invoiceDetail.statusText}</Badge>
              )}
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
}

Processes.propTypes = {
  response: PropTypes.array,
};
