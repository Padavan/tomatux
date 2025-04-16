import React, { useRef }  from 'react';
import { requestPermission, sendNotification } from '../helpers/notification';
import { useConfig } from 'src/providers/config.provider';
import { useToast } from 'src/providers/toast.provider';

/** @typedef {import('../types').PomodoroSettings} PomodoroSettings */

export const Settings = () => {
  const { config, changeConfig, restore } = useConfig();
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
    };

    changeConfig(newConfig);

    toast.show('Settings saved');
  }

  const notificationCheckboxState = () => Notification.permission === 'granted';

  const handleNotificationEnable = () => {
    if (notificationCheckboxState() && notificationButtonRef.current) {
      notificationButtonRef.current.disabled = true
    } else {
      requestPermission()
    }
  }

  return (
    <section>
      <form onSubmit={save}>
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
        <label>Web Notification</label>
          <button type="button" ref={notificationButtonRef} onClick={() => handleNotificationEnable()} disabled={notificationCheckboxState()}> Enable </button>
      </div>
      <button type="button" onClick={() => sendNotification('Test notification')}> Test </button>

        <p>Save settings for next session or restore default settings.</p>
        <div className='buttons'>
          <button type="button" onClick={restore}> Restore default </button>
          <button type="submit" className='primary'> Save </button>
        </div>
      </form>
    </section>
  );
}
