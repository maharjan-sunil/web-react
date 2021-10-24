import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Thead, Th, Tbody, Tr } from '@bootstrap-styled/v4';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import StyledTable from 'components/Table';
import ShipmentLogsList from 'containers/ShipmentLogPage/ShipmentLogs/ShipmentLogsList';
import PopUps from 'containers/ShipmentLogPage/ShipmentLogs/PopUps';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectRequest,
  makeSelectResponse,
  makeSelectRequestResponse,
  makeSelectRow,
} from 'containers/ShipmentLogPage/selectors';
import {
  getShipmentLogsRequestAction,
  getShipmentLogsResponseAction,
  selectRowAction,
} from 'containers/ShipmentLogPage/actions';
import reducer from 'containers/ShipmentLogPage/reducer';
import saga from 'containers/ShipmentLogPage/saga';

export function ShipmentLogs({
  loading,
  error,
  logs,
  onRequest,
  onResponse,
  requestResponse,
  rowStart,
  selectedRow,
  onSelectRow,
}) {
  useInjectReducer({ key: 'logPage', reducer });
  useInjectSaga({ key: 'logPage', saga });

  const [{ isShowDialog, dialogHeader }, setDialogProps] = useState({
    isShowDialog: false,
    dialogHeader: '',
  });

  const closeHandler = () => {
    if (isShowDialog) {
      setDialogProps({
        isShowDialog: false,
        dialogHeader: '',
        type: '',
      });
      resetTableRow(5000);
    }
  };

  function resetTableRow(delay) {
    setTimeout(() => {
      onSelectRow(-1);
    }, delay);
  }

  const onActionClick = (logId, header, contentType, rowNum) => {
    if (logId > 0 && contentType !== '') {
      if (contentType === 'request') {
        onRequest(logId);
      } else if (contentType === 'response') {
        onResponse(logId);
      }
      setDialogProps({
        isShowDialog: true,
        dialogHeader: header,
      });
    }
    onSelectRow(rowNum);
  };

  return (
    <React.Fragment>
      <StyledTable>
        <Thead>
          <Tr>
            <Th>S/N</Th>
            <Th>Site</Th>
            <Th>Product</Th>
            <Th>Ship Date</Th>
            <Th>Status</Th>
            <Th style={{ width: '200px' }}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          <ShipmentLogsList
            loading={loading}
            error={error}
            logs={logs}
            onActionClick={onActionClick}
            rowStart={rowStart}
            selectedRow={selectedRow}
            resetTableRow={resetTableRow}
          />
        </Tbody>
      </StyledTable>
      <PopUps
        showModal={isShowDialog}
        handleClose={closeHandler}
        title={dialogHeader}
        data={requestResponse}
      />
    </React.Fragment>
  );
}

ShipmentLogs.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  logs: PropTypes.array,
  onRequest: PropTypes.func,
  onResponse: PropTypes.func,
  requestResponse: PropTypes.object,
  rowStart: PropTypes.number,
  selectedRow: PropTypes.number,
  onSelectRow: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  shipmentRequest: makeSelectRequest(),
  shipmentResponse: makeSelectResponse(),
  requestResponse: makeSelectRequestResponse(),
  selectedRow: makeSelectRow(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onRequest: logid => {
      dispatch(getShipmentLogsRequestAction(logid));
    },
    onResponse: logid => {
      dispatch(getShipmentLogsResponseAction(logid));
    },
    onSelectRow: selectedRow => {
      dispatch(selectRowAction(selectedRow));
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
)(ShipmentLogs);
