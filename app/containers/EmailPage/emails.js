/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable indent */
import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PaperPlane } from '@styled-icons/fa-regular/PaperPlane';
import { Trash } from '@styled-icons/fa-solid/Trash';
import { TrashRestore } from '@styled-icons/fa-solid/TrashRestore';
import { Info } from '@styled-icons/fa-solid/Info';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import TableLoader from 'components/TableLoadingIndicator';
import {
  Row,
  Col,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Button,
  Badge,
} from '@bootstrap-styled/v4';

import LinkButton from 'components/LinkButton';
import StyledTable from 'components/Table';
import Dialog from 'components/Page/Dialog';
import { ActionLoader } from 'components/Loader';
import {
  makeSelectResult,
  makeSelectActionLoader,
  makeSelectRow,
} from './selectors';
import { reducer } from './reducer';
import saga from './saga';
import {
  deleteEmailAction,
  restoreEmailAction,
  permanentDeleteEmailAction,
  resetResultAction,
  resendEmailAction,
  selectRowAction,
} from './actions';
export function emails({
  response,
  onDelete,
  onRestore,
  onPermanentDelete,
  onSelectRow,
  result,
  onSuccess,
  loading,
  actionLoading,
  onResend,
  rowStart,
  selectedRow,
}) {
  useInjectReducer({ key: 'emailPage', reducer });
  useInjectSaga({ key: 'emailPage', saga });
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

  if (result.result > 0) {
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

  function resetTableRow(delay) {
    setTimeout(() => {
      onSelectRow(-1);
    }, delay);
  }

  const onActionClick = (emailId, header, confirm, content, status, rowNum) => {
    if (status > 0) {
      setDialogProps({
        isShowDialog: true,
        dialogHeader: header,
        dialogConfirm: confirm,
        dialogContent: content,
        dataStatus: status,
        id: emailId,
      });
    }
    onSelectRow(rowNum);
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <StyledTable>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Site</Th>
                <Th>AWB</Th>
                <Th>Type</Th>
                <Th>Subject</Th>
                <Th>Sender</Th>
                <Th>Receiver</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              <EmailsList
                response={response}
                loading={loading}
                onActionClick={onActionClick}
                rowStart={rowStart}
                selectedRow={selectedRow}
                resetTableRow={resetTableRow}
              />
            </Tbody>
          </StyledTable>
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

function EmailsList({
  response,
  loading,
  rowStart,
  selectedRow,
  onActionClick,
  resetTableRow,
}) {
  if (loading) {
    return <TableLoader />;
  }

  function getStatus(status, statusText) {
    if (status === 4) {
      return (
        <React.Fragment>
          <Badge color="success">{statusText}</Badge>
        </React.Fragment>
      );
    }
    if (status === 3) {
      return (
        <React.Fragment>
          <Badge color="danger">{statusText}</Badge>
        </React.Fragment>
      );
    }
    if (status === 2) {
      return (
        <React.Fragment>
          <Badge color="primary">{statusText}</Badge>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Badge color="secondary">{statusText}</Badge>
      </React.Fragment>
    );
  }

  if (response.length > 0) {
    if (selectedRow >= 0) {
      resetTableRow(5000);
    }
    const emailsArray = response || [];
    return (
      <React.Fragment>
        {emailsArray.map((email, i) => (
          <Tr key={i} className={selectedRow === i ? 'active' : ''}>
            <Td>{i + rowStart}</Td>
            <Td>{email.applicationName}</Td>
            <Td>{email.awb}</Td>
            <Td>{email.typeText}</Td>
            <Td>{email.subject}</Td>
            <Td>{email.emailSender}</Td>
            <Td>{email.to}</Td>
            <Td>{email.emailDateTimeText}</Td>
            <Td>{getStatus(email.status, email.statusText)}</Td>
            <Td>
              <LinkButton
                className="mr-1"
                data-toggle="tooltip"
                data-placement="top"
                title="Detail"
                tag={Link}
                to={`/emails/${email.id}`}
                onClick={() => {
                  onActionClick('', '', '', '', 0, i);
                }}
              >
                <Info size="12" />
              </LinkButton>
              {email.status === 1 ||
              (email.status === 3 && email.dataStatus !== 3) ? (
                <React.Fragment>
                  <Button
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Resend"
                    className="mr-1"
                    onClick={() => {
                      const header = 'Resend email';
                      const confirm = 'Are you sure, do want to resend email?';
                      const content = [{ label: 'Name', value: email.id }];
                      onActionClick(email.id, header, confirm, content, 6, i);
                    }}
                  >
                    <PaperPlane size="12" />
                  </Button>
                </React.Fragment>
              ) : (
                ''
              )}
              {email.dataStatus !== 3 && (
                <React.Fragment>
                  <Button
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete"
                    className="mr-1"
                    onClick={() => {
                      const header = 'Delete email';
                      const confirm = 'Are you sure, do want to delete email?';
                      const content = [{ label: 'Name', value: email.id }];
                      onActionClick(email.id, header, confirm, content, 3, i);
                    }}
                  >
                    <Trash size="12" />
                  </Button>
                </React.Fragment>
              )}
              {email.dataStatus === 3 && (
                <React.Fragment>
                  <Button
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Restore"
                    className="mr-1"
                    onClick={() => {
                      const header = 'Restore email';
                      const confirm = 'Are you sure, do want to restore email?';
                      const content = [{ label: 'Name', value: email.id }];
                      onActionClick(email.id, header, confirm, content, 4, i);
                    }}
                  >
                    <TrashRestore size="12" />
                  </Button>
                  <Button
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Permanent Delete"
                    className="mr-1"
                    color="danger"
                    onClick={() => {
                      const header = 'Permanent Delete';
                      const confirm =
                        'Are you sure, do want to permanently delete email?';
                      const content = [{ label: 'Email', value: email.id }];
                      onActionClick(email.id, header, confirm, content, 5, i);
                    }}
                  >
                    <Trash size="12" />
                  </Button>
                </React.Fragment>
              )}
            </Td>
          </Tr>
        ))}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Tr>
        <Td colSpan="9">No Data Available</Td>
      </Tr>
    </React.Fragment>
  );
}

EmailsList.propTypes = {
  response: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  loading: PropTypes.bool,
  rowStart: PropTypes.number,
  selectedRow: PropTypes.number,
  onActionClick: PropTypes.func,
  resetTableRow: PropTypes.func,
};
emails.propTypes = {
  response: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  onDelete: PropTypes.func,
  onRestore: PropTypes.func,
  onResend: PropTypes.func,
  onPermanentDelete: PropTypes.func,
  onSelectRow: PropTypes.func,
  result: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
  actionLoading: PropTypes.bool,
  rowStart: PropTypes.number,
  selectedRow: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  result: makeSelectResult(),
  actionLoading: makeSelectActionLoader(),
  selectedRow: makeSelectRow(),
});

function mapDispatchToProps(dispatch) {
  return {
    onDelete: id => {
      dispatch(deleteEmailAction(id));
    },
    onRestore: id => {
      dispatch(restoreEmailAction(id));
    },
    onPermanentDelete: id => {
      dispatch(permanentDeleteEmailAction(id));
    },
    onSuccess: () => {
      dispatch(resetResultAction());
    },
    onResend: id => {
      dispatch(resendEmailAction(id));
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
)(emails);
