/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Row,
  Col,
  Badge,
} from '@bootstrap-styled/v4';
import StyledTable from 'components/Table';

import ice from './images/ice.svg';
import liter from './images/liter.svg';
import weight from './images/weight.svg';

import { WeightLabel } from './style';

export default function Detail(props) {
  const [{ hasVolume }, setState] = useState({
    hasVolume: false,
  });

  useEffect(() => {
    let isVolume = false;
    if (props.shipment.volumeWeight) {
      isVolume = true;
    }
    setState({
      hasVolume: isVolume,
    });
  }, []);

  return (
    <React.Fragment>
      <StyledTable>
        <Thead>
          <Tr>
            <Th colSpan="2">Shipment Detail</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Site</Td>
            <Td colSpan="3">{props.shipment.siteName}</Td>
          </Tr>
          <Tr>
            <Td>Product</Td>
            <Td colSpan="3">
              {props.shipment.product.productName}{' '}
              <Badge color="danger">
                {props.shipment.product.productNumber}
              </Badge>
            </Td>
          </Tr>
          <Tr>
            <Td>Ship Date</Td>
            <Td colSpan="3">{props.shipment.shipDate}</Td>
          </Tr>
          <Tr>
            <Td>Account No.</Td>
            <Td colSpan="3">{props.shipment.accountNumber}</Td>
          </Tr>
          <Tr>
            <Td>AWB</Td>
            <Td colSpan="3">{props.shipment.awb}</Td>
          </Tr>
          <Tr>
            <Td>No. of Collies</Td>
            <Td>{props.shipment.numberOfCollies}</Td>
            <Td>Weight</Td>
            <Td>
              <Row>
                <Col>
                  <WeightLabel>
                    <img src={weight} alt="" title="Total Weight" />{' '}
                    <label title="Total Weight">
                      {`${props.shipment.totalWeight.value} ${
                        props.shipment.totalWeight.unitTypeText
                      }`}
                    </label>
                  </WeightLabel>
                </Col>
                {hasVolume && (
                  <React.Fragment>
                    <Col>
                      <WeightLabel>
                        <img src={liter} alt="" title="Volume Weight" />{' '}
                        <label title="Total Volume Weight">
                          {`${props.shipment.volumeWeight.value} ${
                            props.shipment.volumeWeight.unitTypeText
                          }`}
                        </label>
                      </WeightLabel>
                    </Col>
                  </React.Fragment>
                )}
                <Col>
                  <WeightLabel>
                    <img src={ice} alt="" title="Dry Ice Weight" />{' '}
                    <label title="Total Dry Ice Weight">
                      {props.shipment.totalDryIceWeight} KG
                    </label>
                  </WeightLabel>
                </Col>
              </Row>
            </Td>
          </Tr>
          <Tr>
            <Td>Created Date</Td>
            <Td>{props.shipment.createdDate}</Td>
            <Td>Created By</Td>
            <Td>{props.shipment.userName}</Td>
          </Tr>
        </Tbody>
      </StyledTable>
    </React.Fragment>
  );
}
