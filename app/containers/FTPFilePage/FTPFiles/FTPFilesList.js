import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LinkButton from 'components/LinkButton';
import styled from 'styled-components';
import { Trash } from '@styled-icons/fa-solid/Trash';
import { Info } from '@styled-icons/fa-solid/Info';
import { Download } from '@styled-icons/fa-solid/Download';
import { SignInAlt } from '@styled-icons/fa-solid/SignInAlt';
import { Link } from 'react-router-dom';
import { TrashRestore } from '@styled-icons/fa-solid/TrashRestore';
import { Th, Tr, Td, Button, Badge, A, Tbody } from '@bootstrap-styled/v4';
import { Plus, Minus } from '@styled-icons/fa-solid';
import { StyledIconBase } from '@styled-icons/styled-icon';
import TableLoader from 'components/TableLoadingIndicator';

import Processes from './processes';
import { StatusToolTip } from './ToolTip';

const IconToggle = styled.div`
  ${StyledIconBase} {
    cursor: pointer;
    &:hover {
      color: #666;
    }
  }
`;

export default function FTPFilesList({
  ftpFiles,
  loading,
  rowStart,
  onActionClick,
  onDownload,
  fileContent,
}) {
  const [{ downloadFlag, fileName }, setDownloadInfo] = useState({
    downloadFlag: false,
    fileName: '',
  });

  const [
    { isShowToolTip, target, errorSource, serviceError, applicationError },
    setToolTipState,
  ] = useState({
    isShowToolTip: false,
    target: '',
    errorSource: '',
    serviceError: '',
    applicationError: '',
  });

  const [{ activeRow }, setActiveRow] = useState({ activeRow: 0 });

  if (loading) {
    return (
      <React.Fragment>
        <Tbody>
          <TableLoader />
        </Tbody>
      </React.Fragment>
    );
  }

  const downloadHandler = (flag, file) => {
    setDownloadInfo({
      downloadFlag: flag,
      fileName: file,
    });
  };

  const toolTipHandler = (
    flag,
    logTarget,
    logErrorSource,
    logServiceError,
    logApplicationError,
  ) => {
    setToolTipState({
      isShowToolTip: flag,
      target: logTarget,
      errorSource: logErrorSource,
      serviceError: logServiceError,
      applicationError: logApplicationError,
    });
  };

  if (ftpFiles != null && ftpFiles.length > 0) {
    return (
      <React.Fragment>
        {ftpFiles.map((ftpFile, i) => (
          <Tbody
            key={ftpFile.id}
            className={activeRow === i + 1 ? 'expand' : ''}
          >
            <FTPFileRow
              ftpFile={ftpFile}
              setActiveRow={setActiveRow}
              onDownload={onDownload}
              downloadHandler={downloadHandler}
              toolTipHandler={toolTipHandler}
              onActionClick={onActionClick}
              activeRow={activeRow}
              rowIndex={i}
              rowStart={rowStart}
            />
          </Tbody>
        ))}
        <StatusToolTip
          isShowToolTip={isShowToolTip}
          target={target}
          errorSource={errorSource}
          serviceError={serviceError}
          applicationError={applicationError}
        />
        {downloadFlag === true && fileContent !== '' && (
          <DownloadFile
            fileContent={fileContent}
            fileName={fileName}
            downloadHandler={downloadHandler}
          />
        )}
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

function FTPFileRow({
  ftpFile,
  setActiveRow,
  onDownload,
  downloadHandler,
  toolTipHandler,
  onActionClick,
  activeRow,
  rowIndex,
  rowStart,
}) {
  const getProductName = productIdNamePairs => {
    if (productIdNamePairs !== null) {
      const names = productIdNamePairs.map(product => product.name);
      return names.join(', ');
    }
    return 'N/A';
  };

  return (
    <React.Fragment>
      <Tr className="main-row">
        <Th className="tr_icon">
          <IconToggle
            onClick={() =>
              activeRow === rowIndex + 1
                ? setActiveRow({ activeRow: 0 })
                : setActiveRow({ activeRow: rowIndex + 1 })
            }
          >
            {activeRow === rowIndex + 1 ? (
              <Minus size="10" />
            ) : (
              <Plus size="10" />
            )}
          </IconToggle>
        </Th>
        <Td>{rowIndex + rowStart}</Td>
        <Td>{ftpFile.siteName}</Td>
        <Td>{ftpFile.carrierName}</Td>
        <Td>{getProductName(ftpFile.productsIdNamePairs)}</Td>
        <Td>
          {ftpFile.name} &nbsp; &nbsp;
          <A title="Download">
            <Download
              size="12"
              onClick={() => {
                onDownload(ftpFile.id);
                downloadHandler(true, `${ftpFile.name}${ftpFile.extension}`);
              }}
            />
          </A>
        </Td>
        <Td>{ftpFile.taskName !== '' ? ftpFile.taskName : 'N/A'}</Td>
        <Td>{ftpFile.dateTimeText}</Td>
        <Td>
          <SetRowStatus
            id={ftpFile.id}
            name={ftpFile.name}
            status={ftpFile.status}
            statusText={ftpFile.statusText}
            fileProcesses={ftpFile.fileProcesses}
            toolTipHandler={toolTipHandler}
          />
        </Td>
        <Td>
          <SetActions
            id={ftpFile.id}
            name={ftpFile.name}
            extension={ftpFile.extension}
            siteName={ftpFile.siteName}
            carrierName={ftpFile.carrierName}
            productName={ftpFile.productName}
            status={ftpFile.status}
            dataStatus={ftpFile.dataStatus}
            onActionClick={onActionClick}
          />
        </Td>
      </Tr>
      <Processes response={ftpFile.ftpFileProcesses} />
    </React.Fragment>
  );
}

function SetActions({
  id,
  name,
  extension,
  siteName,
  carrierName,
  productName,
  status,
  dataStatus,
  onActionClick,
}) {
  return (
    <React.Fragment>
      <LinkButton
        title="Detail"
        className="mr-1"
        tag={Link}
        to={`/ftp-files/${id}`}
      >
        <Info size="12" />
      </LinkButton>
      {dataStatus !== 3 && (
        <React.Fragment>
          <ResendAction
            id={id}
            name={name}
            extension={extension}
            siteName={siteName}
            carrierName={carrierName}
            productName={productName}
            status={status}
            onActionClick={onActionClick}
          />
          <LinkButton
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
            className="mr-1"
            onClick={() => {
              const header = 'Delete FTP File';
              const confirm = 'Are you sure, do want to delete FTP file?';
              const content = [
                {
                  label: 'Site',
                  value: siteName,
                },
                {
                  label: 'File Name',
                  value: `${name}${extension}`,
                },
                { label: 'Carrier', value: carrierName },
                { label: 'Product', value: productName },
              ];
              onActionClick(id, header, confirm, content, 3);
            }}
          >
            <Trash size="12" />
          </LinkButton>
        </React.Fragment>
      )}
      {dataStatus === 3 && (
        <React.Fragment>
          <LinkButton
            data-toggle="tooltip"
            data-placement="top"
            title="Restore"
            className="mr-1"
            onClick={() => {
              const header = 'Restore FTP File';
              const confirm = 'Are you sure, do want to restore FTP file?';
              const content = [
                {
                  label: 'Site',
                  value: siteName,
                },
                {
                  label: 'File Name',
                  value: `${name}${extension}`,
                },
                { label: 'Carrier', value: carrierName },
                { label: 'Product', value: productName },
              ];
              onActionClick(id, header, confirm, content, 4);
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
              const header = 'Permanently Delete FTP File';
              const confirm =
                'Are you sure, do want to permanently delete FTP file?';
              const content = [
                {
                  label: 'Site',
                  value: siteName,
                },
                {
                  label: 'File Name',
                  value: `${name}${extension}`,
                },
                { label: 'Carrier', value: carrierName },
                { label: 'Product', value: productName },
              ];
              onActionClick(id, header, confirm, content, 5);
            }}
          >
            <Trash size="12" />
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

function ResendAction({
  id,
  name,
  extension,
  siteName,
  carrierName,
  productName,
  status,
  onActionClick,
}) {
  if (status === 1 || status === 3) {
    return (
      <React.Fragment>
        <LinkButton
          title="Resend"
          className="mr-1"
          onClick={() => {
            const header = 'Resend FTP File';
            const confirm = 'Are you sure, do want to resend FTP File?';
            const content = [
              {
                label: 'Site',
                value: siteName,
              },
              {
                label: 'File Name',
                value: `${name}${extension}`,
              },
              { label: 'Carrier', value: carrierName },
              { label: 'Product', value: productName },
            ];
            onActionClick(id, header, confirm, content, 6);
          }}
        >
          <SignInAlt size="12" />
        </LinkButton>
      </React.Fragment>
    );
  }
  return null;
}
function SetRowStatus({
  id,
  name,
  status,
  statusText,
  fileProcesses,
  toolTipHandler,
}) {
  function getErrorMessage() {
    if (fileProcesses && fileProcesses[0].ftpFileActivityErrorLogs !== null) {
      return fileProcesses[0].ftpFileActivityErrorLogs[0].errorMessage;
    }
    return '';
  }

  if (status === 1) {
    return (
      <React.Fragment>
        <Badge color="info">
          <b>{statusText}</b>
        </Badge>
        &nbsp;
      </React.Fragment>
    );
  }
  if (status === 2) {
    return (
      <React.Fragment>
        <Badge color="success">
          <b>{statusText}</b>
        </Badge>
      </React.Fragment>
    );
  }
  if (status === 3) {
    return (
      <React.Fragment>
        <A
          id={`target_${id}`}
          onMouseEnter={() => {
            toolTipHandler(true, `target_${id}`, name, getErrorMessage(), '');
          }}
          onMouseLeave={() => {
            toolTipHandler(false, '', '', '', '', '');
          }}
        >
          <Badge color="danger">
            <b>{`${statusText}`}</b>
          </Badge>
          &nbsp;
        </A>
      </React.Fragment>
    );
  }
  return null;
}

function DownloadFile(props) {
  const linkSource = `data:application/octet-stream;base64,${
    props.fileContent
  }`;
  const downloadLink = document.createElement('a');
  downloadLink.href = linkSource;
  downloadLink.download = props.fileName;
  downloadLink.click();
  props.downloadHandler(false, '');
  return null;
}

ResendAction.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  extension: PropTypes.string,
  siteName: PropTypes.string,
  carrierName: PropTypes.string,
  productName: PropTypes.string,
  status: PropTypes.number,
  onActionClick: PropTypes.func,
};

SetActions.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  extension: PropTypes.string,
  siteName: PropTypes.string,
  carrierName: PropTypes.string,
  productName: PropTypes.string,
  status: PropTypes.number,
  dataStatus: PropTypes.number,
  onActionClick: PropTypes.func,
};
SetRowStatus.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  status: PropTypes.number,
  statusText: PropTypes.string,
  fileProcesses: PropTypes.array,
  toolTipHandler: PropTypes.func,
};

FTPFileRow.propTypes = {
  ftpFile: PropTypes.object,
  setActiveRow: PropTypes.func,
  onDownload: PropTypes.func,
  downloadHandler: PropTypes.func,
  toolTipHandler: PropTypes.func,
  onActionClick: PropTypes.func,
  activeRow: PropTypes.number,
  rowIndex: PropTypes.number,
  rowStart: PropTypes.number,
};

FTPFilesList.propTypes = {
  ftpFiles: PropTypes.array,
  onActionClick: PropTypes.func,
  loading: PropTypes.bool,
  rowStart: PropTypes.number,
  onDownload: PropTypes.func,
  fileContent: PropTypes.string,
};
