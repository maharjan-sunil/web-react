import React, { useState } from 'react';
import { Thead, Th, Tbody, Tr } from '@bootstrap-styled/v4';
import StyledTable from 'components/Table';
import Dialog from 'components/Page/Dialog';
import PropTypes from 'prop-types';

import FileErrorLogList from 'containers/FileErrorLogPage/FileErrorLogs/FileErrorLogList';

export default function FileErrors({
  loading,
  records,
  rowStart,
  onDelete,
  selectedRow,
  onSelectRow,
}) {
  const [
    {
      isShowDialog,
      dialogHeader,
      dialogConfirm,
      dialogContent,
      dataStatus,
      id,
    },
    setDialogProps,
  ] = useState({
    isShowDialog: false,
    dialogHeader: '',
    dialogConfirm: '',
    dialogContent: [],
    dataStatus: 0,
    id: 0,
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
      });
      resetTableRow(5000);
    }
  };

  const onActionClick = (fileId, header, confirm, content, status, rowNum) => {
    setDialogProps({
      isShowDialog: true,
      dialogHeader: header,
      dialogConfirm: confirm,
      dialogContent: content,
      dataStatus: status,
      id: fileId,
    });
    onSelectRow(rowNum);
  };

  function resetTableRow(delay) {
    setTimeout(() => {
      onSelectRow(-1);
    }, delay);
  }

  const okHandler = async () => {
    if (dataStatus === 3) {
      onDelete(id);
    }
  };

  return (
    <React.Fragment>
      <StyledTable>
        <Thead>
          <Tr>
            <Th>S/N</Th>
            <Th>Site</Th>
            <Th>File</Th>
            <Th>Carrier</Th>
            <Th>Product</Th>
            <Th>AWB</Th>
            <Th>Log Date</Th>
            <Th>Status</Th>
            <Th style={{ width: '200px' }}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          <FileErrorLogList
            loading={loading}
            records={records}
            rowStart={rowStart}
            selectedRow={selectedRow}
            resetTableRow={resetTableRow}
            onActionClick={onActionClick}
          />
        </Tbody>
      </StyledTable>
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

FileErrors.propTypes = {
  loading: PropTypes.bool,
  records: PropTypes.array,
  rowStart: PropTypes.number,
  selectedRow: PropTypes.number,
  onDelete: PropTypes.func,
  onSelectRow: PropTypes.func,
};
