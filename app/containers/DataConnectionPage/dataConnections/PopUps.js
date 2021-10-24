import React from 'react';
import { Badge } from '@bootstrap-styled/v4';

import IconStatus from 'components/IconStatus';
import Tooltip from 'components/Tooltip';

import { Plug } from '@styled-icons/fa-solid/Plug';
import { ExchangeAlt } from '@styled-icons/fa-solid/ExchangeAlt';

import PropTypes from 'prop-types';

export function Status({ status, dataConnErrorMsg }) {
  if (status === 'Success') {
    return (
      <React.Fragment>
        <Tooltip content="Data Connection Status: Success" direction="bottom">
          <IconStatus className="success">
            <ExchangeAlt />
          </IconStatus>
        </Tooltip>
      </React.Fragment>
    );
  }
  if (status === null) {
    return (
      <React.Fragment>
        <Tooltip
          content="Data Connection Status: Not Called"
          direction="bottom"
        >
          <IconStatus className="disabled">
            <ExchangeAlt />
          </IconStatus>
        </Tooltip>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Tooltip
        content={`Data Connection Status: [${status}] ${dataConnErrorMsg}`}
        direction="bottom"
      >
        <IconStatus className="danger">
          <ExchangeAlt />
        </IconStatus>
      </Tooltip>
    </React.Fragment>
  );
}

export function ProcessStatus({ status }) {
  if (status) {
    return (
      <React.Fragment>
        <Tooltip content="Data Connection: Processed" direction="bottom">
          <IconStatus className="success">
            <Plug />
          </IconStatus>
        </Tooltip>
      </React.Fragment>
    );
  }
  if (status === null) {
    return (
      <React.Fragment>
        <Tooltip content="Data Connection: Not Called" direction="bottom">
          <IconStatus className="disabled">
            <Plug />
          </IconStatus>
        </Tooltip>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Tooltip content="Data Connection: Not Processed" direction="bottom">
        <IconStatus className="danger">
          <Plug />
        </IconStatus>
      </Tooltip>
    </React.Fragment>
  );
}

export function StatusToolTipMessage({
  isShowToolTipMessage,
  targetMessage,
  sourceMessage,
}) {
  if (sourceMessage != null && sourceMessage) {
    return (
      <React.Fragment>
        <Tooltip
          placement="right"
          isOpen={isShowToolTipMessage}
          target={targetMessage}
          delay={{ shape: 0, hide: 100 }}
        >
          <div>{`${sourceMessage}`}</div>
        </Tooltip>
      </React.Fragment>
    );
  }
  return null;
}
Status.propTypes = {
  status: PropTypes.string,
};
ProcessStatus.propTypes = {
  status: PropTypes.bool,
};
StatusToolTipMessage.propTypes = {
  isShowToolTipMessage: PropTypes.bool,
  targetMessage: PropTypes.string,
  sourceMessage: PropTypes.string,
};
