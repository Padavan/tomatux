import * as React from 'react';
import { HashRouter, Switch, Route, useLocation } from "react-router-dom";
import { ConfigProvider } from './providers/config.provider';
import { ToastProvider } from './providers/toast.provider';
import { TimerProvider } from './providers/timer.provider';
import { Timer } from './components/timer.component';
import { Settings } from './components/settings.component';
import { Statistics } from './components/statistics.component';
import { Nav } from './components/nav.component';
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";


const Main = () => {
  let location = useLocation();
  return (
    <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            classNames="left-to-right"
            timeout={300}
          >
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
          </CSSTransition>
        </TransitionGroup>
  );
}


const App = () => {

  return (
    <HashRouter>
      <ToastProvider>
        <ConfigProvider>
          <TimerProvider>
              <Nav />
              <Main />
          </TimerProvider>
        </ConfigProvider>
      </ToastProvider>
    </HashRouter>
);
}

export default App;