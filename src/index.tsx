import * as React from 'react';
import { render } from 'react-dom';

import App from './App';
// import * as serviceWorker from './serviceWorker';
import './style.css';

// function renderApp(component) {
//   const Application: React.FC<any> = component;
//   render(
//     <Application />,
//     document.body.appendChild(document.createElement('div')),
//   );
// }

// serviceWorker.register();

// const registerSW = () => {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/service-worker.js')
//     .then((registration) => {
//       registration.addEventListener('updatefound', () => {
//         // If updatefound is fired, it means that there's
//         // a new service worker being installed.
//         const installingWorker = registration.installing;
//         console.log('A new service worker is being installed:', installingWorker); // tslint:disable-line

//         // You can listen for changes to the installing service worker's
//         // state via installingWorker.onstatechange
//       });
//     })
//     .catch((error) => {
//       console.log('Service worker registration failed:', error); // tslint:disable-line
//     });
//   } else {
//     console.log('Service workers are not supported.'); // tslint:disable-line
//   }
// };

// registerSW();
// renderApp(App);
render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  );

