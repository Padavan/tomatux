import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import { loadState } from '../localStorage';

const initialSettingsState = loadState();
const initialTimerState = {
  time: initialSettingsState * 60 ? initialSettingsState.settings.pomodoro : 25 * 60,
  running: false,
};

const initialState = { ...initialSettingsState, timer: initialTimerState };

export default function configureStore() {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  return store;
}
