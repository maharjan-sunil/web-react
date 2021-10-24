/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Col } from '@bootstrap-styled/v4';

import Other from './Other';
import AWBLabel from './AWBLabel';
import PLSDocument from './PLSDocument';
import Address from './Address';
import Detail from './Detail';
import Package from './Package';

export default function ShipmentBody(props) {
  const [{ hasDocument, documents }, setDocumentState] = useState({
    hasDocument: false,
    documents: [],
  });

  const [{ hasAWBLabel, awbLabels }, setAWBState] = useState({
    hasAWBLabel: false,
    awbLabels: '',
  });

  useEffect(() => {
    const pdfFiles = [];
    if (props.shipment.pls && props.shipment.pls.documents) {
      props.shipment.pls.documents.forEach(i => {
        pdfFiles.push(i.document);
      });
      setDocumentState({ hasDocument: true, documents: pdfFiles });
    }
    if (props.shipment.awb && props.shipment.awbLabels) {
      setAWBState({
        hasAWBLabel: true,
        awbLabels: props.shipment.awbLabels,
      });
    }
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col md="4">
          <Address shipment={props.shipment} />
        </Col>
        <Col md="8">
          <Detail shipment={props.shipment} />
          {props.shipment.collies && (
            <Package collies={props.shipment.collies} />
          )}
          <Other
            tableName="Other Detail"
            receiverReference={props.shipment.references[0].text}
            sendersReference={props.shipment.references[1].text}
            shipmentDescription={
              props.shipment.shipmentDescription === null
                ? 'N/A'
                : props.shipment.shipmentDescription.shipmentDescription
            }
            shipmentDirection={props.shipment.shipmentDirection}
            customsValue={props.shipment.customsValue}
            pls={props.shipment.pls}
            dg={props.shipment.dg}
            paymentDirectionText={props.shipment.paymentDirectionText}
            handling={props.shipment.handling}
            paymentdirection={props.shipment.paymentdirection}
          />
        </Col>
      </Row>
      {hasAWBLabel && (
        <React.Fragment>
          <AWBLabel
            awbLabels={awbLabels}
            heading="AWB Label"
            name="awbLabel"
            activeName="awbLabel"
          />
        </React.Fragment>
      )}
      {hasDocument && (
        <React.Fragment>
          <PLSDocument
            documents={documents}
            heading="PLS Documents"
            name="plsDocument"
            activeName="plsDocument"
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
