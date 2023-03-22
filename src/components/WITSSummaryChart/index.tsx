import React, { useMemo, useRef, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { getHighchartsOptions } from './options';
import styles from './styles.css';

interface WITSSummaryChartProps {
  data: any[];
  dataset: string;
  coordinates: any;
}

const WITSSummaryChart: React.FC<WITSSummaryChartProps> = ({ data, dataset, coordinates }) => {
  const chartRef = useRef<HighchartsReact>(null);

  useEffect(() => {
    // NOTE: Update chart size when container size has changed
    chartRef.current?.chart.setSize();
  }, [coordinates]);

  // NOTE: Use memoization technique
  // Calculate chart options ONLY when data changed.
  // This will also help avoid choppy animation
  return useMemo(() => {
    const options = getHighchartsOptions({ data, dataset });

    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        // NOTE: Pass className to style highchart
        containerProps={{ className: styles.chartContainer }}
        ref={chartRef}
      />
    );
  }, [data]);
};

export default WITSSummaryChart;
