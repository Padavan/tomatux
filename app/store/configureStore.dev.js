import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import { loadState } from '../localStorage';

const initialSettingsState = loadState();
const initialTimerState = {
  time: initialSettingsState * 60 ? initialSettingsState.settings.pomodoro : 25 * 60,
  running: false,
};

const initialState = { ...initialSettingsState, timer: initialTimerState };

const enhancer = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

export default function configureStore() {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers').default));
  }

  return store;
}
