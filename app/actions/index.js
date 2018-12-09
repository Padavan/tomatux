let timer = null;

export const tick = () => ({ type: 'TIMER_TICK' });

export const start = () => (dispatch) => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(tick()), 1000);
  dispatch({ type: 'TIMER_START' });
  dispatch(tick());
};

export const stop = () => {
  clearInterval(timer);
  return { type: 'TIMER_STOP' };
};

export const changeSettings = option => ({
  type: 'SETTINGS_CHANGE',
  option
});

export const restoreSettings = () => ({
  type: 'SETTINGS_RESTORE'
});
