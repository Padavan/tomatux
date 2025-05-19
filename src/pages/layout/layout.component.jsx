import React from 'react';

import { Switch, Route } from "react-router-dom";

import { useConfig } from 'src/providers/config.provider';
import "./layout.styles.css";


import { ToastProvider } from 'src/providers/toast.provider';
import { TimerProvider } from 'src/providers/timer.provider';
import { TimerPage } from 'src/pages/timer';
import { SettingsPage } from 'src/pages/settings';
import { StatisticPage } from 'src/pages/statistic';
import { Nav } from 'src/features/nav';

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
