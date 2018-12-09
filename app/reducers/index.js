import { combineReducers } from 'redux';

import timer from './timerReducer';
import settings from './settingsReducer';

const rootReducer = combineReducers({
  // short hand property names
  timer,
  settings
});

export default rootReducer;
