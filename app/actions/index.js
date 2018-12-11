
let timerLoop = null;

const updateLogic = (current, loop) => ({
  type: 'LOGIC_UPDATE',
  current,
  loop
});

const setTimer = time => ({
  type: 'TIMER_SET',
  time
});

const stop = () => {
  clearInterval(timerLoop);
  return { type: 'TIMER_STOP' };
};

const prepareTimerAction = () => (dispatch, getState) => {
  const { logic, settings } = getState();
  dispatch(setTimer(settings[logic.current]));
};

const loopEnd = () => (dispatch, getState) => {
  dispatch(stop());
  const { logic, settings } = getState();
  switch (logic.current) {
    case 'pomodoro':
      if (logic.loop === settings.loop - 1) {
        dispatch(updateLogic('long', 0));
      } else {
        dispatch(updateLogic('pause', logic.loop + 1));
      }
      break;
    case 'pause':
      dispatch(updateLogic('pomodoro', logic.loop));
      break;
    case 'long':
      dispatch(updateLogic('pomodoro', logic.loop));
      break;
    default:
      break;
  }
  dispatch(prepareTimerAction());
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

const start = () => (dispatch) => {
  clearInterval(timerLoop);
  timerLoop = setInterval(() => dispatch(checkTick()), 1000);
  dispatch({ type: 'TIMER_START' });
  dispatch(checkTick());
};

const changeSettings = option => ({
  type: 'SETTINGS_CHANGE',
  option
});

export const updateSettingsAction = option => (dispatch, getState) => {
  const { timer } = getState();
  if (!timer.running) {
    dispatch(prepareTimerAction());
  }
  dispatch(changeSettings(option));
};

export const restoreSettings = () => ({
  type: 'SETTINGS_RESTORE'
});

export const startLoopAction = () => (dispatch) => {
  dispatch(start());
  return ({
    type: 'START_LOOP'
  });
};

export const stopLoopAction = () => (dispatch, getState) => {
  dispatch(stop());
  const { pomodoro } = getState().settings;
  dispatch(setTimer(pomodoro));
  return ({
    type: 'STOP_LOOP'
  });
};

export const skipPauseAction = () => (dispatch) => {
  dispatch(loopEnd());
  dispatch(start());
  return ({
    type: 'START_LOOP'
  });
};

export const dontCountAction = () => (dispatch, getState) => {
  const { logic } = getState();
  dispatch(updateLogic('pomodoro', logic.loop - 1));
  dispatch(prepareTimerAction());
};
