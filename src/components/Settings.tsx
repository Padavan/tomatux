import React, { useRef }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveState } from '../localStorage';
import { requestPermission, sendNotification, showThenHideSnackbar } from '../helpers/notification';
import { RootState } from '../store';
import { ISettings } from '../reducers/settingsReducer';

// const hoomanNames: Record<string, string> = {
//   pomodoro: 'Duration of pomodoro',
//   pause: 'Duration of pause',
//   long_pause: 'Duration of long pause',
//   loop: 'Number of pomodoro loops before long pause'
// };

export const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);

  const notificationButtonRef = useRef<HTMLButtonElement>(null);

  const save = (settings: ISettings) => {
    const status = saveState({ settings });
    if (status) {
      showThenHideSnackbar('Settings saved', dispatch);
    } else {
      showThenHideSnackbar('localStorage is unavailable', dispatch);
    }
  }

  const notificationCheckboxState = ():boolean => Notification.permission === 'granted';

  const handleNotificationEnable = () => {
    if (notificationCheckboxState() && notificationButtonRef.current) {
      notificationButtonRef.current.disabled = true
    } else {
      requestPermission()
    }
  }

  return (
    <section>
    
      <div className='option'>
        <label htmlFor={'pomodoro'}>
          Duration of pomodoro
        </label>
        <input
          id={'pomodoro'}
          type='number'
          value={settings.pomodoro}
          onChange={e => dispatch({ type: 'SETTINGS_CHANGE', option: { pomodoro: Number(e.target.value) }})} />
      </div>
  
      <div className='option'>
        <label htmlFor='pause'>
          Duration of pause
        </label>
        <input
          type='number'
          value={settings.pause}
          onChange={e => dispatch({ type: 'SETTINGS_CHANGE', option: { pause: Number(e.target.value) }})} />
      </div>

      <div className='option'>
        <label>Web Notification</label>
          <button ref={notificationButtonRef} onClick={() => handleNotificationEnable()} disabled={notificationCheckboxState()}> Enable </button>
      </div>
      {/*<button onClick={() => sendNotification('Test notification')}> Test </button>*/}

      <section>
        <p>Save settings for next session or restore default settings.</p>
        <div className='buttons'>
          <button onClick={() => dispatch({ type: 'SETTINGS_RESTORE' })}> Restore default </button>
          <button className='primary' onClick={() => save(settings)}> Save </button>
        </div>
      </section>
    </section>
  );
}
