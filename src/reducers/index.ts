import { combineReducers } from 'redux';

import timer from './timerReducer';
import settings from './settingsReducer';
import statistic from './statsReducer';
import ui from './uiReducer';

const rootReducer = combineReducers({
  timer,
  settings,
  statistic,
  ui
});

export default rootReducer;
