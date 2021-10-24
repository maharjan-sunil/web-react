/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/func-names */
import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Edit } from '@styled-icons/fa-regular/Edit';
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
} from '@bootstrap-styled/v4';

import LinkButton from 'components/LinkButton';
import StyledTable from 'components/Table';
import Dialog from 'components/Page/Dialog';
import LoaderIndicator, { ActionLoader } from 'components/Loader';

import {
  makeSelectResult,
  makeSelectActionLoader,
  makeSelectRow,
} from './selectors';
import { reducer } from './reducer';
import saga from './saga';
import {
  deleteUserAction,
  restoreUserAction,
  permanentDeleteUserAction,
  resetResultAction,
  selectRowAction,
} from './actions';

export function users({
  response,
  onDelete,
  onRestore,
  onPermanentDelete,
  onSelectRow,
  result,
  onSuccess,
  loading,
  actionLoading,
  rowStart,
  selectedRow,
}) {
  useInjectReducer({ key: 'userPage', reducer });
  useInjectSaga({ key: 'userPage', saga });
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
  if (loading) {
    return <LoaderIndicator />;
  }
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
    }
  };

  function resetTableRow(delay) {
    setTimeout(() => {
      onSelectRow(-1);
    }, delay);
  }

  const onActionClick = (userId, header, confirm, content, status, rowNum) => {
    if (status > 0) {
      setDialogProps({
        isShowDialog: true,
        dialogHeader: header,
        dialogConfirm: confirm,
        dialogContent: content,
        dataStatus: status,
        id: userId,
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
                <Th>S/N</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Mobile</Th>
                <Th>Gender</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              <UsersList
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

function UsersList({
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
  if (response.length > 0) {
    if (selectedRow >= 0) {
      resetTableRow(5000);
    }
    const usersArray = response || [];
    return (
      <React.Fragment>
        {usersArray.map((user, i) => (
          <Tr key={i} className={selectedRow === i ? 'active' : ''}>
            <Td>{i + rowStart}</Td>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{user.mobile}</Td>
            <Td>{user.genderText}</Td>
            <Td>
              <LinkButton
                className="mr-1"
                data-toggle="tooltip"
                data-placement="top"
                title="Detail"
                tag={Link}
                to={`/users/${user.id}`}
                onClick={() => {
                  onActionClick('', '', '', '', 0, i);
                }}
              >
                <Info size="12" />
              </LinkButton>
              {user.dataStatus !== 3 && (
                <React.Fragment>
                  <LinkButton
                    className="mr-1"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Edit"
                    tag={Link}
                    to={`/users/edit/${user.id}`}
                    onClick={() => {
                      onActionClick('', '', '', '', 0, i);
                    }}
                  >
                    <Edit size="12" />
                  </LinkButton>
                  <Button
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete"
                    className="mr-1"
                    onClick={() => {
                      const header = 'Delete User';
                      const confirm = 'Are you sure, do want to delete user?';
                      const content = [{ label: 'Name', value: user.name }];
                      onActionClick(user.id, header, confirm, content, 3, i);
                    }}
                  >
                    <Trash size="12" />
                  </Button>
                </React.Fragment>
              )}
              {user.dataStatus === 3 && (
                <React.Fragment>
                  <Button
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Restore"
                    className="mr-1"
                    onClick={() => {
                      const header = 'Restore User';
                      const confirm = 'Are you sure, do want to restore user?';
                      const content = [{ label: 'Name', value: user.name }];
                      onActionClick(user.id, header, confirm, content, 4, i);
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
                        'Are you sure, do want to permanently delete user?';
                      const content = [{ label: 'Name', value: user.name }];
                      onActionClick(user.id, header, confirm, content, 5, i);
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
        <Td colSpan="5">No Data Available</Td>
      </Tr>
    </React.Fragment>
  );
}

users.propTypes = {
  response: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  onDelete: PropTypes.func,
  onRestore: PropTypes.func,
  onPermanentDelete: PropTypes.func,
  onSelectRow: PropTypes.func,
  result: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
  actionLoading: PropTypes.bool,
  rowStart: PropTypes.number,
  selectedRow: PropTypes.number,
};

UsersList.propTypes = {
  response: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  loading: PropTypes.bool,
  rowStart: PropTypes.number,
  selectedRow: PropTypes.number,
  onActionClick: PropTypes.func,
  resetTableRow: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  result: makeSelectResult(),
  actionLoading: makeSelectActionLoader(),
  selectedRow: makeSelectRow(),
});

function mapDispatchToProps(dispatch) {
  return {
    onDelete: id => {
      dispatch(deleteUserAction(id));
    },
    onRestore: id => {
      dispatch(restoreUserAction(id));
    },
    onPermanentDelete: id => {
      dispatch(permanentDeleteUserAction(id));
    },
    onSuccess: () => {
      dispatch(resetResultAction());
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
)(users);
