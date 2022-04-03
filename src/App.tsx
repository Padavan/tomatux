import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppRouter } from './routes';
import { store } from './store'; 

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
       <AppRouter />
     </BrowserRouter>
   </Provider>
);

export default App;
