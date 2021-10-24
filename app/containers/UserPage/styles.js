import styled from 'styled-components';
import avatar from './avatar.png';

export const ProfileWrap = styled.div`
  background: #fff;
  border: 1px solid #dee2e6;
  margin-bottom: 30px;
  position: relative;
  padding: 30px;
  display: flex;
`;

export const UserAvatar = styled.div`
  width: 200px;
  text-align: center;
  background: url(${props => props.bgColor || avatar}) no-repeat center #ced4da;
  background-size: cover;
  border-radius: 200px;
`;

export const UserDetail = styled.div`
  max-width: 500px;
  margin-left: 30px;
  padding-left: 30px;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  border-left: 1px solid #e9ecef;
`;

export const UserDetailRow = styled.div`
  padding: 10px 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-top: 1px dashed #dee2e6;
`;

export const UserProfileRow = styled.div`
  font-weight: bold;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
`;

export const ChangeButton = styled.button`
  margin-top: 20px;
  opacity: 0.8;
  background: #ced4da;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
  color: #495057;
  border: 1px solid transparent;
  cursor: pointer;
`;

export const StyledLable = styled.label`
  width: 160px;
  color: #6c757d;
  margin-bottom: 0;
`;
