import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Tr, Td } from '@bootstrap-styled/v4';
import { Info, File, FileExport } from '@styled-icons/fa-solid';

import LinkButton from 'components/LinkButton';
import TableLoadingIndicator from 'components/TableLoadingIndicator';

export default function FileList({
  loading,
  records,
  rowStart,
  selectedRow,
  resetTableRow,
  onActionClick,
}) {
  if (loading === true) {
    return (
      <React.Fragment>
        <TableLoadingIndicator />
      </React.Fragment>
    );
  }

  if (records.length > 0) {
    if (selectedRow >= 0) {
      resetTableRow(5000);
    }
    return (
      <React.Fragment>
        {records.map((record, index) => (
          <Tr key={record.id} className={selectedRow === index ? 'active' : ''}>
            <Td scope="row">{index + rowStart}</Td>
            <Td>{record.originalName}</Td>
            <Td>{record.siteName}</Td>
            <Td>{record.carrierName}</Td>
            <Td>{record.fileCreationTimeText}</Td>
            <Td>{record.totalScanReport}</Td>
            <Td>{record.totalDataConnectionReport}</Td>
            <Td>{record.totalNotMappedReport}</Td>
            <Td>
              <LinkButton
                className="mr-1"
                data-toggle="tooltip"
                data-placement="top"
                title="Detail"
                tag={Link}
                to={`/file-info/${record.id}`}
              >
                <Info size="12" />
              </LinkButton>
              {record.processed === false && (
                <LinkButton
                  className="mr-1"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Re-Extract"
                  onClick={() => {
                    const header = 'Re-Extract';
                    const confirm = 'Are you sure, do want to re-extract file?';
                    const content = [
                      {
                        label: 'Application',
                        value: record.siteName,
                      },
                      {
                        label: 'File Name',
                        value: record.originalName,
                      },
                      { label: 'Carrier', value: record.carrierName },
                    ];
                    onActionClick(
                      record.id,
                      header,
                      confirm,
                      content,
                      4,
                      index,
                    );
                  }}
                >
                  <FileExport size="12" />
                </LinkButton>
              )}
              <LinkButton
                className="mr-1"
                data-toggle="tooltip"
                data-placement="top"
                title="File Content"
                onClick={() => {
                  const header = 'File Content';
                  onActionClick(record.id, header, '', [], 5, index);
                }}
              >
                <File size="12" />
              </LinkButton>
            </Td>
          </Tr>
        ))}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Tr>
        <Td colSpan="18">No Data Available</Td>
      </Tr>
    </React.Fragment>
  );
}

FileList.propTypes = {
  loading: PropTypes.bool,
  records: PropTypes.array,
  rowStart: PropTypes.number,
  selectedRow: PropTypes.number,
  resetTableRow: PropTypes.func,
  onActionClick: PropTypes.func,
};
