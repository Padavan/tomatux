let timer = null;

export const start = () => (dispatch) => {
  console.log('start');
  clearInterval(timer);
  timer = setInterval(() => dispatch(tick()), 1000);
  dispatch({ type: 'TIMER_START' });
  dispatch(tick());
};

export const tick = () => { type: 'TIMER_TICK' };

function tickAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(tick());
    }, 1000);
  };
}

export const stop = () => {
  console.log('stop');
  clearInterval(timer);
  return { type: 'TIMER_STOP' };
};

export const saveSettings = (state) => {
  console.log('saveing settings', state);
};

export const changeSettings = (option) => ({
  type: 'SETTINGS_CHANGE',
  option
});

export const restoreSettings = () => ({
  type: 'SETTINGS_RESTORE'
})
