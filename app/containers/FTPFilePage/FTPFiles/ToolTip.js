import React from 'react';
import { Tooltip } from '@bootstrap-styled/v4';
import PropTypes from 'prop-types';

export function StatusToolTip({
  isShowToolTip,
  target,
  errorSource,
  serviceError,
  applicationError,
}) {
  return (
    <React.Fragment>
      <Tooltip
        placement="right"
        isOpen={isShowToolTip}
        target={target}
        delay={{ shape: 0, hide: 100 }}
      >
        <b>{`[${errorSource}]`}</b>&nbsp;
        <div>{`${serviceError}`}</div>
        <b>[Application]</b>&nbsp;<div>{`${applicationError}`}</div>
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
