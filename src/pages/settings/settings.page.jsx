import React, { useRef, useState } from "react";
import { requestPermission } from "../../helpers/notification";
import { useConfig } from "../../providers/config.provider";


/** @typedef {import('../../types').PomodoroSettings} PomodoroSettings */


/** @param {string} [permission] */
const getNotificationToggleLabel = (permission) => {
  if (permission === "granted") {
    return "Web notifications are enabled by site settings"
  } else if (permission == "denied") {
    return "Web notifications are not allowed by site settings"
  } else {
    return "Enable web notification"
  }
}

export const SettingsPage = () => {
  const notificationPermissionState = Notification.permission;
  const { config, changeConfig, restore } = useConfig();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(notificationPermissionState === "granted");

  const notificationButtonRef = useRef(null);

  const handleNotificationEnable = async () => {
    requestPermission(() => {
      if (Notification.permission === "granted") {
        setIsNotificationEnabled(true);
      }
    });
  };

  return (
    <section>
          <label htmlFor={"pomodoro"}>Duration of pomodoro
            <input
              id={"pomodoro"}
              type="number"
              name="pomodoro"
              step={0.1}
              min={0}
              max={60}
              value={config.pomodoro}
              onChange={e => changeConfig({ ...config, pomodoro: e.target.value })}
            />
          </label>

          <label htmlFor="pause">Duration of pause
            <input
              id="pause"
              type="number"
              name="pause"
              step={0.1}
              min={0}
              max={60}
              value={config.pause}
              onChange={e => changeConfig({ ...config, pause: e.target.value })}
            />
          </label>

          <label htmlFor="theme">
            Duration of theme
            <select
              id="theme"
              name="theme"
              value={config.theme}
              onChange={e => changeConfig({...config, theme: e.target.value })}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>

        <fieldset>
          <legend>Notifications </legend>
          <label>
            <input
              type="checkbox"
              role="switch"
              ref={notificationButtonRef}
              checked={isNotificationEnabled}
              onChange={() => handleNotificationEnable()}
              disabled={isNotificationEnabled}
            />
              {getNotificationToggleLabel(notificationPermissionState)}
          </label>
        </fieldset>
        <fieldset>
          <button type="button" className="outline" onClick={restore}>
            {" "}
            Restore default{" "}
          </button>
        </fieldset>
    </section>
  );
};
