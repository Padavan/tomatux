import React from 'react';
import { connect } from 'react-redux';

import { updateSettingsAction, restoreSettings, showNotificationAction } from '../actions';
import { saveState } from '../localStorage';

const hoomanNames = {
  pomodoro: 'Duration of pomodoro',
  pause: 'Duration of pause',
  long: 'Duration of long pause',
  loop: 'Number of pomodoro loops before long pause'
};

class Settings extends React.Component {
  save(settings) {
    const status = saveState({ settings });
    // console.log('shit');
    if (status) {
      this.props.showNotification('Settings saved');
    } else {
      this.props.showNotification('localStorage is unavailable');
    }
  }

  render() {
    return (
      <section>
        {Object.keys(this.props.settings).map(option => (
          <label key={option} htmlFor={option}>
            {hoomanNames[option]}
            <input type='number' value={this.props.settings[option]} onChange={e => this.handleData({ [option]: e.target.value })} />
          </label>
        ))}

        <p>Web Notification</p>
        <b> Enable / Disable </b>
        <div>
          <button onClick={() => this.save(this.props.settings)}> Save </button>
          <button onClick={() => this.restoreDefault()}> Restore default </button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  handleData(option) {
    dispatch(updateSettingsAction(option));
  },
  restoreDefault() {
    dispatch(restoreSettings());
  },
  showNotification(payload) {
    dispatch(showNotificationAction(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
