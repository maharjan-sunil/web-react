/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from 'react';

import { Thead, Tbody, Tr, Th, Td } from '@bootstrap-styled/v4';
import StyledTable from 'components/Table';

function getDryIceValue(dryIce) {
  if (dryIce) {
    return `${dryIce.quatity.value} ${quatity.unitTypeText}`;
  }
  return '';
}

export default function Package(props) {
  return (
    <React.Fragment>
      <StyledTable>
        <Thead>
          <Tr>
            <Th colSpan="6">Package Detail</Th>
          </Tr>
          <Tr>
            <Th>S/N</Th>
            <Th>Packaging</Th>
            <Th>Length</Th>
            <Th>Width</Th>
            <Th>Height</Th>
            <Th>Weight</Th>
            <Th title="Volume Weight">Vol. Wt.</Th>
            <Th>Dry Ice</Th>
            <Th>AWB</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.collies.map((colli, i) => (
            <React.Fragment key={i}>
              <Tr>
                <Packages
                  sn={i + 1}
                  packageType={colli.packaging.customeTypeText}
                  weight={`${colli.weight.value} ${colli.weight.unitTypeText}`}
                  length={`${colli.length.value} ${colli.length.unitTypeText}`}
                  width={`${colli.width.value} ${colli.width.unitTypeText}`}
                  height={`${colli.height.value} ${colli.height.unitTypeText}`}
                  volume={`${colli.volume.value} ${colli.volume.unitTypeText}`}
                  dryIce={`${getDryIceValue(colli.dryIce)}`}
                  awb={colli.awb}
                />
              </Tr>
            </React.Fragment>
          ))}
        </Tbody>
      </StyledTable>
    </React.Fragment>
  );
}

function Packages(props) {
  return (
    <React.Fragment>
      <Td>{props.sn}</Td>
      <Td>{props.packageType}</Td>
      <Td>{props.length}</Td>
      <Td>{props.width}</Td>
      <Td>{props.height}</Td>
      <Td>{props.weight}</Td>
      <Td>{props.volume}</Td>
      <Td>{props.dryIce}</Td>
      <Td>{props.awb}</Td>
    </React.Fragment>
  );
}
