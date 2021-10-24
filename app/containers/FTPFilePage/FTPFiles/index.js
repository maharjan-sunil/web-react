import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Row, Col, Thead, Th, Tr } from '@bootstrap-styled/v4';
import StyledExpandTable from 'components/Table/StyledExpandTable';
import Dialog from 'components/Page/Dialog';
import { ActionLoader } from 'components/Loader';

import {
  makeSelectResult,
  makeSelectActionLoader,
  makeSelectFileContent,
} from 'containers/FTPFilePage/selectors';
import { reducer } from 'containers/FTPFilePage/reducer';
import saga from 'containers/FTPFilePage/saga';
import {
  deleteFTPFileAction,
  restoreFTPFileAction,
  permanentDeleteFTPFileAction,
  resetResultAction,
  resendFTPFileAction,
  downloadFTPFileAction,
} from 'containers/FTPFilePage/actions';

import FTPFilesList from './FTPFilesList';

function FTPFiles({
  loading,
  ftpFiles,
  rowStart,
  onDelete,
  onRestore,
  onPermanentDelete,
  result,
  onSuccess,
  actionLoading,
  onResend,
  onDownload,
  fileContent,
}) {
  useInjectReducer({ key: 'invoicePage', reducer });
  useInjectSaga({ key: 'invoicePage', saga });
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
    }
  };

  if (result > 0) {
    closeHandler();
    onSuccess();
  }

  const okHandler = async () => {
    if (dataStatus === 3) {
      onDelete(id);
    } else if (dataStatus === 4) {
      onRestore(id);
    } else if (dataStatus === 5) {
      onPermanentDelete(id);
    } else if (dataStatus === 6) {
      onResend(id);
    }
  };

  const onActionClick = (invoiceId, header, confirm, content, status) => {
    setDialogProps({
      isShowDialog: true,
      dialogHeader: header,
      dialogConfirm: confirm,
      dialogContent: content,
      dataStatus: status,
      id: invoiceId,
    });
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <StyledExpandTable>
            <Thead>
              <Tr>
                <Th className="tr_icon" />
                <Th>S/N</Th>
                <Th>Site</Th>
                <Th>Carrier</Th>
                <Th>Product</Th>
                <Th>File Name</Th>
                <Th>Task Name</Th>
                <Th>Date Time</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <FTPFilesList
              loading={loading}
              ftpFiles={ftpFiles}
              onActionClick={onActionClick}
              rowStart={rowStart}
              onResend={onResend}
              onDownload={onDownload}
              fileContent={fileContent}
            />
          </StyledExpandTable>
          {actionLoading && <ActionLoader />}
          <Dialog
            isShowDialog={isShowDialog}
            closeHandler={closeHandler}
            dialogHeader={dialogHeader}
            dialogConfirm={dialogConfirm}
            dialogContent={dialogContent}
            okHandler={okHandler}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

FTPFiles.propTypes = {
  ftpFiles: PropTypes.array,
  onDelete: PropTypes.func,
  onRestore: PropTypes.func,
  onPermanentDelete: PropTypes.func,
  result: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
  actionLoading: PropTypes.bool,
  rowStart: PropTypes.number,
  onResend: PropTypes.func,
  onDownload: PropTypes.func,
  fileContent: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  result: makeSelectResult(),
  actionLoading: makeSelectActionLoader(),
  fileContent: makeSelectFileContent(),
});

function mapDispatchToProps(dispatch) {
  return {
    onResend: id => {
      dispatch(resendFTPFileAction(id));
    },
    onDelete: id => {
      dispatch(deleteFTPFileAction(id));
    },
    onRestore: id => {
      dispatch(restoreFTPFileAction(id));
    },
    onDownload: id => {
      dispatch(downloadFTPFileAction(id));
    },
    onPermanentDelete: id => {
      dispatch(permanentDeleteFTPFileAction(id));
    },
    onSuccess: () => {
      dispatch(resetResultAction());
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
)(FTPFiles);
