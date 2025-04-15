import React, { useRef }  from 'react';
import { requestPermission, sendNotification } from '../helpers/notification';
import { useConfig } from 'src/providers/config.provider';
import { useToast } from 'src/providers/toast.provider';

/** @typedef {import('../types').PomodoroSettings} PomodoroSettings */

// import { RootState } from '../store';
// import { ISettings } from '../reducers/settingsReducer';

// const hoomanNames: Record<string, string> = {
//   pomodoro: 'Duration of pomodoro',
//   pause: 'Duration of pause',
//   long_pause: 'Duration of long pause',
//   loop: 'Number of pomodoro loops before long pause'
// };

export const Settings = () => {
  const { config, changeConfig, restore } = useConfig();
  const toast = useToast();

  const notificationButtonRef = useRef(null);

  const save = (event) => {
    event.preventDefault();
    console.log("event", event);
    // const status = saveState({ settings });
    // if (status) {
    //   showThenHideSnackbar('Settings saved', dispatch);
    // } else {
    //   showThenHideSnackbar('localStorage is unavailable', dispatch);
    // }
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
          defaultValue={config.pause}
        />
      </div>

      <div className='option'>
        <label>Web Notification</label>
          <button type="button" ref={notificationButtonRef} onClick={() => handleNotificationEnable()} disabled={notificationCheckboxState()}> Enable </button>
      </div>
      {/*<button onClick={() => sendNotification('Test notification')}> Test </button>*/}

        <p>Save settings for next session or restore default settings.</p>
        <div className='buttons'>
          <button type="button" onClick={restore}> Restore default </button>
          <button type="submit" className='primary'> Save </button>
        </div>
      </form>
    </section>
  );
}
