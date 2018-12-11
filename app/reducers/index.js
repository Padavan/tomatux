import { combineReducers } from 'redux';

import timer from './timerReducer';
import settings from './settingsReducer';
import logic from './logicReducer';
import statistic from './statsReducer';

const rootReducer = combineReducers({
  timer,
  settings,
  logic,
  statistic
});

export default rootReducer;
