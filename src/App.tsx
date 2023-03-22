import React, { useState } from 'react';
import { LoadingIndicator, AppHeader, Select } from '@corva/ui/components';
import { MenuItem } from '@material-ui/core';

import { useWITSSummaryData } from './effects';
import { WITSSummaryChart } from './components';
import { DATASETS } from './constants';

import styles from './styles.css';

interface AppProps {
  well: {
    asset_id: string;
  };
  coordinates: any;
  appHeaderProps: any;
}

const App: React.FC<AppProps> = ({ well, coordinates, appHeaderProps }) => {
  const { asset_id: assetId } = well;

  const [dataset, setDataset] = useState(DATASETS[0]);
  const { witsSummaryData, loading } = useWITSSummaryData({ assetId, dataset });

  return (
    <div className={styles.container}>
      <AppHeader {...appHeaderProps} />

      <div className={styles.content}>
        <Select
          value={dataset}
          onChange={e => setDataset(e.target.value)}
          FormControlProps={{ classes: { root: styles.select } }}
        >
          {DATASETS.map((dataset) => (
            <MenuItem key={dataset} value={dataset}>
              {dataset}
            </MenuItem>
          ))}
        </Select>

        {loading && <LoadingIndicator />}
        {!loading && (
          <WITSSummaryChart data={witsSummaryData} coordinates={coordinates} dataset={dataset} />
        )}
      </div>
    </div>
  );
};

export default App;
