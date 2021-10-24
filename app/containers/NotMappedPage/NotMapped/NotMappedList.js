import React from 'react';
import TableLoadingIndicator from 'components/TableLoadingIndicator';
import { Tr, Td } from '@bootstrap-styled/v4';
export default function NotMappedList(props) {
  if (props.loading) {
    return <TableLoadingIndicator />;
  }
  if (props.selectedRow >= 0) {
    props.resetTableRow(5000);
  }
  if (props.response !== undefined) {
    const NotMappedReportArray = props.response || [];
    return (
      <React.Fragment>
        {NotMappedReportArray.length > 0 ? (
          NotMappedReportArray.map((item, index) => (
            <Tr
              key={item.id}
              className={props.selectedRow === index ? 'active' : ''}
            >
              <Td>{index + props.rowStart}</Td>
              <Td>{item.scanTypeCarrier}</Td>
              <Td>{item.awb}</Td>
              <Td>{item.carrierAccount}</Td>
              <Td>{item.fileExtratedDateTimeText}</Td>
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
