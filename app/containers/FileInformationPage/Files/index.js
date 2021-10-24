import React, { useState } from 'react';
import { Thead, Th, Tbody, Tr } from '@bootstrap-styled/v4';
import StyledTable from 'components/Table';
import Dialog from 'components/Page/Dialog';
import PropTypes from 'prop-types';

import FileList from 'containers/FileInformationPage/Files/FileList';
import PopUp from 'containers/FileInformationPage/Files/PopUp';

export default function Files({
  loading,
  contentLoading,
  records,
  rowStart,
  onContent,
  fileContent,
  onReextract,
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

  const [{ isShowPopUp, popUpTitle }, setPopUpProps] = useState({
    isShowPopUp: false,
    popUpTitle: '',
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
    if (isShowPopUp) {
      setPopUpProps({
        isShowPopUp: false,
        popUpTitle: '',
      });
    }
  };

  const onActionClick = (fileId, header, confirm, content, status, rowNum) => {
    if (status === 5) {
      setPopUpProps({
        isShowPopUp: true,
        popUpTitle: header,
      });
      onContent(fileId);
    } else {
      setDialogProps({
        isShowDialog: true,
        dialogHeader: header,
        dialogConfirm: confirm,
        dialogContent: content,
        dataStatus: status,
        id: fileId,
      });
    }
    onSelectRow(rowNum);
  };

  function resetTableRow(delay) {
    setTimeout(() => {
      onSelectRow(-1);
    }, delay);
  }

  const okHandler = async () => {
    if (dataStatus === 4) {
      onReextract(id);
    }
  };

  return (
    <React.Fragment>
      <StyledTable>
        <Thead>
          <Tr>
            <Th>S/N</Th>
            <Th>File</Th>
            <Th>Site</Th>
            <Th>Carrier</Th>
            <Th>Created At</Th>
            <Th>Scans</Th>
            <Th>Data Connections</Th>
            <Th>Not Mapped</Th>
            <Th style={{ width: '200px' }}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          <FileList
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
      <PopUp
        loading={contentLoading}
        isShowPopUp={isShowPopUp}
        onClose={closeHandler}
        title={popUpTitle}
        data={fileContent}
      />
    </React.Fragment>
  );
}

Files.propTypes = {
  loading: PropTypes.bool,
  contentLoading: PropTypes.bool,
  records: PropTypes.array,
  rowStart: PropTypes.number,
  selectedRow: PropTypes.number,
  fileContent: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onContent: PropTypes.func,
  onReextract: PropTypes.func,
  onSelectRow: PropTypes.func,
};
