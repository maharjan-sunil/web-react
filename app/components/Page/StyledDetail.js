import styled from 'styled-components';

export const InfoDetailWrap = styled.div`
  $width: 200px;
  padding: 30px;
`;

export const InfoDetail = styled.div`
  max-width: 1000px;
`;

export const InfoDetailRow = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  &:last-child {
    border-bottom: 0;
  }
`;

export const DetailLabel = styled.label`
  width: 200px;
  color: $gray-600;
  margin-bottom: 0;
`;

export const DetailValue = styled.div`
  font-weight: bold;
  flex-grow: 1;
  &.btn-flex {
    .btn {
      margin-right: 10px;
    }
  }
  &.value-flex {
    display: flex;
    & > div {
      flex: 1;
    }
  }
`;

export const DetailPopUpWrap = styled.div`
  &:before {
    display: none;
    content: '';
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: $overlay-color;
    z-index: 99;
  }
  &.active {
    &:before,
    .pop-up {
      display: block;
    }
  }
`;

export const DetailPopUp = styled.div`
  display: none;
  $height: 80%;
  $width: 800px;
  height: $height;
  width: $width;
  position: fixed;
  top: 50%;
  left: 50%;
  background: #fff;
  z-index: 999;
  transform: translate(-50%, -50%);
`;

export const DetailPopUpHead = styled.div`
  padding: 15px;
  border-bottom: 1px solid $border-color;
`;

export const DetailPopUpBody = styled.div`
  padding: 15px;
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  resize: none;
  &:focus {
    border: 2px solid $base-color;
    outline: 0;
  }
`;
