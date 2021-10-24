/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
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
import { ActionLoader } from 'components/Loader';
import StyledTable from 'components/Table';
import Dialog from 'components/Page/Dialog';
import { FormattedMessage } from 'react-intl';
import TableLoader from 'components/TableLoadingIndicator';
import saga from './saga';
import messages from './messages';
import { makeSelectResult, makeSelectActionLoader } from './selectors';
import { reducer } from './reducer';
import { deleteSiteAction, resetResultAction } from './actions';

export function sites({
  loading,
  response,
  onDelete,
  result,
  onSuccess,
  actionLoading,
  rowStart,
}) {
  useInjectReducer({ key: 'sitePage', reducer });
  useInjectSaga({ key: 'sitePage', saga });
  const [
    { isShowDialog, dialogHeader, dialogConfirm, dialogContent, id },
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
    onDelete(id);
  };

  const onActionClick = (siteId, header, confirm, content, status) => {
    setDialogProps({
      isShowDialog: true,
      dialogHeader: header,
      dialogConfirm: confirm,
      dialogContent: content,
      dataStatus: status,
      id: siteId,
    });
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <StyledTable>
            <Thead>
              <Tr>
                <Th scope="row">
                  <FormattedMessage {...messages.serialNo} />
                </Th>
                <Th>
                  <FormattedMessage {...messages.siteName} />
                </Th>
                <Th>
                  <FormattedMessage {...messages.siteUsername} />
                </Th>
                <Th>
                  <FormattedMessage {...messages.sitePassword} />
                </Th>
                <Th>
                  <FormattedMessage {...messages.siteFTPIp} />
                </Th>
                <Th>
                  <FormattedMessage {...messages.siteIp} />
                </Th>
                <Th>
                  <FormattedMessage {...messages.ftpUsername} />
                </Th>
                <Th>
                  <FormattedMessage {...messages.ftpPassword} />
                </Th>
                <Th>
                  <FormattedMessage {...messages.actions} />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <SitesList
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

function SitesList(props) {
  if (props.loading) {
    return <TableLoader />;
  }
  if (props.response.length > 0) {
    const sitesArray = props.response || [];
    return (
      <React.Fragment>
        {sitesArray.map((site, i) => (
          <Tr key={i}>
            <Td scope="row">{i + props.rowStart}</Td>
            <Td>{site.siteName}</Td>
            <Td>{site.siteUsername}</Td>
            <Td>{site.sitePassword}</Td>
            <Td>{site.siteFTPIP}</Td>
            <Td>{site.siteIP}</Td>
            <Td>{site.ftpUsername}</Td>
            <Td>{site.ftpPassword}</Td>
            <Td>
              <LinkButton
                className="mr-1"
                tag={Link}
                data-toggle="tooltip"
                data-placement="top"
                title="Detail"
                to={`/sites/${site.siteId}`}
              >
                <Info size="12" />
              </LinkButton>
              <LinkButton
                className="mr-1"
                tag={Link}
                data-toggle="tooltip"
                data-placement="top"
                title="Edit"
                to={`/sites/edit/${site.siteId}`}
                id={`editBtn_${i + 1}`}
              >
                <Edit size="12" />
              </LinkButton>
              <Button
                data-toggle="tooltip"
                data-placement="top"
                title="Delete"
                className="mr-1"
                onClick={() => {
                  const header = 'Delete Site';
                  const confirm = 'Are you sure, do you want to delete site?';
                  const content = [{ label: 'Name', value: site.siteName }];
                  props.onActionClick(site.siteId, header, confirm, content, 3);
                }}
              >
                <Trash size="12" />
              </Button>
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

sites.propTypes = {
  response: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  onDelete: PropTypes.func,
  onRestore: PropTypes.func,
  result: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
  actionLoading: PropTypes.bool,
  rowStart: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  result: makeSelectResult(),
  actionLoading: makeSelectActionLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    onDelete: id => {
      dispatch(deleteSiteAction(id));
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
)(sites);
