import { combineReducers } from 'redux';

import timer from './timerReducer';
import settings from './settingsReducer';
import logic from './logicReducer';
import statistic from './statsReducer';
import ui from './uiReducer';

const rootReducer = combineReducers({
  timer,
  settings,
  logic,
  statistic,
  ui
});

export default rootReducer;
