import styled from 'styled-components';
import { rgba } from 'polished';
import { makeTheme } from 'bootstrap-styled/lib/theme';
import { wallbeeThemeB4 } from '../../wallbee-theme';
import GridMove from './grid_move.png';
const wallBeeTheme = makeTheme(wallbeeThemeB4);

const GridTitle = styled.div`
  padding: 0 10px 0 20px;
  height: 40px;
  line-height: 39px;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 5px;
  font-size: 1rem;
  font-weight: bold;
  background: url(${GridMove}) no-repeat 5px center;
  .grid-action {
    display: inline-block;
    float: right;
  }
`;

const CloseButton = styled.div`
  display: inline-block;
  float: right;
  height: 16px;
  line-height: 16px;
  width: 16px;
  text-align: center;
  margin-top: 10px;
  color: #888;
  &:hover {
    color: #000;
    cursor: pointer;
  }
  svg {
    width: 16px;
    height: 16px;
  }
`;

const PinButton = styled.div`
  display: inline-block;
  margin-right: 10px;
  float: right;
  height: 16px;
  line-height: 16px;
  width: 16px;
  text-align: center;
  margin-top: 10px;
  color: #888;
  &:hover {
    color: #000;
    cursor: pointer;
  }
  svg {
    width: 16px;
    height: 16px;
  }
`;

const GridSelect = styled.select`
  border: 1px solid transparent;
  margin: 0 5px;
  font-weight: bold;
  border-radius: 2px;
  &:hover {
    border: 1px solid ${rgba(wallBeeTheme['$brand-primary'], 0.2)};
    background: ${rgba(wallBeeTheme['$brand-primary'], 0.1)};
  }
  &:focus {
    outline: 0px;
  }
`;

const GridInput = styled.input`
  height: 24px;
  line-height: 24px;
  text-align: center;
  font-weight: bold;
  width: 50px;
  border: 1px solid ${rgba(wallBeeTheme['$brand-primary'], 0.2)};
  margin: 0 5px;
  border-radius: 2px;
  &:hover,
  &:focus {
    border: 1px solid ${rgba(wallBeeTheme['$brand-primary'], 1)};
    outline: 0px;
  }
`;

export { GridTitle, CloseButton, GridSelect, GridInput, PinButton };
