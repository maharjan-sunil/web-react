import styled from 'styled-components';

const LoadingContainer = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(51, 51, 51, 0.8);
  z-index: 99999;
  display: block;
  .loader-logo {
    height: 32px;
    width: 32px;
    background: url('./loader.gif') no-repeat center;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 99;
    transform: translate(-50%, -50%);
  }
`;

export const ActionLoadingContainer = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(51, 51, 51, 0.8);
  z-index: 99999;
  display: block;
  .loader-logo {
    height: 32px;
    width: 32px;
    background: url('./loader.gif') no-repeat center;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 99;
    transform: translate(-50%, -50%);
  }
`;

export default LoadingContainer;
