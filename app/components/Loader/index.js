/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const loadingVar = {
  primary: '#1B5192',
  borderwidth: '8',
  height: '50',
  borderwidthsm: '4',
  heightsm: '20',
};

const loadani = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;
const LoadingWrap = styled.div`
  display: block;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: ${props =>
    (props.color === 'dark' && 'rgba(51, 51, 51, 0.8)') ||
    (props.color === 'light' && 'rgba(200, 200, 200, 0.8)') ||
    'rgba(51, 51, 51, 0.8)'};
  z-index: 99999;
  .loader-logo {
    border-top: ${loadingVar.borderwidth}px solid #ddd;
    border-right: ${loadingVar.borderwidth}px solid #ddd;
    border-bottom: ${loadingVar.borderwidth}px solid #ddd;
    border-left: ${loadingVar.borderwidth}px solid ${loadingVar.primary};
    animation: ${loadani} 1.1s infinite linear;
    position: fixed;
    top: calc(50% - ${loadingVar.height / 2}px);
    left: calc(50% - ${loadingVar.height / 2}px);
    z-index: 99;
  }
  .loader-logo,
  .loader-logo:after {
    border-radius: 50%;
    width: ${loadingVar.height}px;
    height: ${loadingVar.height}px;
  }
`;

const AuthLoader = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 0.8rem;
  color: #666;
  & > span {
    margin: 0 10px;
  }
`;

const Loader = styled.div`
  display: inline-block;
  border-top: ${loadingVar.borderwidthsm}px solid #ddd;
  border-right: ${loadingVar.borderwidthsm}px solid #ddd;
  border-bottom: ${loadingVar.borderwidthsm}px solid #ddd;
  border-left: ${loadingVar.borderwidthsm}px solid ${loadingVar.primary};
  animation: ${loadani} 1.1s infinite linear;
  border-radius: 50%;
  width: ${loadingVar.heightsm}px;
  height: ${loadingVar.heightsm}px;
  vertical-align: middle;
  &:after {
    border-radius: 50%;
    width: ${loadingVar.heightsm}px;
    height: ${loadingVar.heightsm}px;
  }
`;

function LoaderIndicator(props) {
  return (
    <LoadingWrap color={props.color}>
      <div className="loader-logo" />
    </LoadingWrap>
  );
}

export function ActionLoader() {
  return (
    <LoadingWrap color="light">
      <div className="loader-logo" />
    </LoadingWrap>
  );
}

export function LoginLoader(props) {
  return (
    <AuthLoader>
      <Loader />
      <span>{props.message}</span>
    </AuthLoader>
  );
}

export function ButtonLoader() {
  return <Loader />;
}

export default LoaderIndicator;
