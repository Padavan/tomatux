import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import { loadState } from '../localStorage';

const initialSettingsState = loadState();
const initialTimerState = {
  time: initialSettingsState * 60 ? initialSettingsState.settings.pomodoro : 25 * 60,
  running: false,
  settings: {
    
  }
};

const initialState = { ...initialSettingsState, timer: initialTimerState };

export const configureStore = () => {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
