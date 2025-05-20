import React from 'react';

import { Switch, Route } from "react-router-dom";

import { useConfig } from '../../providers/config.provider';
import "./layout.styles.css";


import { ToastProvider } from '../../providers/toast.provider';
import { TimerProvider } from '../../providers/timer.provider';
import { TimerPage } from '../../pages/timer';
import { SettingsPage } from '../../pages/settings';
import { StatisticPage } from '../../pages/statistic';
import { Nav } from '../../features/nav';

export function Layout() {
  const { config } = useConfig();

  return (
    <div className={`Layout Layout_${config.theme}`}>
      <ToastProvider>
        <TimerProvider>
          <>
          <Nav />
            <main>
              <Switch>
                <Route exact path="/">
                  <TimerPage /> 
                </Route>
                <Route path="/settings">
                  <SettingsPage />
                </Route>
                <Route path="/statistics">
                  <StatisticPage />
                </Route>
              </Switch>
            </main>
            </>
        </TimerProvider>
      </ToastProvider>
    </div>
  );
} 
