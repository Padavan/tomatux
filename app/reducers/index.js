import { combineReducers } from 'redux';

import timer from './timerReducer';

const rootReducer = combineReducers({
  // short hand property names
  timer
});

export default rootReducer;
