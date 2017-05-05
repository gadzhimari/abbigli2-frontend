/* @flow */

import React from 'react';
import { render } from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';
import match from 'react-router/lib/match';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import Raven from 'raven-js';

import routes from './routes';
import configureStore from './store';

import { DOMAIN_URL } from './config';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'babel-polyfill';

const ravenDNS = process.env.SENTRY_DNS_CLIENT;

Raven
  .config(ravenDNS)
  .install();

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');
const urlWithoutProtocol = DOMAIN_URL.split('://')[1];

function handleEnter(next, replace) {
  if (next.location.pathname === '/search' && next.location.query.q.includes(urlWithoutProtocol)) {
    const siteUrl = next.location.query.q
      .split(':')
      .filter(item => item.includes(urlWithoutProtocol))[0];

    const path = siteUrl.replace(`//${urlWithoutProtocol}`, '/');

    replace(path);
  }
}

function renderApp() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  const store = configureStore();
  const history = syncHistoryWithStore(browserHistory, store);

  render(
    <Provider store={store}>
      <Router history={history}>
        {routes}
        <Route path="*" onEnter={handleEnter} />
      </Router>
    </Provider>,
    container
  );
}

window.Mac = /Mac/.test(window.navigator.platform)
window.Windows = /Win/.test(window.navigator.platform)
window.Linux = /Linux/.test(window.navigator.platform)

// The following is needed so that we can hot reload our App.
if (process.env.NODE_ENV === 'development' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js');
  // Any changes to our routes will cause a hotload re-render.
  module.hot.accept('../shared/routes', renderApp);
  // Any changes to reducers will cause to re-render
  module.hot.accept('../shared/reducers', renderApp);
}

Event.prototype.persist = () => { }

renderApp();
