/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */
import styled from 'styled-components';
import { makeTheme } from 'bootstrap-styled/lib/theme';
import { lighten } from 'polished';
import { wallbeeThemeB4 } from '../../wallbee-theme';
const wallBeeTheme = makeTheme(wallbeeThemeB4);

const height = 30;
const IconStatus = styled.div`
  width: ${height}px;
  height: ${height}px;
  border-radius: ${height}px;
  text-align: center;
  line-height: ${height}px;
  display: inline-block;
  position: relative;
  background: #eee;
  border: 2px solid #ddd;
  svg {
    height: ${height / 2}px;
    width: ${height / 2}px;
    vertical-align: top;
    margin-top: ${Math.floor(height / 4) - 2}px;
  }
  .badge {
    position: absolute;
    border-radius: 30px;
  }
  &.disabled {
    opacity: 0.4;
  }
  &.success {
    color: ${wallBeeTheme.$green};
    border: 2px solid ${lighten(0.3, wallBeeTheme.$green)};
  }
  &.danger {
    color: ${wallBeeTheme.$red};
    // red is more saturate so need more ligten color
    border: 2px solid ${lighten(0.6, wallBeeTheme.$red)};
  }
`;
export default IconStatus;
