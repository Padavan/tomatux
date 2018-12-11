import React from 'react';
import { connect } from 'react-redux';

import { updateSettingsAction, restoreSettings } from '../actions';
import { saveState } from '../localStorage';

const hoomanNames = {
  pomodoro: 'Duration of pomodoro',
  pause: 'Duration of pause',
  long: 'Duration of long pause',
  loop: 'Number of pomodoro loops before long pause'
};

const Settings = ({ settings, handleData, restoreDefault }) => (
  <section>
    {Object.keys(settings).map(option => (
      <label key={option} htmlFor={option}>
        {hoomanNames[option]}
        <input type='number' value={settings[option]} onChange={e => handleData({ [option]: e.target.value })} />
      </label>
    ))}

    <p>Web Notification</p>
    <b> Enable / Disable </b>
    <div>
      <button onClick={() => saveState({ settings })}> Save </button>
      <button onClick={() => restoreDefault()}> Restore default </button>
    </div>
  </section>
);

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  handleData(option) {
    dispatch(updateSettingsAction(option));
  },
  restoreDefault() {
    dispatch(restoreSettings());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
