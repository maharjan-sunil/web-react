import React from 'react';
import TableLoadingIndicator from 'components/TableLoadingIndicator';
import SetActionLinks from 'containers/DataConnectionPage/dataConnections/SetActionLinks';
import {
  Status,
  ProcessStatus,
} from 'containers/DataConnectionPage/dataConnections/PopUps';

import { Tr, Td } from '@bootstrap-styled/v4';

export default function DataConnectionList(props) {
  if (props.loading) {
    return <TableLoadingIndicator />;
  }
  if (props.selectedRow >= 0) {
    props.resetTableRow(5000);
  }
  if (props.response !== undefined) {
    const dataconnectionReportArray = props.response || [];
    return (
      <React.Fragment>
        {dataconnectionReportArray.length > 0 ? (
          dataconnectionReportArray.map((item, index) => (
            <Tr
              key={item.id}
              className={props.selectedRow === index ? 'active' : ''}
            >
              <Td>{index + props.rowStart}</Td>
              <Td>{item.siteName}</Td>
              <Td>{item.carrierName}</Td>
              <Td>{item.awb}</Td>
              <Td>{item.carrierAccount}</Td>
              <Td>{item.fileExtratedDateTimeText}</Td>
              <Td>{item.lastScanDateTimeText}</Td>
              <Td>
                <span className="mr-2">
                  <ProcessStatus status={item.dataConnIsProcessed} />
                </span>
                <span className="mr-2">
                  <Status
                    status={
                      item.dataConnStatus === null
                        ? null
                        : item.dataConnStatus.trim()
                    }
                    dataConnErrorMsg={item.dataConnErrorMsg}
                  />
                </span>
              </Td>

              <Td>
                <SetActionLinks
                  item={item}
                  index={index}
                  onActionClick={props.onActionClick}
                />
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan="18">No Data Available</Td>
          </Tr>
        )}
      </React.Fragment>
    );
  }
}
