import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';

export default function ChartLayout({
  type,
  hAxisTitle,
  vAxisTitle,
  reports,
  bars,
  isStacked,
}) {
  if (type === 'LineChart') {
    return (
      <React.Fragment>
        <Chart
          width="100%"
          height="95%"
          chartType={type}
          loader={<div>Loading Chart</div>}
          data={reports}
          options={{
            hAxis: {
              title: `${hAxisTitle}`,
              minValue: 0,
            },
            vAxis: {
              title: `${vAxisTitle}`,
            },
          }}
          legendToggle
        />
      </React.Fragment>
    );
  }
  if (type === 'BarChart') {
    return (
      <React.Fragment>
        <Chart
          width="100%"
          height="95%"
          chartType={type}
          loader={<div>Loading Chart</div>}
          data={reports}
          options={{
            hAxis: {
              title: `${hAxisTitle}`,
              minValue: 0,
            },
            vAxis: {
              title: `${vAxisTitle}`,
            },
            isStacked: `${isStacked}`,
            bars: `${bars}`,
          }}
          legendToggle
        />
      </React.Fragment>
    );
  }
  if (type === 'Bar') {
    return (
      <React.Fragment>
        <Chart
          width="100%"
          height="95%"
          chartType={type}
          loader={<div>Loading Chart</div>}
          data={reports}
          options={{
            hAxis: {
              title: `${hAxisTitle}`,
              minValue: 0,
            },
            vAxis: {
              title: `${vAxisTitle}`,
            },
            bars: `${bars}`,
            axes: {
              y: {
                0: { side: 'right' },
              },
            },
          }}
          legendToggle
        />
      </React.Fragment>
    );
  }
}

ChartLayout.propTypes = {
  type: PropTypes.string,
  hAxisTitle: PropTypes.string,
  vAxisTitle: PropTypes.string,
  reports: PropTypes.array,
  bars: PropTypes.string,
  isStacked: PropTypes.bool,
};
