import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import DevTools from './components/DevTools';

import Timer from './components/Timer';

// import { createStore } from 'redux';
const store = configureStore();

// import rootReducer from './reducers/rootReducer';


// const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <div>
      <Timer />
      <DevTools />
    </div>
  </Provider>
);

render(<App />, document.getElementById('app'));
