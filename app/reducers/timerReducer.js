import * as types from '../actions';
// import initialState from './initialState';

const initialState = {
  pomodoro: 1500,
  pause: 300,
};

export default (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
