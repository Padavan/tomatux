import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppRouter } from './routes';
import { store } from './store'; 

const App = () => (
  <Provider store={store}>
    <Router>
       <AppRouter />
     </Router>
   </Provider>
);

export default App;
