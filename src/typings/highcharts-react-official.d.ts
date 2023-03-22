declare module 'highcharts-react-official' {
    import * as React from 'react';
    import * as Highcharts from 'highcharts';
  
    export interface HighchartsReactProps {
      highcharts: typeof Highcharts;
      constructorType?: string;
      options: Highcharts.Options;
      callback?: Highcharts.ChartCallbackFunction;
      updateArgs?: [Highcharts.Options, boolean, boolean];
      containerProps?: React.HTMLAttributes<HTMLDivElement>;
      children?: React.ReactNode;
    }
  
    export default class HighchartsReact extends React.Component<HighchartsReactProps> {
      public container: React.RefObject<HTMLDivElement>;
      public chart: Highcharts.Chart;
      public render(): React.ReactNode;
    }
  }
  