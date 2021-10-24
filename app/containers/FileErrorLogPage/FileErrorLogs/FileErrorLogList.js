import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Tr, Td } from '@bootstrap-styled/v4';
import { Info, Trash } from '@styled-icons/fa-solid';

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

  if (records && records.length > 0) {
    if (selectedRow >= 0) {
      resetTableRow(5000);
    }
    return (
      <React.Fragment>
        {records.map((record, index) => (
          <Tr key={record.id} className={selectedRow === index ? 'active' : ''}>
            <Td scope="row">{index + rowStart}</Td>
            <Td>{record.siteName}</Td>
            <Td>{record.fileName}</Td>
            <Td>{record.carrierName}</Td>
            <Td>{record.productName}</Td>
            <Td>{record.awb}</Td>
            <Td>{record.logDate}</Td>
            <Td>{record.status}</Td>
            <Td>
              <LinkButton
                className="mr-1"
                data-toggle="tooltip"
                data-placement="top"
                title="Detail"
                tag={Link}
                to={`/file-errors/${record.id}`}
              >
                <Info size="12" />
              </LinkButton>
              <LinkButton
                className="mr-1"
                data-toggle="tooltip"
                data-placement="top"
                title="Delete"
                onClick={() => {
                  const header = 'Delete';
                  onActionClick(record.id, header, '', [], 3, index);
                }}
              >
                <Trash size="12" />
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
