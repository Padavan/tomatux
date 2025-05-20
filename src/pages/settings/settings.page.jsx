import React, { useRef, useState } from 'react';
import { requestPermission, isNotificationAllowed } from '../../helpers/notification';
import { useConfig } from '../../providers/config.provider';
import { useToast } from '../../providers/toast.provider';

/** @typedef {import('../../types').PomodoroSettings} PomodoroSettings */

export const SettingsPage = () => {
  const { config, changeConfig, restore } = useConfig();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(isNotificationAllowed());
  const toast = useToast();

  const notificationButtonRef = useRef(null);

  /** @param {React.FormEvent<HTMLFormElement>} event */
  const save = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // console.log("event", formData.getAll());

    /** @type {PomodoroSettings} */ 
    var newConfig = {
      pomodoro: (/** @type {number} */(formData.get('pomodoro') ?? 25)),
      pause: (/** @type {number} */(formData.get('pause') ?? 5)),
      theme: (/** @type {'system' | 'dark' | 'light'} */(formData.get('theme') ?? 'system')),
    };

    changeConfig(newConfig);

    toast.show('Settings saved');
  }

  const handleNotificationEnable = async () => {
    requestPermission(() => {
      if (Notification.permission === "granted") {
        setIsNotificationEnabled(true);
      }
    })
  }

  const showWebNotificationToggle = Notification.permission !== "denied";

  return (
    <section>
      <form id="config" onSubmit={save}>
      <div className='option'>
        <label htmlFor={'pomodoro'}>
          Duration of pomodoro
        </label>
        <input
          id={'pomodoro'}
          type='number'
          name="pomodoro"
          step={0.1}
          min={0}
          max={60}
          defaultValue={config.pomodoro}
        />
      </div>
  
      <div className='option'>
        <label htmlFor='pause'>
          Duration of pause
        </label>
        <input
          id="pause"
          type='number'
          name="pause"
          step={0.1}
          min={0}
          max={60}
          defaultValue={config.pause}
        />
      </div>

      <div className='option'>
        <label htmlFor='theme'>
          Duration of theme
        </label>
        <select
          id="theme"
          name="theme"
          form="config"
          defaultValue={config.theme}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {showWebNotificationToggle && (
        <div className='option'>
          <label>Web Notification</label>
            <input
              type="checkbox"
              ref={notificationButtonRef}
              checked={isNotificationEnabled}
              onChange={() => handleNotificationEnable()}
              disabled={isNotificationEnabled}
            />
        </div>
      )}
        <p>Save settings for next session or restore default settings.</p>
        <div className='buttons'>
          <button type="button" onClick={restore}> Restore default </button>
          <button type="submit" className='primary'> Save </button>
        </div>
      </form>
    </section>
  );
}
