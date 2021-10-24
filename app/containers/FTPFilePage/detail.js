import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import {
  Row,
  Col,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
} from '@bootstrap-styled/v4';

import StyledTable from 'components/Table';
import Body from 'components/Body';
import Navbar from 'components/Navbar';
import PageWrapper from 'components/PageWrapper';
import { PageHeader } from 'components/Page/PageHeader';
import LoaderIndicator from 'components/Loader';

import {
  makeSelectFTPFile,
  makeSelectLoader,
  makeSelectError,
} from './selectors';
import { reducer } from './reducer';
import saga from './saga';
import { getFTPFileAction } from './actions';

function Detail({ match, loading, error, ftpFile, onLoad }) {
  useInjectReducer({ key: 'ftpFilePage', reducer });
  useInjectSaga({ key: 'ftpFilePage', saga });

  const { id } = match.params;

  useEffect(() => {
    onLoad(id);
  }, []);

  if (loading || !ftpFile.id) {
    return <LoaderIndicator />;
  }

  if (error) {
    return <React.Fragment>Error occurred.</React.Fragment>;
  }

  function getErrorMessage() {
    if (
      ftpFile.ftpFileProcesses &&
      ftpFile.ftpFileProcesses[0].ftpFileActivityErrorLogs !== null
    ) {
      return ftpFile.ftpFileProcesses[0].ftpFileActivityErrorLogs[0]
        .errorMessage;
    }
    return '';
  }

  return (
    <React.Fragment>
      <Body />
      <Navbar />
      <PageWrapper>
        <PageHeader pageTitle="FTP File Detail" back="true" />
        <Row>
          <Col md="12">
            <StyledTable>
              <Tbody>
                <Tr>
                  <Th>Site</Th>
                  <Td>{ftpFile.siteName}</Td>
                </Tr>
                <Tr>
                  <Th>Carrier</Th>
                  <Td>{ftpFile.carrierName}</Td>
                </Tr>
                <Tr>
                  <Th>Product</Th>
                  <Td>{ftpFile.productName}</Td>
                </Tr>
                <Tr>
                  <Th>File</Th>
                  <Td>
                    {ftpFile.name}
                    {ftpFile.extension}
                  </Td>
                </Tr>
                <Tr>
                  <Th>Task Name</Th>
                  <Td>{ftpFile.taskName !== '' ? ftpFile.taskName : 'N/A'}</Td>
                </Tr>
                <Tr>
                  <Th>FTP Url</Th>
                  <Td>{ftpFile.url}</Td>
                </Tr>
                <Tr>
                  <Th>FTP Username</Th>
                  <Td>{ftpFile.username}</Td>
                </Tr>
                <Tr>
                  <Th>FTP Password</Th>
                  <Td>{ftpFile.password}</Td>
                </Tr>
                <Tr>
                  <Th>Datetime</Th>
                  <Td>{ftpFile.dateTimeText}</Td>
                </Tr>
                <Tr>
                  <Th>Status</Th>
                  <Td>
                    <SetStatus
                      status={ftpFile.status}
                      statusText={ftpFile.statusText}
                    />
                  </Td>
                </Tr>
                <GetError
                  status={ftpFile.status}
                  errorMessage={getErrorMessage()}
                />
              </Tbody>
            </StyledTable>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <StyledTable>
              <Thead>
                <Tr>
                  <Th colSpan="5">FTP File Processes</Th>
                </Tr>
                <Tr>
                  <Th>PID</Th>
                  <Th>Process</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {ftpFile.ftpFileProcesses.map(process => (
                  <Tr key={process.id}>
                    <Td>{process.id}</Td>
                    <Td>{process.activityText}</Td>
                    <Td>{process.activityDateTimeText}</Td>
                    <Td>
                      <SetStatus
                        status={process.status}
                        statusText={process.statusText}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </StyledTable>
          </Col>
        </Row>
      </PageWrapper>
    </React.Fragment>
  );
}

function GetError({ status, errorMessage }) {
  if (status === 3) {
    return (
      <React.Fragment>
        <Tr>
          <Th>Error message</Th>
          <Td width="80%"> {errorMessage}</Td>
        </Tr>
      </React.Fragment>
    );
  }
  return null;
}

function SetStatus({ status, statusText }) {
  if (status === 1) {
    return (
      <React.Fragment>
        <Badge color="info">{statusText}</Badge>
      </React.Fragment>
    );
  }
  if (status === 2) {
    return (
      <React.Fragment>
        <Badge color="success">{statusText}</Badge>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Badge color="danger">{statusText}</Badge>
    </React.Fragment>
  );
}

GetError.propTypes = {
  status: PropTypes.number,
  errorMessage: PropTypes.string,
};

SetStatus.propTypes = {
  status: PropTypes.number,
  statusText: PropTypes.string,
};

Detail.propTypes = {
  match: PropTypes.any,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  ftpFile: PropTypes.object,
  onLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoader(),
  error: makeSelectError(),
  ftpFile: makeSelectFTPFile(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: id => {
      dispatch(getFTPFileAction(id));
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
)(Detail);
