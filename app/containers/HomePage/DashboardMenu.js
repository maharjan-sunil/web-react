import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import {
  CalendarDay,
  CalendarWeek,
  CalendarAlt,
  Calendar,
  CalendarCheck,
  CalendarTimes,
} from '@styled-icons/fa-solid';

import { wallbeeThemeB4 } from '../../wallbee-theme';

export default function DashboardMenu({ gridLayouts, handleReportLayout }) {
  return (
    <React.Fragment>
      <HomeUL>
        {gridLayouts
          .filter(f => f.showReport === false)
          .map(m => (
            <HomeLI
              key={`${m.key}_home_action`}
              onClick={e => {
                e.preventDefault();
                handleReportLayout(m.key, m.filterValue);
              }}
            >
              <DashboardIcon reportName={m.key} />
            </HomeLI>
          ))}
      </HomeUL>
    </React.Fragment>
  );
}

DashboardMenu.propTypes = {
  gridLayouts: PropTypes.array,
  handleReportLayout: PropTypes.func,
};

const HomeUL = styled.ul`
  margin: 0 10px;
  list-style: none;
  padding: 0;
`;

const HomeLI = styled.li`
  display: inline-block;
  margin: 5px;
  padding: 0 10px 0 28px;
  border-radius: 30px;
  background: #ddd;
  font-weight: bold;
  line-height: 30px;
  position: relative;
  svg {
    height: 16px;
    width: 16px;
    position: absolute;
    top: 6px;
    left: 8px;
  }
  &:hover {
    background: ${wallbeeThemeB4['$brand-primary']};
    color: #ffffff;
    cursor: pointer;
  }
`;

function DashboardIcon({ reportName }) {
  switch (reportName) {
    case 'daily-by-month':
      return (
        <React.Fragment>
          <CalendarDay />
          Daily/Month
        </React.Fragment>
      );
    case 'daily-by-current-week':
      return (
        <React.Fragment>
          <CalendarWeek />
          Daily Current Week
        </React.Fragment>
      );
    case 'daily-by-last-days':
      return (
        <React.Fragment>
          <CalendarAlt />
          Daily Last Days
        </React.Fragment>
      );
    case 'monthly-by-year':
      return (
        <React.Fragment>
          <Calendar />
          Monthly/Year
        </React.Fragment>
      );
    case 'site-monthly-success-by-year':
      return (
        <React.Fragment>
          <CalendarCheck />
          Site Success/Year
        </React.Fragment>
      );
    case 'site-monthly-failure-by-year':
      return (
        <React.Fragment>
          <CalendarTimes />
          Site Failure/Year
        </React.Fragment>
      );
    default:
      return (
        <React.Fragment>
          <div />
        </React.Fragment>
      );
  }
}

DashboardIcon.propTypes = {
  reportName: PropTypes.string,
};
