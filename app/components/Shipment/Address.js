/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  AccordionGroup,
  Accordion,
  Tbody,
  Tr,
  Td,
  Badge,
} from '@bootstrap-styled/v4';
import StyledTable from 'components/Table';

export default function Address(props) {
  const [
    { activeName, hasSender, hasReceiver, hasShipper, hasBilling, hasPickup },
    setName,
  ] = useState({
    activeName: '',
    hasSender: false,
    hasReceiver: false,
    hasShipper: false,
    hasBilling: false,
    hasPickup: false,
  });

  useEffect(() => {
    let name = '';
    let isSender = false;
    let isReceiver = false;
    let isShipper = false;
    let isBilling = false;
    let isPickup = false;
    if (props.shipment.senderAddress) {
      name = 'senderAddress';
      isSender = true;
    }
    if (props.shipment.recieverAddress) {
      name = name === '' ? 'receiverAddress' : name;
      isReceiver = true;
    }
    if (props.shipment.shipperAddress) {
      name = name === '' ? 'shipperAddress' : name;
      isShipper = true;
    }
    if (props.shipment.billingAddress) {
      name = name === '' ? 'billingAddress' : name;
      isBilling = true;
    }
    if (
      props.shipment.pickupID > 0 &&
      props.shipment.pickupDetails &&
      props.shipment.pickupDetails.pickupAddress
    ) {
      name = name === '' ? 'pickupAddress' : name;
      isPickup = true;
    }

    setName({
      activeName: name,
      hasSender: isSender,
      hasReceiver: isReceiver,
      hasShipper: isShipper,
      hasBilling: isBilling,
      hasPickup: isPickup,
    });
  }, []);

  return (
    <React.Fragment>
      {hasSender && (
        <AddressAccordion
          heading="Sender Address"
          name="senderAddress"
          activeName={activeName}
          address={props.shipment.senderAddress}
        />
      )}
      {hasReceiver && (
        <AddressAccordion
          heading="Receiver Address"
          name="receiverAddress"
          activeName={activeName}
          address={props.shipment.recieverAddress}
        />
      )}
      {hasShipper && (
        <AddressAccordion
          heading="Shipper Address"
          name="shipperAddress"
          activeName={activeName}
          address={props.shipment.shipperAddress}
        />
      )}
      {hasBilling && (
        <AddressAccordion
          heading="Billing Address"
          name="billingAddress"
          activeName={activeName}
          address={props.shipment.billingAddress}
        />
      )}
      {hasPickup && (
        <AddressAccordion
          heading="Pickup Address"
          name="pickupAddress"
          activeName={activeName}
          address={props.shipment.pickupDetails.pickupAddress}
        />
      )}
    </React.Fragment>
  );
}

function AddressAccordion(props) {
  const [{ activeName }, setName] = useState({ activeName: props.activeName });
  return (
    <React.Fragment>
      <AccordionGroup
        activeAccordionName={activeName}
        onChange={activeAccordionName => {
          if (activeName) {
            setName({ activeName: '' });
          } else {
            setName({ activeName: activeAccordionName });
          }
        }}
      >
        <Accordion heading={props.heading} name={props.name}>
          <StyledTable>
            <Tbody>
              <Tr>
                <Td>Company</Td>
                <Td>{props.address.companyName}</Td>
              </Tr>
              <Tr>
                <Td>Address 1</Td>
                <Td>{props.address.address1}</Td>
              </Tr>
              {props.address.address2 && (
                <Tr>
                  <Td>Address 2</Td>
                  <Td>{props.address.address2}</Td>
                </Tr>
              )}
              {props.address.address3 && (
                <Tr>
                  <Td>Address 3</Td>
                  <Td>{props.address.address3}</Td>
                </Tr>
              )}
              <Tr>
                <Td>City</Td>
                <Td>{props.address.city}</Td>
              </Tr>
              <Tr>
                <Td>Postal Code</Td>
                <Td>{props.address.postalCode}</Td>
              </Tr>
              <Tr>
                <Td>Country</Td>
                <Td>
                  {props.address.countryText}{' '}
                  <Badge color="danger">{props.address.countryIsoCode}</Badge>
                </Td>
              </Tr>
              <Tr>
                <Td>Contact Person</Td>
                <Td>{props.address.contactPerson.contactName}</Td>
              </Tr>
              <Tr>
                <Td>Email</Td>
                <Td>{props.address.contactPerson.email}</Td>
              </Tr>
              {props.address.contactPerson.phone && (
                <Tr>
                  <Td>Phone</Td>
                  <Td>{props.address.contactPerson.phone}</Td>
                </Tr>
              )}
              {props.address.contactPerson.mobil && (
                <Tr>
                  <Td>Mobile</Td>
                  <Td>{props.address.contactPerson.mobil}</Td>
                </Tr>
              )}
            </Tbody>
          </StyledTable>
        </Accordion>
      </AccordionGroup>
    </React.Fragment>
  );
}
