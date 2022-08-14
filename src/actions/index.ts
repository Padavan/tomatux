import { Dispatch } from 'redux';

export let intervalId: NodeJS.Timer;

export const startLoop = (dispatch: Dispatch) => {
  clearInterval(intervalId);
  dispatch({ type: 'TIMER_START' });
  intervalId = setInterval(() => dispatch({ type: 'TICK' }), 1000);
  dispatch({ type: 'TICK' });
};

export const resetLoop = (dispatch: Dispatch) => {
  clearInterval(intervalId);
  dispatch({ type: 'TIMER_RESET' });
};
