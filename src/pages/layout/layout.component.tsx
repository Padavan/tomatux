import React from "react";

import { Switch, Route } from "../../features/router";

import { useConfig } from "../../providers/config.provider";
import "./layout.styles.css";

import { TimerPage } from "../../pages/timer";
import { SettingsPage } from "../../pages/settings";
import { StatisticPage } from "../../pages/statistic";
import { Nav } from "../../features/nav";

export function Layout() {
  const { config } = useConfig();

  return (
    <div className={`Layout Layout_${config.theme}`}>
      <Nav />
      <main>
        <Switch>
          <Route path="/" component={TimerPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route path="/statistics" component={StatisticPage} />
        </Switch>
      </main>
    </div>
  );
}
