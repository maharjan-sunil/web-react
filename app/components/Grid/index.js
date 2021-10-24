import React from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Times, Thumbtack } from '@styled-icons/fa-solid';

import ChartLayout from 'components/Chart/index';
import {
  GridTitle,
  CloseButton,
  GridSelect,
  GridInput,
  PinButton,
} from 'components/Grid/style';

import './style-layout.scss';
import './style-resizable.scss';

const ResponsiveGridLayout = WidthProvider(Responsive);
export default function GridLayout({
  gridLayouts,
  reportFilter,
  handleReportLayout,
  handleGridDraggable,
}) {
  const layouts = {
    lg: gridLayouts.filter(f => f.showReport === true).map(m => m.layout),
  };
  const showPin = false;

  return (
    <React.Fragment>
      <ResponsiveGridLayout
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        {gridLayouts
          .filter(f => f.showReport === true)
          .map(l => (
            <div key={l.key}>
              <GridTitle>
                <FilterInput
                  id={l.key}
                  title1={l.chart.title1}
                  title2={l.chart.title2}
                  hasFilter={l.hasFilter}
                  filterInput={l.filterInput}
                  filterData={l.filterData}
                  filterValue={l.filterValue}
                  reportFilter={reportFilter}
                />
                <div className="grid-action">
                  <CloseButton
                    onClick={e => {
                      e.preventDefault();
                      handleReportLayout(l.key, l.filterValue);
                    }}
                  >
                    <Times />
                  </CloseButton>
                  {showPin && (
                    <PinButton
                      onClick={e => {
                        e.preventDefault();
                        handleGridDraggable(l.key);
                      }}
                    >
                      {l.layout.isDraggable === true ? (
                        <Thumbtack transform="rotate(90)" />
                      ) : (
                        <Thumbtack />
                      )}
                    </PinButton>
                  )}
                </div>
              </GridTitle>
              <ChartLayout
                type={l.chart.type}
                reports={l.reports}
                hAxisTitle={l.chart.hAxisTitle}
                vAxisTitle={l.chart.vAxisTitle}
                bars={l.chart.bars}
                isStacked={l.chart.isStacked}
              />
            </div>
          ))}
      </ResponsiveGridLayout>
    </React.Fragment>
  );
}

function FilterInput({
  id,
  title1,
  title2,
  hasFilter,
  filterInput,
  filterData,
  filterValue,
  reportFilter,
}) {
  if (hasFilter) {
    if (filterInput === 'dropdown') {
      return (
        <React.Fragment>
          {title1}
          <GridSelect
            defaultValue={filterValue}
            onChange={e => {
              reportFilter(id, e.currentTarget.value);
            }}
          >
            {filterData.map(m => (
              <option key={`${id}_${m}`}>{m}</option>
            ))}
          </GridSelect>
          {title2}
        </React.Fragment>
      );
    }
    if (filterInput === 'textbox') {
      return (
        <React.Fragment>
          {title1}
          <GridInput
            type="number"
            defaultValue={filterValue}
            onBlur={e => {
              reportFilter(id, e.currentTarget.value);
            }}
          />
          {title2}
        </React.Fragment>
      );
    }
  }
  return <React.Fragment>{`${title1}${title2}`}</React.Fragment>;
}

FilterInput.propTypes = {
  id: PropTypes.string,
  title1: PropTypes.string,
  title2: PropTypes.string,
  hasFilter: PropTypes.bool,
  filterInput: PropTypes.string,
  filterData: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  filterValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  reportFilter: PropTypes.func,
};

GridLayout.propTypes = {
  gridLayouts: PropTypes.array,
  reportFilter: PropTypes.func,
  handleReportLayout: PropTypes.func,
  handleGridDraggable: PropTypes.func,
};
