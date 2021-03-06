import { sendNotification } from '../notification';

let timerLoop = null;

const hideNotification = () => ({
  type: 'NOTIFICATION_HIDE',
});

const showNotification = message => ({
  type: 'NOTIFICATION_SHOW',
  message,
});

export const changeTabAction = tab => ({
  type: 'TAB_CHANGE',
  tab,
});

export const showNotificationAction = message => (dispatch) => {
  dispatch(showNotification(message));
  setTimeout(() => dispatch(hideNotification()), 1000);
};

const updateLogic = (current, loop) => ({
  type: 'LOGIC_UPDATE',
  current,
  loop,
});

const setTimer = time => ({
  type: 'TIMER_SET',
  time,
});

const stop = () => {
  clearInterval(timerLoop);
  return { type: 'TIMER_STOP' };
};

const prepareTimerAction = () => (dispatch, getState) => {
  const { logic, settings } = getState();
  dispatch(setTimer(settings[logic.current] * 60));
};

const loopEnd = () => (dispatch, getState) => {
  dispatch(stop());
  const { logic, settings } = getState();
  let message = '';
  switch (logic.current) {
    case 'pomodoro':
      if (logic.loop === settings.loop - 1) {
        dispatch(updateLogic('long', 0));
      } else {
        dispatch(updateLogic('pause', logic.loop + 1));
      }
      message = 'Pomodoro ended';
      break;
    case 'pause':
      dispatch(updateLogic('pomodoro', logic.loop));
      message = 'Pause ended';
      break;
    case 'long':
      dispatch(updateLogic('pomodoro', logic.loop));
      message = 'Pause ended';
      break;
    default:
      break;
  }
  dispatch(prepareTimerAction());
  sendNotification(message);
  dispatch(showNotificationAction(message));
};

const tick = () => ({ type: 'TIMER_TICK' });

const checkTick = () => (dispatch, getState) => {
  const { timer } = getState();
  if (timer.time === 0) {
    dispatch(loopEnd());
  } else {
    dispatch(tick());
  }
};

export const startLoopAction = () => (dispatch) => {
  clearInterval(timerLoop);
  timerLoop = setInterval(() => dispatch(checkTick()), 1000);
  dispatch({ type: 'TIMER_START' });
  dispatch(checkTick());
};

const changeSettings = option => ({
  type: 'SETTINGS_CHANGE',
  option,
});

export const updateSettingsAction = option => (dispatch, getState) => {
  dispatch(changeSettings(option));
  const { timer } = getState();
  if (!timer.running) {
    dispatch(prepareTimerAction());
  }
};

export const restoreSettings = () => ({
  type: 'SETTINGS_RESTORE',
});

export const stopLoopAction = () => (dispatch) => {
  dispatch(stop());
  dispatch(prepareTimerAction());
};

export const skipPauseAction = () => (dispatch) => {
  dispatch(loopEnd());
  dispatch(startLoopAction());
};

export const dontCountAction = () => (dispatch, getState) => {
  const { logic } = getState();
  dispatch(updateLogic('pomodoro', logic.loop - 1));
  dispatch(prepareTimerAction());
};
