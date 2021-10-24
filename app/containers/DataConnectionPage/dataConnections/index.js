import React, { useState } from 'react';
import Dialog from 'components/Page/Dialog';
import { ActionLoader } from 'components/Loader';
import { Thead, Th, Tbody, Tr } from '@bootstrap-styled/v4';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import StyledTable from 'components/Table';
import DataConnectionList from 'containers/DataConnectionPage/dataConnections/DataConnectionList';
import messages from '../messages';
export default function DataConnections(props) {
  const [
    {
      isShowDialog,
      dialogHeader,
      dialogConfirm,
      dialogContent,
      dataStatus,
      id,
      rowIndex,
    },
    setDialogProps,
  ] = useState({
    isShowDialog: false,
    dialogHeader: '',
    dialogConfirm: '',
    dialogContent: [],
    dataStatus: 0,
    id: 0,
    rowIndex: 0,
  });

  const closeHandler = () => {
    if (isShowDialog) {
      setDialogProps({
        isShowDialog: false,
        dialogHeader: '',
        dialogConfirm: '',
        dialogContent: [],
        dataStatus: 0,
        id: 0,
        rowIndex: 0,
      });
      resetTableRow(5000);
    }
  };

  const okHandler = async () => {
    if (dataStatus === 1) {
      props.resetDataConnection(id, rowIndex);
    }
    closeHandler();
  };

  function resetTableRow(delay) {
    setTimeout(() => {
      props.onSelectRow(-1);
    }, delay);
  }

  const onActionClick = (
    dataConnectionId,
    header,
    confirm,
    content,
    status,
    rowNum,
  ) => {
    if (status > 0) {
      setDialogProps({
        isShowDialog: true,
        dialogHeader: header,
        dialogConfirm: confirm,
        dialogContent: content,
        dataStatus: status,
        id: dataConnectionId,
        rowIndex: rowNum,
      });
    }
    props.onSelectRow(rowNum);
  };
  return (
    <React.Fragment>
      <StyledTable>
        <Thead>
          <Tr>
            <Th>
              <FormattedMessage {...messages.sno} />
            </Th>
            <Th>
              {' '}
              <FormattedMessage {...messages.siteName} />
            </Th>
            <Th>
              {' '}
              <FormattedMessage {...messages.carrier} />
            </Th>
            <Th>
              {' '}
              <FormattedMessage {...messages.awb} />
            </Th>
            <Th>
              <FormattedMessage {...messages.carrierAccount} />
            </Th>
            <Th>
              <FormattedMessage {...messages.fileExtractedDateTime} />
            </Th>
            <Th>
              <FormattedMessage {...messages.lastUpdatedDateTime} />
            </Th>
            <Th>
              <FormattedMessage {...messages.processStatus} />
            </Th>
            <Th>
              <FormattedMessage {...messages.actions} />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <DataConnectionList
            loading={props.loading}
            error={props.error}
            response={props.response}
            rowStart={props.rowStart}
            resetDataConnection={props.resetDataConnection}
            selectedRow={props.selectedRow}
            onSelectRow={props.onSelectRow}
            onActionClick={onActionClick}
            resetTableRow={resetTableRow}
          />
        </Tbody>
      </StyledTable>
      {props.loading && <ActionLoader />}
      <Dialog
        isShowDialog={isShowDialog}
        closeHandler={closeHandler}
        dialogHeader={dialogHeader}
        dialogConfirm={dialogConfirm}
        dialogContent={dialogContent}
        okHandler={okHandler}
      />
    </React.Fragment>
  );
}
DataConnections.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  resetDataConnection: PropTypes.func,
  selectedRow: PropTypes.number,
  onSelectRow: PropTypes.func,
  response: PropTypes.array,
  rowStart: PropTypes.number,
};
