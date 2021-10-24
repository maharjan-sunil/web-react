import styled from 'styled-components';
import Table from '@bootstrap-styled/v4/lib/Table';

const StyledExpandTable = styled(Table)`
  background: #fff !important;
  border: 1px solid #dee2e6;
  & tbody:hover tr.main-row {
    background: rgb(27, 81, 146, 0.15);
  }
  & tbody tr.active {
    background: rgb(27, 81, 146, 0.15);
  }
  &.table {
    .tr_icon {
      width: 30px;
    }
    .tr_body {
      display: none;
    }
    tbody.expand {
      .tr_body {
        display: table-row;
      }
      .sub-row{
        &:hover{
          background: rgb(100, 81, 190, 0.25);
        }
      }
    }
`;

export default StyledExpandTable;
