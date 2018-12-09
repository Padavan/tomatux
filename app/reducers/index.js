import { combineReducers } from 'redux';

import timer from './timerReducer';
import settings from './settingsReducer';

const rootReducer = combineReducers({
  timer,
  settings
});

export default rootReducer;
