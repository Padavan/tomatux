import React from 'react';
import {
  Route,
  Switch,
  NavLink
} from 'react-router-dom';

import DevTools from './components/DevTools';
import Timer from './components/Timer';
import Settings from './components/Settings';
import Statistics from './components/Statistics';
import About from './components/About';

const routes = [
  {
    path: '/',
    name: 'Timer',
    exact: true,
    component: () => <Timer />
  },
  {
    path: '/settings',
    name: 'Settings',
    exact: false,
    component: () => <Settings />
  },
  {
    path: '/stats',
    name: 'Statistics',
    exact: false,
    component: () => <Statistics />
  },
  {
    path: '/about',
    name: 'About',
    exact: false,
    component: () => <About />
  }
];

const AppRouter = () => (
  <div>
    <header>
      {routes.map(route => (
        <Route
          key={`header_${route.name}`}
          path={route.path}
          exact={route.exact}
          component={() => (
            <h6>
              {route.name}
            </h6>
          )}
        />
      ))}
    </header>
    <nav>
      {routes.map(route => (
        <NavLink to={route.path} activeClassName='active' exact={route.exact} key={`link_${route.name}`}>
          {route.name}
        </NavLink>
      ))}
    </nav>
    <main>
      <Switch>
        {routes.map(route => (
          <Route key={`route_${route.name}`} path={route.path} exact={route.exact} component={route.component} />
        ))}
      </Switch>
    </main>
    <DevTools />
  </div>
);

export default AppRouter;
