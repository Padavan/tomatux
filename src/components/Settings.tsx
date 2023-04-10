import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveState } from '../localStorage';
import { requestPermission, sendNotification, showThenHideSnackbar } from '../helpers/notification';
import { RootState } from '../store';
import { ISettings } from '../reducers/settingsReducer';

const hoomanNames: Record<string, string> = {
  pomodoro: 'Duration of pomodoro',
  pause: 'Duration of pause',
  long_pause: 'Duration of long pause',
  loop: 'Number of pomodoro loops before long pause'
};

export const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);

  const save = (settings: ISettings) => {
    const status = saveState({ settings });
    if (status) {
      showThenHideSnackbar('Settings saved', dispatch);
    } else {
      showThenHideSnackbar('localStorage is unavailable', dispatch);
    }
  }

  return (
    <section>
      {Object.keys(settings).map(option => (
        <div key={option} className='settingsOption'>
          <label htmlFor={option}>
            {hoomanNames[option]}
          </label>
          <input
            type='number'
            value={settings[option]}
            onChange={e => dispatch({ type: 'SETTINGS_CHANGE', option: { [option]: e.target.value }})} />
        </div>
      ))}

      <div className='settingsOption'>
        <label>Web Notification</label>
        <div>
          <button onClick={() => requestPermission()}> Enable </button>
          <button onClick={() => sendNotification('Test notification')}> Test </button>
        </div>
      </div>
      <section>
        <p>You can save settings for next session or restore default settings.</p>
        <div style={{ display: 'flex', justifyContent: 'cetner', margin: '0 auto'}}>
          <button onClick={() => save(settings)}> Save </button>
          <button onClick={() => dispatch({ type: 'SETTINGS_RESTORE' })}> Restore default </button>
        </div>
      </section>
    </section>
  );
}
