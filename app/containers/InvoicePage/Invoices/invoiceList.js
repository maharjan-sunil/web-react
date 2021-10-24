/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LinkButton from 'components/LinkButton';
import styled from 'styled-components';
import { Trash } from '@styled-icons/fa-solid/Trash';
import { Retweet } from '@styled-icons/fa-solid/Retweet';
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

export default function InvoiceList({
  response,
  loading,
  rowStart,
  onActionClick,
  onDownload,
  fileContent,
}) {
  if (loading) {
    return (
      <React.Fragment>
        <Tbody>
          <TableLoader />
        </Tbody>
      </React.Fragment>
    );
  }
  const [{ downloadFlag, fileName }, setDownloadInfo] = useState({
    downloadFlag: false,
    fileName: '',
  });
  const downloadHandler = (flag, file) => {
    setDownloadInfo({
      downloadFlag: flag,
      fileName: file,
    });
  };
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

  if (response != null && response.length > 0) {
    const invoicesArray = response || [];
    const [{ activeRow }, setActiveRow] = useState({ activeRow: 0 });
    return (
      <React.Fragment>
        {invoicesArray.map((invoice, i) => (
          <Tbody key={i} className={activeRow === i + 1 ? 'expand' : ''}>
            <InvoiceRow
              invoice={invoice}
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
    <Tr>
      <Td colSpan="8">No Data Available</Td>
    </Tr>
  );
}

function InvoiceRow({
  invoice,
  setActiveRow,
  onDownload,
  downloadHandler,
  toolTipHandler,
  onActionClick,
  activeRow,
  rowIndex,
  rowStart,
}) {
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
        <Td>{invoice.applicationName}</Td>
        <Td>{invoice.carrierText}</Td>
        <Td>{invoice.pickUpDateText}</Td>
        <Td>
          {invoice.name} &nbsp; &nbsp;
          <A title="Download">
            <Download
              size="12"
              onClick={() => {
                onDownload(invoice.id);
                downloadHandler(true, invoice.name);
              }}
            />
          </A>
        </Td>
        <Td>
          <SetRowStatus
            id={invoice.id}
            name={invoice.name}
            status={invoice.status}
            statusText={invoice.statusText}
            fileProcesses={invoice.fileProcesses}
            toolTipHandler={toolTipHandler}
          />
        </Td>
        <Td>
          <LinkButton
            title="Detail"
            className="mr-1"
            tag={Link}
            to={`/invoices/${invoice.id}`}
          >
            <Info size="12" />
          </LinkButton>
          {invoice.fileAction === 1 && (
            <LinkButton
              title="ReValidate"
              className="mr-1"
              onClick={() => {
                const header = 'ReValidate Invoice';
                const confirm = 'Are you sure, do want to revalidate invoice?';
                const content = [
                  {
                    label: 'Application',
                    value: invoice.applicationName,
                  },
                  {
                    label: 'File Name',
                    value: invoice.name,
                  },
                  { label: 'Carrier', value: invoice.carrierText },
                ];
                onActionClick(invoice.id, header, confirm, content, 6);
              }}
            >
              <Retweet size="12" />
            </LinkButton>
          )}
          {invoice.fileAction === 2 && (
            <LinkButton
              title="Review"
              className="mr-1"
              onClick={() => {
                const header = 'Review Invoice';
                const confirm = 'Are you sure, do want to review invoice?';
                const content = [
                  {
                    label: 'Application',
                    value: invoice.applicationName,
                  },
                  {
                    label: 'File Name',
                    value: invoice.name,
                  },
                  { label: 'Carrier', value: invoice.carrierText },
                ];
                onActionClick(invoice.id, header, confirm, content, 8);
              }}
            >
              <SignInAlt size="12" />
            </LinkButton>
          )}
          {invoice.fileAction === 3 && (
            <LinkButton
              title="Resend"
              className="mr-1"
              onClick={() => {
                const header = 'Resend Invoice';
                const confirm = 'Are you sure, do want to resend invoice?';
                const content = [
                  {
                    label: 'Application',
                    value: invoice.applicationName,
                  },
                  {
                    label: 'File Name',
                    value: invoice.name,
                  },
                  { label: 'Carrier', value: invoice.carrierText },
                ];
                onActionClick(invoice.id, header, confirm, content, 7);
              }}
            >
              <SignInAlt size="12" />
            </LinkButton>
          )}
          {invoice.isDeleted !== true && (
            <React.Fragment>
              <LinkButton
                data-toggle="tooltip"
                data-placement="top"
                title="Delete"
                className="mr-1"
                onClick={() => {
                  const header = 'Delete Invoice';
                  const confirm = 'Are you sure, do want to delete invoice?';
                  const content = [
                    {
                      label: 'Application',
                      value: invoice.applicationName,
                    },
                    {
                      label: 'File Name',
                      value: invoice.name,
                    },
                    { label: 'Carrier', value: invoice.carrierText },
                  ];
                  onActionClick(invoice.id, header, confirm, content, 3);
                }}
              >
                <Trash size="12" />
              </LinkButton>
            </React.Fragment>
          )}
          {invoice.isDeleted === true && (
            <React.Fragment>
              <LinkButton
                data-toggle="tooltip"
                data-placement="top"
                title="Restore"
                className="mr-1"
                onClick={() => {
                  const header = 'Restore Invoice';
                  const confirm = 'Are you sure, do want to restore invoice?';
                  const content = [
                    {
                      label: 'Application',
                      value: invoice.applicationName,
                    },
                    {
                      label: 'File Name',
                      value: invoice.name,
                    },
                    { label: 'Carrier', value: invoice.carrierText },
                  ];
                  onActionClick(invoice.id, header, confirm, content, 4);
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
                  const header = 'Permanently Delete Invoice';
                  const confirm =
                    'Are you sure, do want to permanently delete invoice?';
                  const content = [
                    {
                      label: 'Application',
                      value: invoice.applicationName,
                    },
                    {
                      label: 'File Name',
                      value: invoice.name,
                    },
                    { label: 'Carrier', value: invoice.carrierText },
                  ];
                  onActionClick(invoice.id, header, confirm, content, 5);
                }}
              >
                <Trash size="12" />
              </Button>
            </React.Fragment>
          )}
        </Td>
      </Tr>
      <Processes response={invoice.fileProcesses} />
    </React.Fragment>
  );
}

function SetRowStatus({
  id,
  name,
  status,
  statusText,
  fileProcesses,
  toolTipHandler,
}) {
  if (status !== 2) {
    if (fileProcesses != null && fileProcesses[0].activityErrorLogs != null) {
      return (
        <React.Fragment>
          <A
            id={`target_${id}`}
            onMouseEnter={() => {
              toolTipHandler(
                true,
                `target_${id}`,
                name,
                fileProcesses[0].activityErrorLogs[0].errorMessage,
                '',
              );
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
    return (
      <React.Fragment>
        <Badge color="danger">
          <b>{`${statusText}`}</b>
        </Badge>
        &nbsp;
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Badge color="success">{statusText}</Badge>
    </React.Fragment>
  );
}

function DownloadFile(props) {
  const linkSource = `data:text/csv;base64,${props.fileContent}`;
  const downloadLink = document.createElement('a');
  downloadLink.href = linkSource;
  downloadLink.download = props.fileName;
  downloadLink.click();
  props.downloadHandler(false, '');
  return null;
}

SetRowStatus.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  status: PropTypes.number,
  statusText: PropTypes.string,
  fileProcesses: PropTypes.array,
  toolTipHandler: PropTypes.func,
};

InvoiceRow.propTypes = {
  invoice: PropTypes.object,
  setActiveRow: PropTypes.func,
  onDownload: PropTypes.func,
  downloadHandler: PropTypes.func,
  toolTipHandler: PropTypes.func,
  onActionClick: PropTypes.func,
  activeRow: PropTypes.number,
  rowIndex: PropTypes.number,
  rowStart: PropTypes.number,
};

InvoiceList.propTypes = {
  response: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  onActionClick: PropTypes.func,
  loading: PropTypes.bool,
  rowStart: PropTypes.number,
  onDownload: PropTypes.func,
  fileContent: PropTypes.string,
};
