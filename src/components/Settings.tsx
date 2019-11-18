import * as React from 'react';
import { connect } from 'react-redux';

import { updateSettingsAction, restoreSettings, showNotificationAction } from '../actions';
import { saveState } from '../localStorage';
import { requestPermission, sendNotification } from '../notification';

const hoomanNames = {
  pomodoro: 'Duration of pomodoro',
  pause: 'Duration of pause',
  long: 'Duration of long pause',
  loop: 'Number of pomodoro loops before long pause'
};

type Props = {
  settings: any;
  handleData: (data: any) => void;
  restoreDefault: () => void;
  showNotification: (text: string) => void;
}

class Settings extends React.Component<Props> {
  public render() {
    return (
      <section>
        {Object.keys(this.props.settings).map(option => (
          <label key={option} htmlFor={option}>
            {hoomanNames[option]}
            <input type='number' value={this.props.settings[option]} onChange={e => this.props.handleData({ [option]: e.target.value })} />
          </label>
        ))}

        <p>Web Notification</p>
        <button onClick={() => requestPermission()}> Enable </button>
        <button onClick={() => sendNotification('Test notification')}> Test </button>
        <div>
          <button onClick={() => this.save(this.props.settings)}> Save </button>
          <button onClick={() => this.props.restoreDefault()}> Restore default </button>
        </div>
      </section>
    );
  }

  private save(settings) {
    const status = saveState({ settings });
    // console.log('shit');
    if (status) {
      this.props.showNotification('Settings saved');
    } else {
      this.props.showNotification('localStorage is unavailable');
    }
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
