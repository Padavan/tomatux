import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import { loadState } from '../localStorage';

const initialSettingsState = loadState() || {};

const initialTimerState = {
  time: initialSettingsState ? initialSettingsState.settings.pomodoro*60 : 25 * 60,
  running: false,
  settings: {
    ...initialSettingsState.settings,
  }
};

const initialState = { ...initialSettingsState, timer: initialTimerState };

export const configureStore = () => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  return store;
}
