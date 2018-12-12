import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import DevTools from '../components/DevTools';
import { loadState } from '../localStorage';

const initialSettingsState = loadState();
const initialTimerState = {
  time: initialSettingsState * 60 ? initialSettingsState.settings.pomodoro : 25 * 60,
  running: false,
};

const initialState = { ...initialSettingsState, timer: initialTimerState };

const enhancer = compose(
  applyMiddleware(thunk),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore() {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers').default));
  }

  return store;
}
