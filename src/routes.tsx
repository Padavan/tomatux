import * as React from 'react';
import { connect } from 'react-redux';

import Timer from './components/Timer';
// import Settings from './components/Settings';
// import Statistics from './components/Statistics';
// import About from './components/About';
// import Snackbar from './components/Snackbar';

import { changeTabAction } from './actions';

interface IRoute {
  path: string;
  name: string;
  exact: boolean;
  component: any;
}

const routes: IRoute[] = [
  {
    path: '/default',
    name: 'Timer',
    exact: true,
    component: () => <Timer />,
  },
  {
    path: '/settings',
    name: 'Settings',
    exact: false,
    // component: () => <Settings />
    component: () => <div> Huy </div>
  },
  {
    path: '/stats',
    name: 'Statistics',
    exact: false,
    // component: () => <Statistics />
    component: () => <div> Huy </div>
  },
  {
    path: '/about',
    name: 'About',
    exact: false,
    // component: () => <About />
    component: () => <div> Huy </div>
  },
];

interface IProps {
  ui: any;
  changeTab: (tab: string) => void;
}

class AppRouter extends React.Component<IProps> {
  public render() {
    const currentTab = routes.find(route => route.name === this.props.ui.tab);
    if (!currentTab) {
      return null;
    }

    return (
      <div>
        <header>
          <h2>
            Current: {this.props.ui.tab}
          </h2>
          <nav>
          {routes.map(route => (
            <button
              key={`header_${route.name}`}
              onClick={() => this.props.changeTab(route.name)}
              className={this.props.ui.tab === route.name ? 'active' : ''}
            >
              {route.name}
            </button>
          ))}
          </nav>
        </header>
          <main>
          {(this.props.ui.tab === 'Timer') && <Timer />}
        {/*
          {(this.props.ui.tab === 'Settings') && <Settings />}
          {(this.props.ui.tab === 'Statistics') && <Statistics />}
          {(this.props.ui.tab === 'About') && <About />}
        */}

        </main>
      </div>
    );
  }
}
    //     // <Snackbar />

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = dispatch => ({
  changeTab: (tab) => dispatch(changeTabAction(tab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
