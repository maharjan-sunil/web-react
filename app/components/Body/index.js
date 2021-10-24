import { createGlobalStyle } from 'styled-components';
import { makeTheme } from 'bootstrap-styled/lib/theme';
import { wallbeeThemeB4 } from '../../wallbee-theme';

const wallBeeTheme = makeTheme(wallbeeThemeB4);

const Body = createGlobalStyle`
    html{
        min-width: 1200px;
        height: 100%;
        font-family: "Roboto", sans-serif;
        font-size: 12px;
    }
    body {
        background: #f0f2f5;
        color: #212529;
        overflow-x: hidden;
    }
    a{
        color: ${wallBeeTheme['$brand-primary']};
    }
`;

export default Body;
