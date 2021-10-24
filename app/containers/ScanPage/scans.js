/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState, memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import toastr from 'toastr';
import { Edit } from '@styled-icons/fa-regular/Edit';
import { Info } from '@styled-icons/fa-solid/Info';
import { Recycle } from '@styled-icons/fa-solid/Recycle';
import { TruckLoading } from '@styled-icons/fa-solid/TruckLoading';
import { ShareSquare } from '@styled-icons/fa-solid/ShareSquare';
import { Qrcode } from '@styled-icons/fa-solid/Qrcode';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';

import LinkButton from 'components/LinkButton';
import TableLoader from 'components/TableLoadingIndicator';
import StyledTable from 'components/Table';
import IconStatus from 'components/IconStatus';
import Tooltip from 'components/Tooltip';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Select,
  Option,
  Badge,
  Label,
} from '@bootstrap-styled/v4';
import { ActionLoader } from 'components/Loader';
import messages from './messages';
import {
  resetScanAction,
  setScanAction,
  selectRowAction,
  resetResultAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import { ScanCount } from './enum';
import {
  makeSelectActionLoader,
  makeSelectRow,
  makeSelectResult,
} from './selectors';

const key = 'scanPage';

export function Scans({
  loading,
  error,
  response,
  resetScan,
  scanCount,
  actionLoading,
  rowStart,
  selectedRow,
  onSelectRow,
  result,
  onSuccess,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [showModal, setModal] = useState(false);
  const [showResetModal, setResetModal] = useState(false);
  const [scanId, setScanId] = useState('');
  const [oldScanCount, setOldScanCount] = useState('');
  // to check if old and new count value matches
  const [oldCount, setOldCount] = useState('');

  const handleClose = () => {
    setModal(!showModal);
  };

  const handleResetClose = () => {
    setResetModal(!showResetModal);
  };

  const onActionClick = rowNum => {
    onSelectRow(rowNum);
  };

  function resetTableRow(delay) {
    setTimeout(() => {
      onSelectRow(-1);
    }, delay);
  }

  return (
    <React.Fragment>
      <StyledTable>
        <Thead>
          <Tr>
            <Th>
              <FormattedMessage {...messages.sno} />
            </Th>
            <Th>
              <FormattedMessage {...messages.siteName} />
            </Th>
            <Th>
              <FormattedMessage {...messages.scanTypeCarrier} />
            </Th>
            <Th>
              <FormattedMessage {...messages.awb} />
            </Th>
            <Th>
              <FormattedMessage {...messages.accountNumber} />
            </Th>
            <Th>
              <FormattedMessage {...messages.fileExtractedDateTime} />
            </Th>
            <Th>
              <FormattedMessage {...messages.scanDateTime} />
            </Th>
            <Th>
              <FormattedMessage {...messages.scanStatus} />
            </Th>
            <Th>
              <FormattedMessage {...messages.actions} />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <ScanList
            loading={loading}
            error={error}
            response={response}
            setModal={setModal}
            setScanId={setScanId}
            setOldCount={setOldCount}
            setResetModal={setResetModal}
            setOldScanCount={setOldScanCount}
            rowStart={rowStart}
            selectedRow={selectedRow}
            resetTableRow={resetTableRow}
            onActionClick={onActionClick}
            result={result}
            onSuccess={onSuccess}
          />
        </Tbody>
      </StyledTable>
      {actionLoading && <ActionLoader />}
      <Modal isOpen={showModal}>
        <ModalHeader toggle={handleClose}>Confirmation</ModalHeader>
        <ModalBody>Do you want to reset the scan for this data?</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              resetScan(scanId);
            }}
          >
            Ok
          </Button>
          <Button color="secondary" onClick={() => setModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={showResetModal}>
        <ModalHeader toggle={handleResetClose}>Update Scan Count</ModalHeader>
        <ModalBody>
          Select the count for the scan
          <br />
          <Select
            className="form-control"
            name="scanCount"
            id="scanCount"
            value={oldScanCount || 0}
            onChange={e => {
              setOldScanCount(e.currentTarget.value);
            }}
          >
            {ScanCount.map(data => (
              <Option key={data.value} value={data.value}>
                {data.key}
              </Option>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              let message;
              if (oldScanCount === '0' || oldScanCount === null) {
                message = <FormattedMessage {...messages.choose} />;
                toastr.info(message.props.defaultMessage);
              } else if (oldCount === oldScanCount) {
                message = <FormattedMessage {...messages.chooseDifferent} />;
                toastr.info(message.props.defaultMessage);
              } else {
                scanCount(scanId, oldScanCount);
              }
            }}
          >
            Ok
          </Button>
          <Button color="secondary" onClick={() => setResetModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

function ScanList(props) {
  if (props.result > 0) {
    props.setResetModal(false);
    props.setModal(false);
    props.onSuccess();
  }
  if (props.loading) {
    return <TableLoader />;
  }
  if (props.response !== null) {
    const scanArray = props.response || [];
    if (props.selectedRow >= 0) {
      props.resetTableRow(5000);
    }
    return (
      <React.Fragment>
        {scanArray.length > 0 ? (
          scanArray.map((item, index) => (
            <Tr
              key={index}
              className={props.selectedRow === index ? 'active' : ''}
            >
              <Th scope="row">{index + props.rowStart}</Th>
              <Td>{item.siteName}</Td>
              <Td>{item.scanTypeCarrier}</Td>
              <Td>{item.awb}</Td>
              <Td>{item.accountNumber}</Td>
              <Td>{item.fileExtractedDateTimeText}</Td>
              <Td>
                <span data-toggle="tooltip" data-placement="top">
                  <Label title="Scan Date Time">{item.scanDateTimeText}</Label>
                  <br />
                  <Label title="Last Scan Date Time">
                    {item.lastScanDateTimeText}
                  </Label>
                </span>
              </Td>
              <Td>
                <span className="mr-2">
                  <SendScanType data={item.sendToSite} />
                </span>
                <span className="mr-2">
                  <UpdateScanType data={item.updateShipmentScan} />
                </span>
                <span className="mr-2">
                  <DeliverType data={item.changeDeliveryStatus} />
                </span>
                <span className="mr-2">
                  {item.scanCount !== null ? (
                    <Tooltip
                      content={`Scan Count ${item.scanCount} | Message: ${
                        item.scanMessage
                      } | Location: ${item.scanLocation}`}
                      direction="bottom"
                    >
                      <IconStatus>
                        <Qrcode />
                        <Badge
                          color="danger"
                          data-toggle="tooltip"
                          data-placement="top"
                        >
                          {item.scanCount || 0}
                        </Badge>
                      </IconStatus>
                    </Tooltip>
                  ) : (
                    <Tooltip content="Scan Count : 0" direction="bottom">
                      <IconStatus className="disabled">
                        <Qrcode />
                      </IconStatus>
                    </Tooltip>
                  )}

                  {/* {item.scanCount!==null?{hello}:{hi}} */}
                </span>
              </Td>
              <Td>
                <LinkButton
                  className="mr-1"
                  tag={Link}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Detail"
                  to={`/scans/${item.id}`}
                  onClick={() => {
                    props.onActionClick(index);
                  }}
                >
                  <Info size="12" />
                </LinkButton>
                {item.scanCount !== null && (
                  <LinkButton
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Reset Scan"
                    className="mr-1"
                    onClick={() => {
                      props.setModal(true);
                      props.setScanId(item.id);
                      props.onActionClick(index);
                    }}
                  >
                    <Recycle size="12" />
                  </LinkButton>
                )}
                <LinkButton
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Update Scan Count"
                  className="mr-1"
                  onClick={() => {
                    props.setResetModal(true);
                    props.setScanId(item.id);
                    props.setOldCount(item.scanCount);
                    props.setOldScanCount(item.scanCount);
                    props.onActionClick(index);
                  }}
                >
                  <Edit size="12" />
                </LinkButton>
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan="9">No Data Available</Td>
          </Tr>
        )}
      </React.Fragment>
    );
  }
}

function SendScanType(props) {
  if (props.data) {
    return (
      <React.Fragment>
        <Tooltip content="Send Type: Send " direction="bottom">
          <IconStatus className="success">
            <ShareSquare />
          </IconStatus>
        </Tooltip>
      </React.Fragment>
    );
  }
  if (props.data === null) {
    return (
      <React.Fragment>
        <Tooltip content="Send Type: Not Called" direction="bottom">
          <IconStatus className="disabled">
            <ShareSquare />
          </IconStatus>
        </Tooltip>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Tooltip content="Send Type: Not Send" direction="bottom">
        <IconStatus className="danger">
          <ShareSquare />
        </IconStatus>
      </Tooltip>
    </React.Fragment>
  );
}

function UpdateScanType(props) {
  if (props.data) {
    return (
      <React.Fragment>
        <Tooltip content="Update Type: Update" direction="bottom">
          <IconStatus className="success">
            <Edit />
          </IconStatus>
        </Tooltip>
      </React.Fragment>
    );
  }
  if (props.data === null) {
    return (
      <React.Fragment>
        <Tooltip content="Update Type: Not Called" direction="bottom">
          <IconStatus className="disabled">
            <Edit />
          </IconStatus>
        </Tooltip>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Tooltip content="Update Type: Not Update" direction="bottom">
        <IconStatus className="danger">
          <Edit />
        </IconStatus>
      </Tooltip>
    </React.Fragment>
  );
}
function DeliverType(props) {
  if (props.data) {
    return (
      <React.Fragment>
        <Tooltip content="Deliver Type: Deliver" direction="bottom">
          <IconStatus className="success">
            <TruckLoading />
          </IconStatus>
        </Tooltip>
      </React.Fragment>
    );
  }
  if (props.data === null) {
    return (
      <React.Fragment>
        <Tooltip content="Deliver Type: Not Called" direction="bottom">
          <IconStatus className="disabled">
            <TruckLoading />
          </IconStatus>
        </Tooltip>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Tooltip content="Deliver Type: Not Deliver" direction="bottom">
        <IconStatus className="danger">
          <TruckLoading />
        </IconStatus>
      </Tooltip>
    </React.Fragment>
  );
}

Scans.propTypes = {
  loading: PropTypes.bool,
  actionLoading: PropTypes.bool,
  error: PropTypes.any,
  response: PropTypes.array,
  resetScan: PropTypes.func,
  scanCount: PropTypes.func,
  onSelectRow: PropTypes.func,
  rowStart: PropTypes.number,
  selectedRow: PropTypes.number,
  data: PropTypes.bool,
  result: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  actionLoading: makeSelectActionLoader(),
  selectedRow: makeSelectRow(),
  result: makeSelectResult(),
});

export function mapDispatchToProps(dispatch) {
  return {
    resetScan: id => {
      dispatch(resetScanAction(id));
    },
    scanCount: (scanId, scanCount) => {
      dispatch(setScanAction(scanId, scanCount));
    },
    onSelectRow: selectedRow => {
      dispatch(selectRowAction(selectedRow));
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
)(Scans);
