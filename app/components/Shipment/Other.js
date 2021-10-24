/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React from 'react';
import { Thead, Tbody, Tr, Th, Td, Badge } from '@bootstrap-styled/v4';
import StyledTable from 'components/Table';
export default function Other(props) {
  return (
    <StyledTable>
      <Thead>
        <Tr>
          <Th colSpan="2">{props.tableName}</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Receiver Reference</Td>
          <Td>{props.receiverReference}</Td>
        </Tr>
        <Tr>
          <Td>Sender Reference</Td>
          <Td>{props.sendersReference}</Td>
        </Tr>
        <Tr>
          <Td>Shipment Description</Td>
          <Td>{props.shipmentDescription}</Td>
        </Tr>
        {props.dg !== null && props.dg !== undefined && (
          <Tr>
            <Td>Dangerous Goods</Td>
            <Td>{props.dg}</Td>
          </Tr>
        )}
        {props.customsValue !== null && props.customsValue !== undefined && (
          <Tr>
            <Td>Customs Value</Td>
            <Td>
              {props.customsValue.customInfo.value}&nbsp;
              <Badge color="danger">
                {props.customsValue.customInfo.valutaCodeText}
              </Badge>
            </Td>
          </Tr>
        )}
        {props.pls !== null && props.pls !== undefined && (
          <Tr>
            <Td>PLS Flag</Td>
            <Td>{props.pls.usePaperLessShipment ? 'Yes' : 'No'}</Td>
          </Tr>
        )}
        {props.shipmentDirection !== null &&
          props.shipmentDirection !== undefined && (
            <Tr>
              <Td>Shipment Direction</Td>
              <Td>{props.shipmentDirection.shipmentDirectionText}</Td>
            </Tr>
          )}
        {props.paymentDirectionText !== null &&
          props.paymentDirectionText !== undefined && (
            <Tr>
              <Td>Payment Type</Td>
              <Td>{props.paymentDirectionText}</Td>
            </Tr>
          )}
        {props.handling !== null && props.handling !== undefined && (
          <Tr>
            <Td>Special Handling</Td>
            <Td>{props.handling}</Td>
          </Tr>
        )}
      </Tbody>
    </StyledTable>
  );
}
