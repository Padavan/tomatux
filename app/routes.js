import React from 'react';
import { connect } from 'react-redux';

import Timer from './components/Timer';
import Settings from './components/Settings';
import Statistics from './components/Statistics';
import About from './components/About';
import Snackbar from './components/Snackbar';

import { changeTabAction } from './actions';

const routes = [
  {
    path: '/default',
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

const AppRouter = (props) => (
  <div>
    <header>
      <h2> Current: {props.ui.tab} </h2>
      <nav>
      {routes.map(route => (
        <button
          key={`header_${route.name}`}
          onClick={() => props.changeTab(route.name)}
          className={props.ui.tab === route.name ? 'active' : ''}
        >
          {route.name}
        </button>
      ))}
      </nav>
    </header>
    <main>
      {(props.ui.tab === 'Timer') && <Timer />}
      {(props.ui.tab === 'Settings') && <Settings />}
      {(props.ui.tab === 'Statistics') && <Statistics />}
      {(props.ui.tab === 'About') && <About />}
    </main>
    <Snackbar />
  </div>
);

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = dispatch => ({
  changeTab(tab) {
    dispatch(changeTabAction(tab));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
