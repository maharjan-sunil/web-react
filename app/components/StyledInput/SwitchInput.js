/* eslint-disable react/no-array-index-key */
/* eslint-disable default-case */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Col, Label, Select, Option, Input } from '@bootstrap-styled/v4';
import { StyledFormGroup, StyledInput } from 'components/StyledInput';

export function SwitchInput(props) {
  const { input } = props;
  switch (input.type) {
    case 'text':
      return (
        <TextInput
          input={props.input}
          onchangehandler={props.onchangehandler}
        />
      );
    case 'date':
      return (
        <DateInput
          input={props.input}
          onchangehandler={props.onchangehandler}
        />
      );
    case 'checkbox':
      return (
        <CheckBoxInput
          input={props.input}
          onchangehandler={props.onchangehandler}
        />
      );
    case 'daterange':
      return (
        <DateRangeInput
          input={props.input}
          onchangehandler={props.onchangehandler}
        />
      );
    case 'select':
      return (
        <SelectInput
          input={props.input}
          onchangehandler={props.onchangehandler}
        />
      );
  }
}

function TextInput(props) {
  return (
    <React.Fragment>
      <Col md="4">
        <StyledFormGroup>
          <StyledInput
            type={props.input.type}
            placeholder={props.input.placeholder}
            name={props.input.name}
            defaultValue={props.input.defaultValue}
            onChange={e => {
              props.onchangehandler(props.input.name, e.currentTarget.value);
            }}
          />
          <Label htmlFor={props.input.name}>{props.input.labelText}</Label>
        </StyledFormGroup>
        {props.input.note && (
          <Label style={{ color: 'red', fontSize: '12px' }}>
            {props.input.note}
          </Label>
        )}
      </Col>
    </React.Fragment>
  );
}

function DateInput(props) {
  return (
    <React.Fragment>
      <Col md="4">
        <StyledFormGroup>
          <StyledInput
            type={props.input.type}
            placeholder={props.input.placeholder}
            name={props.input.name}
            defaultValue={props.input.defaultValue}
            onChange={e => {
              props.onchangehandler(props.input.name, e.currentTarget.value);
            }}
          />
          <Label htmlFor={props.input.name}>{props.input.labelText}</Label>
        </StyledFormGroup>
      </Col>
    </React.Fragment>
  );
}

function DateRangeInput(props) {
  const [fromDate, setFromDate] = useState(props.input.from.defaultValue);
  return (
    <React.Fragment>
      <Col md="4">
        <StyledFormGroup>
          <Input
            type="date"
            id={props.input.from.name}
            name={props.input.from.name}
            defaultValue={props.input.from.defaultValue}
            placeholder={props.input.from.placeholder}
            onChange={e => {
              setFromDate(e.currentTarget.value);
              props.onchangehandler(
                props.input.from.name,
                e.currentTarget.value,
              );
            }}
          />
        </StyledFormGroup>
      </Col>
      <Col md="4">
        <StyledFormGroup>
          <Input
            type="date"
            id={props.input.to.name}
            name={props.input.to.name}
            defaultValue={props.input.to.defaultValue}
            placeholder={props.input.to.placeholder}
            min={fromDate}
            onChange={e => {
              props.onchangehandler(props.input.to.name, e.currentTarget.value);
            }}
          />
        </StyledFormGroup>
      </Col>
    </React.Fragment>
  );
}

function SelectInput(props) {
  return (
    <React.Fragment>
      <Col md="4">
        <StyledFormGroup>
          <Select
            className="form-control"
            name={props.input.name}
            id={props.input.name}
            defaultValue={props.input.defaultValue}
            onChange={e => {
              props.onchangehandler(props.input.name, e.currentTarget.value);
            }}
          >
            {props.input.selectOptions.map((data, i) => (
              <Option key={i} value={data.value}>
                {data.key}
              </Option>
            ))}
          </Select>
        </StyledFormGroup>
      </Col>
    </React.Fragment>
  );
}

function CheckBoxInput(props) {
  return (
    <React.Fragment>
      <Col md="4">
        <StyledFormGroup>
          <Label htmlFor={props.input.name}>{props.input.labelText}</Label>
          <StyledInput
            type={props.input.type}
            placeholder={props.input.placeholder}
            name={props.input.name}
            defaultChecked={props.input.checked}
            onChange={e => {
              props.onchangehandler(props.input.name, e.currentTarget.checked);
            }}
          />
        </StyledFormGroup>
      </Col>
    </React.Fragment>
  );
}
