import React from 'react';
import { render } from 'react-dom';

import App from './App';

function renderApp(component) {
  const Application = component;
  render(
    <Application />,
    document.body.appendChild(document.createElement('div'))
  );
}

renderApp(App);

if (module.hot) {
  module.hot.accept(['./App'], () => {
    const script = [];
    while (document.body.firstChild) {
      const s = document.body.removeChild(document.body.firstChild);
      if (s.type === 'text/javascript') script.push(s);
    }
    script.map(s => document.body.appendChild(s));
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    renderApp(NextApp);
  });
}
