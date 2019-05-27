import React from 'react';
import { render } from 'react-dom';

import App from './App';
// import * as serviceWorker from './serviceWorker';
import style from './style.css';

function renderApp(component) {
  const Application = component;
  render(
    <Application />,
    document.body.appendChild(document.createElement('div'))
  );
}

// serviceWorker.register();

const registerSW = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      registration.addEventListener('updatefound', function() {
        // If updatefound is fired, it means that there's
        // a new service worker being installed.
        var installingWorker = registration.installing;
        console.log('A new service worker is being installed:',
          installingWorker);

        // You can listen for changes to the installing service worker's
        // state via installingWorker.onstatechange
      });
    })
    .catch(function(error) {
      console.log('Service worker registration failed:', error);
    });
  } else {
    console.log('Service workers are not supported.');
  }
}

registerSW();
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
