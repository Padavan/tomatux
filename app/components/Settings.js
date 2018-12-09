import React from 'react';
import { connect } from 'react-redux';

import { changeSettings, restoreSettings } from '../actions';
import { saveState } from '../localStorage';

const hoomanNames = {
  pomodoroDuration: 'Duration of pomodoro',
  pauseDuration: 'Duration of pause',
  longPauseDuration: 'Duration of long pause',
  loopCount: 'Number of pomodoro loops before long pause'
};

const Settings = ({ settings, handleData, restoreSettings }) => (
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
      <button onClick={() => restoreSettings()}> Restore default </button>
    </div>
  </section>
);

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  handleData(option) {
    dispatch(changeSettings(option));
  },
  restoreSettings() {
    dispatch(restoreSettings());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
