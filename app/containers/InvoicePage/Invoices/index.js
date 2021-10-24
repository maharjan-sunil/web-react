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
} from 'containers/InvoicePage/selectors';
import { reducer } from 'containers/InvoicePage/reducer';
import saga from 'containers/InvoicePage/saga';
import {
  deleteInvoiceAction,
  restoreInvoiceAction,
  permanentDeleteInvoiceAction,
  resetResultAction,
  revalidateInvoiceAction,
  reviewInvoiceAction,
  resendInvoiceAction,
  downloadInvoiceAction,
} from 'containers/InvoicePage/actions';
import InvoiceList from './invoiceList';

export function Invoices({
  loading,
  response,
  rowStart,
  onDelete,
  onRestore,
  onPermanentDelete,
  result,
  onSuccess,
  actionLoading,
  onRevalidate,
  onReview,
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
      onRevalidate(id);
    } else if (dataStatus === 7) {
      onResend(id);
    } else if (dataStatus === 8) {
      onReview(id);
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
                <Th>Pickup Date</Th>
                <Th>File Name</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <InvoiceList
              loading={loading}
              response={response}
              onActionClick={onActionClick}
              rowStart={rowStart}
              onRevalidate={onRevalidate}
              onReview={onReview}
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

Invoices.propTypes = {
  response: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  onDelete: PropTypes.func,
  onRestore: PropTypes.func,
  onPermanentDelete: PropTypes.func,
  result: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
  actionLoading: PropTypes.bool,
  rowStart: PropTypes.number,
  onRevalidate: PropTypes.func,
  onReview: PropTypes.func,
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
    onRevalidate: id => {
      dispatch(revalidateInvoiceAction(id));
    },
    onReview: id => {
      dispatch(reviewInvoiceAction(id));
    },
    onResend: id => {
      dispatch(resendInvoiceAction(id));
    },
    onDelete: id => {
      dispatch(deleteInvoiceAction(id));
    },
    onRestore: id => {
      dispatch(restoreInvoiceAction(id));
    },
    onDownload: id => {
      dispatch(downloadInvoiceAction(id));
    },
    onPermanentDelete: id => {
      dispatch(permanentDeleteInvoiceAction(id));
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
)(Invoices);
