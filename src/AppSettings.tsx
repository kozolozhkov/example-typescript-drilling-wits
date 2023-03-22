import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

import { DATASETS } from './constants';

interface AppSettingsProps {
  settings: {
    isExampleCheckboxChecked: boolean;
  };
  onSettingChange: (key: string, value: boolean) => void;
  app: any;
  appData: any;
  company?: any;
  user?: any;
}

const AppSettings: React.FC<AppSettingsProps> = ({
  settings: apiSettings,
  onSettingChange,
}) => {
  const settings = { ...DATASETS, ...apiSettings };

  return (
    <div>
      <FormControlLabel
        label="Example checkbox"
        control={
          <Checkbox
            checked={settings.isExampleCheckboxChecked}
            onChange={(e) => onSettingChange('isExampleCheckboxChecked', e.target.checked)}
          />
        }
      />
    </div>
  );
};

AppSettings.defaultProps = {
  user: {},
  company: {},
};

export default AppSettings;
