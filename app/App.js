import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import AppRouter from './routes';
import './style.less';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router>
      <AppRouter />
    </Router>
  </Provider>
);

export default App;
