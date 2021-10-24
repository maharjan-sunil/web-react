/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { AccordionGroup, Accordion } from '@bootstrap-styled/v4';

export default function PLSDocument(props) {
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
          {props.documents.map((doc, i) => (
            <PaperlessDocument key={i} document={doc} />
          ))}
        </Accordion>
      </AccordionGroup>
    </React.Fragment>
  );
}

function PaperlessDocument(props) {
  return (
    <React.Fragment>
      <iframe
        width="50%"
        height="500px"
        src={`data:application/pdf;base64,${props.document}`}
        type="data:application/pdf"
        title={props.key}
      />
    </React.Fragment>
  );
}
