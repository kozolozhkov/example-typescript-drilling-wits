// options.ts
import { Options, SeriesOptionsType } from 'highcharts';

interface WitsRecord {
  timestamp: number;
  data: {
    hole_depth: number;
    state: string;
  };
}

interface GetHighchartsOptionsParams {
  data: WitsRecord[];
  dataset: string;
}

const defaultHighchartsOptions: Options = {
  chart: {
    backgroundColor: '#201f1f',
    type: 'line',
  },
  plotOptions: {
    series: {
      marker: {
        enabled: false,
      },
    },
  },
  xAxis: {
    type: 'datetime',
    title: { text: 'Date' },
  },
  yAxis: {
    title: { text: 'Hole Depth' },
    gridLineColor: '#3b3b3b',
    min: 0,
  },
  credits: { enabled: false },
  exporting: { enabled: false },
};

export function getHighchartsOptions({ data, dataset }: GetHighchartsOptionsParams): Options {
  const series: SeriesOptionsType[] = [
    {
      type: 'line',
      name: dataset,
      data: data.map(witsRecord => ({
        x: witsRecord.timestamp * 1000,
        y: witsRecord.data.hole_depth,
        name: witsRecord.data.state,
      })),
      turboThreshold: 20000,
    },
  ];

  return {
    ...defaultHighchartsOptions,
    title: { text: `Example ${dataset} chart`, style: { color: 'white' } },
    series,
  };
}
