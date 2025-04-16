import React, { useState, useCallback, useContext } from 'react';
import { loadSettings, saveSettings } from 'src/helpers/localStorage';

/** @typedef {import('../types').PomodoroSettings} PomodoroSettings */

const savedSettings = loadSettings();

/** @type {PomodoroSettings} */
const DEFAULT_SETTINGS = { pomodoro: 25, pause: 5 };

const mergedSettings = {
  pomodoro: savedSettings?.pomodoro ?? DEFAULT_SETTINGS.pomodoro,
  pause:savedSettings?.pause ?? DEFAULT_SETTINGS.pause,
}

const ConfigContext = React.createContext({
  config: mergedSettings,
  /** @param {PomodoroSettings} config */
  changeConfig: (config) => {},
  restore: () => {}
});

/** @param {import('react').PropsWithChildren} props */
const ConfigProvider = (props) => {
  const [config, setConfig] = useState(mergedSettings);

  const changeConfig = useCallback(
    /** @param {PomodoroSettings} newConfig */
    (newConfig) => {
      saveSettings(newConfig);
      setConfig(newConfig);
    },
    []
  );

  const restore = useCallback(
    () => {
      saveSettings(DEFAULT_SETTINGS);
      setConfig(DEFAULT_SETTINGS);
    }, []
  );

 return (
   <ConfigContext.Provider value={{config, changeConfig, restore }}>
     {props.children},
   </ConfigContext.Provider>
 );
}

const useConfig = () => useContext(ConfigContext);

export { ConfigContext, ConfigProvider, useConfig};