import styled, { createGlobalStyle } from 'styled-components';
import { Img, FormGroup, Input } from '@bootstrap-styled/v4';
import { borderRadius } from '@bootstrap-styled/css-mixins/lib/border-radius';

export const LoginBody = createGlobalStyle`
  html {
    min-height: 100%
  }
  body {
    height:  100%;
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background: #1B5192
  }
`;

export const LoginBox = styled.div`
  ${props => `
    ${borderRadius(props.theme['$enable-rounded'], '8px')}
    max-width: 480px;
    min-width: 420px;
    background: #fff;
    padding: 60px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `}
`;

export const LoginWrap = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

export const Logo = styled.div`
  ${Img} {
    max-width: 220px;
  }
  &:after {
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    margin-top: 20px;
    background: #ddd;
  }
`;

export const SubApp = styled.div`
  ${props => `
    ${borderRadius(props.theme['$enable-rounded'], '30px')}
    display: inline-block;
    margin: 0 auto;
    padding: 6px 15px;
    font-size: .9rem;
    position: relative;
    top: -16px;
    background: ${props.theme['$brand-primary']};
    color: ${props.theme.$white};
    `}
`;

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

export const StyledInputGroupWrap = styled.div`
  display: flex;
  & > div:first-child {
    flex-grow: 1;
  }
  .btn {
    height: 50px;
    width: 50px;
    margin-left: 10px;
  }
`;
