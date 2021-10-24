import React from 'react';
import { Link } from 'react-router-dom';
import LinkButton from 'components/LinkButton';
import { Truck } from '@styled-icons/fa-solid/Truck';
import { Info } from '@styled-icons/fa-solid/Info';
import { Recycle } from '@styled-icons/fa-solid/Recycle';
import PropTypes from 'prop-types';
export default function SetActionLinks({ item, index, onActionClick }) {
  return (
    <React.Fragment>
      <LinkButton
        className="mr-1"
        tag={Link}
        data-toggle="tooltip"
        data-placement="top"
        title="Detail"
        to={`/data-connections/${item.id}`}
      >
        <Info size="12" />
      </LinkButton>
      <LinkButton
        data-toggle="tooltip"
        data-placement="top"
        title="Shipment Detail"
        className="mr-1"
        tag={Link}
        to={`/data-connections/shipment/${item.shipmentId}`}
      >
        <Truck size="12" />
      </LinkButton>
      {item.dataConnIsProcessed && (
        <React.Fragment>
          <LinkButton
            data-toggle="tooltip"
            data-placement="top"
            title="Reset"
            className="mr-1"
            onClick={() => {
              const header = 'Reset Data Connection';
              const confirm = 'Are you sure, do want to reset data connection?';
              const content = [
                { label: 'Awb', value: item.awb },
                { label: 'Site', value: item.siteName },
                { label: 'A/C Number', value: item.carrierAccount },
              ];
              onActionClick(item.id, header, confirm, content, 1, index);
            }}
          >
            <Recycle size="12" />
          </LinkButton>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
SetActionLinks.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  onActionClick: PropTypes.func,
};
