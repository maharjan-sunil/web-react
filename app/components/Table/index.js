import styled from 'styled-components';
import Table from '@bootstrap-styled/v4/lib/Table';

const StyledTable = styled(Table)`
  background: #fff !important;
  border: 1px solid #dee2e6;
  & tbody tr:hover {
    background: rgb(27, 81, 146, 0.15);
  }
  & tbody tr.active {
    background: rgb(27, 81, 146, 0.15);
  }
`;

export default StyledTable;
