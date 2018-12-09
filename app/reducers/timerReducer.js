import * as types from '../actions';
// import initialState from './initialState';

const initialState = {
  time: 10,
  running: false,
};

const timer = (state = initialState, action) => {
  switch (action.type) {
    case 'TIMER_START':
      return { ...state, running: true };
    case 'TIMER_TICK':
      return { ...state, time: state.time - 1 };
    case 'TIMER_STOP':
      return { ...state, running: false };
    default:
      return state;
  }
};

export default timer;
