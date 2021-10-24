import styled from 'styled-components';
import { FormGroup, Input } from '@bootstrap-styled/v4';

export const StyledFormGroup = styled(FormGroup)`
  position: relative;
  margin-bottom: 1rem;

  & > input,
  & > label {
    height: 3.125rem;
    padding: 0.75rem;
  }

  & > label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    line-height: 1.5;
    color: #495057;
    pointer-events: none;
    cursor: text;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: all 0.1s ease-in-out;
  }
`;

export const StyledInput = styled(Input)`
  &::placeholder {
    color: transparent !important;
  }

  &:not(:placeholder-shown) {
    padding-top: 1.25rem;
    padding-bottom: 0.25rem;
  }
  &:not(:placeholder-shown) ~ label {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    font-size: 10px;
    color: #777;
  }
`;
