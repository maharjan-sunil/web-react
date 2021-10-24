/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Row, Button, Collapse, Form } from '@bootstrap-styled/v4';
import { SwitchInput } from 'components/StyledInput/SwitchInput';

export function Filter(props) {
  const { register, handleSubmit, setValue } = useForm();
  const params = new URLSearchParams(window.location.search);
  const toDate = params.get('todate');
  if (params) {
    params
      .toString()
      .split('&')
      .forEach(param => {
        const key = param.split('=')[0];
        const value = param.split('=')[1];
        props.inputFields.forEach(input => {
          if (input.name) {
            if (input.name.toLowerCase() === key.toLocaleLowerCase()) {
              if (input.type === 'checkbox') {
                input.checked = 'checked';
              } else input.defaultValue = value;
            }
          } else if (input.from.name) {
            if (input.from.name.toLowerCase() === key) {
              let date = new Date(value);
              input.from.defaultValue = date.toISOString().substr(0, 10);
              if (toDate) {
                date = new Date(toDate);
                input.to.defaultValue = date.toISOString().substr(0, 10);
              }
            }
          }
        });
      });
  }
  useEffect(() => {
    props.inputFields.forEach(input => {
      switch (input.type) {
        case 'text':
        case 'date':
        case 'checkbox':
        case 'select':
          register({ name: input.name });
          break;
        case 'daterange':
          register({ name: input.from.name });
          register({ name: input.to.name });
          break;
      }
    });

    props.inputFields.forEach(input => {
      switch (input.type) {
        case 'text':
        case 'date':
        case 'checkbox':
        case 'select':
          setValue(input.name, input.defaultValue);
          break;
        case 'daterange':
          setValue(input.from.name, input.from.defaultValue);
          setValue(input.to.name, input.to.defaultValue);
          break;
      }
    });
  }, []);

  function setInputValue(name, value) {
    setValue(name, value);
  }

  return (
    <React.Fragment>
      <Collapse isOpen={props.isShowFilter}>
        <Form onSubmit={handleSubmit(props.handler)}>
          <Row>
            {props.inputFields.map((input, i) => (
              <SwitchInput
                key={i}
                input={input}
                onchangehandler={setInputValue}
              />
            ))}
          </Row>
          <Button color="primary" size="lg" className="mb-3">
            Filter
          </Button>
        </Form>
      </Collapse>
    </React.Fragment>
  );
}
