import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from '../reducers/rootReducer';
import { loadState } from '../localStorage';
import { ITimer } from 'src/reducers/timerReducer';

const initialSettingsState = loadState();

const initialTimerState: ITimer = initialSettingsState ? {
  time: initialSettingsState.settings.pomodoro*60,
  running: false,
  stage: 'pomodoro',
  completedPomodoros: 0,
  settings: {
    ...initialSettingsState.settings,
  }
} : { time: 25*60, running: false, stage: 'pomodoro', completedPomodoros: 0, settings: {pomodoro: 25, pause: 5}};

const initialState = { ...initialSettingsState, timer: initialTimerState };

export const configureStore = () => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  return store;
}
