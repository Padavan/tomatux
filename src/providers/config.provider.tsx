import React, { useState, useCallback, useContext, PropsWithChildren } from "react";
import { loadSettings, saveSettings } from "../helpers/localStorage";
import { PomodoroSettings } from "../helpers/types";

const savedSettings = loadSettings();

const DEFAULT_SETTINGS: PomodoroSettings = { pomodoro: 25, pause: 5, theme: "system" };

const mergedSettings = {
  pomodoro: savedSettings?.pomodoro ?? DEFAULT_SETTINGS.pomodoro,
  pause: savedSettings?.pause ?? DEFAULT_SETTINGS.pause,
  theme: savedSettings?.theme ?? "system",
};

const ConfigContext = React.createContext({
  config: mergedSettings,
  changeConfig: (_config: PomodoroSettings) => {},
  restore: () => {},
});

const ConfigProvider = (props: PropsWithChildren) => {
  const [config, setConfig] = useState(mergedSettings);

  const changeConfig = useCallback((newConfig: PomodoroSettings) => {
    saveSettings(newConfig);
    setConfig(newConfig);
  }, []);

  const restore = useCallback(() => {
    saveSettings(DEFAULT_SETTINGS);
    setConfig(DEFAULT_SETTINGS);
  }, []);

  return (
    <ConfigContext.Provider value={{ config, changeConfig, restore }}>
      {props.children}
    </ConfigContext.Provider>
  );
};

const useConfig = () => useContext(ConfigContext);

export { ConfigContext, ConfigProvider, useConfig };
