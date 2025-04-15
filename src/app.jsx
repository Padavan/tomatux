import * as React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import { ConfigProvider } from './providers/config.provider';
import { ToastProvider } from './providers/toast.provider';
import { TimerProvider } from './providers/timer.provider';
import { Timer } from './components/timer.component';
import { Settings } from './components/settings.component';
import { Statistics } from './components/statistics.component';
import { Nav } from './components/nav.component';



const App = () => (
    <HashRouter>
      <ToastProvider>
        <ConfigProvider>
          <TimerProvider>
              <Nav />
              <Switch>
                <Route exact path="/">
                  <Timer /> 
                </Route>
                <Route path="/settings">
                  <Settings />
                </Route>
                <Route path="/statistics">
                  <Statistics />
                </Route>
              </Switch>
          </TimerProvider>
        </ConfigProvider>
      </ToastProvider>
    </HashRouter>
);

export default App;