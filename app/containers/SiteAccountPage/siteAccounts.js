/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import LinkButton from 'components/LinkButton';
import { Edit } from '@styled-icons/fa-regular/Edit';
import { Trash } from '@styled-icons/fa-solid/Trash';
import { Info } from '@styled-icons/fa-solid/Info';
import { TrashRestore } from '@styled-icons/fa-solid/TrashRestore';
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

import StyledTable from 'components/Table';
import Dialog from 'components/Page/Dialog';
import { ActionLoader } from 'components/Loader';
import TableLoader from 'components/TableLoadingIndicator';
import { makeSelectResult, makeSelectActionLoader } from './selectors';
import { reducer } from './reducer';
import saga from './saga';
import {
  deleteSiteAccountAction,
  restoreSiteAccountAction,
  permanentDeleteSiteAccountAction,
  resetResultAction,
} from './actions';

export function siteAccounts({
  loading,
  response,
  onDelete,
  onRestore,
  onPermanentDelete,
  result,
  onSuccess,
  actionLoading,
  rowStart,
}) {
  useInjectReducer({ key: 'siteAccountPage', reducer });
  useInjectSaga({ key: 'siteAccountPage', saga });
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
    }
  };

  const onActionClick = (siteAccountId, header, confirm, content, status) => {
    setDialogProps({
      isShowDialog: true,
      dialogHeader: header,
      dialogConfirm: confirm,
      dialogContent: content,
      dataStatus: status,
      id: siteAccountId,
    });
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <StyledTable>
            <Thead>
              <Tr>
                <Th>S/N</Th>
                <Th>Site</Th>
                <Th>Carrier</Th>
                <Th>Account Number</Th>
                <Th>Data Connection</Th>
                <Th>Scan</Th>
                <Th>Deleted</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              <SiteAccountsList
                loading={loading}
                response={response}
                onActionClick={onActionClick}
                rowStart={rowStart}
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

function SiteAccountsList(props) {
  if (props.loading) {
    return <TableLoader />;
  }
  if (props.response.length > 0) {
    const siteAccountsArray = props.response || [];
    return (
      <React.Fragment>
        {siteAccountsArray.map((siteAccount, i) => (
          <Tr key={i}>
            <Td>{i + props.rowStart}</Td>
            <Td>{siteAccount.siteName}</Td>
            <Td>{siteAccount.carrierName}</Td>
            <Td>{siteAccount.accountNumber}</Td>
            <Td>{siteAccount.isDataConnection ? 'true' : 'false'}</Td>
            <Td>{siteAccount.isScan ? 'true' : 'false'}</Td>
            <Td>{siteAccount.deleted ? 'true' : 'false'}</Td>
            <Td>
              <LinkButton
                title="Detail"
                className="mr-1"
                tag={Link}
                to={`/site-accounts/${siteAccount.id}`}
              >
                <Info size="12" />
              </LinkButton>

              {siteAccount.deleted !== true && (
                <React.Fragment>
                  <LinkButton
                    title="Edit"
                    className="mr-1"
                    tag={Link}
                    to={`/site-accounts/edit/${siteAccount.id}`}
                  >
                    <Edit size="12" />
                  </LinkButton>
                  <LinkButton
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete"
                    className="mr-1"
                    onClick={() => {
                      const header = 'Delete Site Account';
                      const confirm =
                        'Are you sure, do you want to delete site account?';
                      const content = [
                        { label: 'Site', value: siteAccount.siteName },
                        { label: 'Carrier', value: siteAccount.carrierName },
                        {
                          label: 'A/C No.',
                          value: siteAccount.accountNumber,
                        },
                      ];
                      props.onActionClick(
                        siteAccount.id,
                        header,
                        confirm,
                        content,
                        3,
                      );
                    }}
                  >
                    <Trash size="12" />
                  </LinkButton>
                </React.Fragment>
              )}
              {siteAccount.deleted === true && (
                <React.Fragment>
                  <LinkButton
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Restore"
                    className="mr-1"
                    onClick={() => {
                      const header = 'Restore Site Account';
                      const confirm =
                        'Are you sure, do want to restore site account?';
                      const content = [
                        { label: 'Site', value: siteAccount.siteName },
                        { label: 'Carrier', value: siteAccount.carrierName },
                        {
                          label: 'A/C No.',
                          value: siteAccount.accountNumber,
                        },
                      ];
                      props.onActionClick(
                        siteAccount.id,
                        header,
                        confirm,
                        content,
                        4,
                      );
                    }}
                  >
                    <TrashRestore size="12" />
                  </LinkButton>
                  <Button
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Permanent Delete"
                    className="mr-1"
                    color="danger"
                    onClick={() => {
                      const header = 'Permanently Delete Site Account';
                      const confirm =
                        'Are you sure, do want to permanently delete site account?';
                      const content = [
                        { label: 'Site', value: siteAccount.siteName },
                        { label: 'Carrier', value: siteAccount.carrierName },
                        {
                          label: 'A/C No.',
                          value: siteAccount.accountNumber,
                        },
                      ];
                      props.onActionClick(
                        siteAccount.id,
                        header,
                        confirm,
                        content,
                        5,
                      );
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
    <Tr>
      <Td colSpan="8">No Data Available</Td>
    </Tr>
  );
}

siteAccounts.propTypes = {
  response: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  onDelete: PropTypes.func,
  onRestore: PropTypes.func,
  onPermanentDelete: PropTypes.func,
  result: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
  actionLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  result: makeSelectResult(),
  actionLoading: makeSelectActionLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    onDelete: id => {
      dispatch(deleteSiteAccountAction(id));
    },
    onRestore: id => {
      dispatch(restoreSiteAccountAction(id));
    },
    onPermanentDelete: id => {
      dispatch(permanentDeleteSiteAccountAction(id));
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
)(siteAccounts);
