import { combineReducers } from 'redux';

import timer from './timerReducer';
import settings from './settingsReducer';
import statistic from './statsReducer';
import ui from './uiReducer';

export const rootReducer = combineReducers({
  timer,
  settings,
  statistic,
  ui
});

