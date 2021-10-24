import styled from 'styled-components';

const Loadinglogo = styled.div`
  .loader-logo {
    border-top: 8px solid #fff;
    border-right: 8px solid #fff;
    border-bottom: 8px solid #fff;
    border-left: 8px solid $base-color;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: loadani 1.1s infinite linear;
    animation: loadani 1.1s infinite linear;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -40px/2;
    margin-top: -40px/2;
    z-index: 99;
  }
  .loader-logo,
  .loader-logo:after {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  @-webkit-keyframes loadani {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes loadani {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export default Loadinglogo;
