import { Checkbox, FormControlLabel } from '@material-ui/core';

import { DEFAULT_SETTINGS } from './constants';

/* Types */
interface AppSettingsProps {
  app: { [key: string]: any };
  appData: { [key: string]: any };
  company: { [key: string]: any };
  onSettingChange: (key: string, value: any) => void;
  settings: {
    isExampleCheckboxChecked: boolean;
  };
  user: { [key: string]: any };
}

const AppSettings = (props: AppSettingsProps): JSX.Element => {
  const { settings: apiSettings, onSettingChange } = props;
  const settings = { ...DEFAULT_SETTINGS, ...apiSettings };

  return (
    <div>
      <FormControlLabel
        label="Example checkbox"
        control={
          <Checkbox
            checked={settings.isExampleCheckboxChecked}
            onChange={e => onSettingChange('isExampleCheckboxChecked', e.target.checked)}
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

// Important: Do not change root component default export (AppSettings.js). Use it as container
//  for your App Settings. It's required to make build and zip scripts work as expected;
export default AppSettings;
