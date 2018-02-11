/* @flow */

import React from 'react';
import { render } from 'react-dom';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import match from 'react-router/lib/match';

import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import 'babel-polyfill';

import Raven from 'raven-js';
import Geolocation from './HOC/Geolocation';

import routes from './routes';
import store from './store/store';

import parseQuery from './lib/parse-query';
import { createHistoryListener } from './lib/analitics';

import { DOMAIN_URL } from './config';

const ravenDNS = process.env.SENTRY_DNS_CLIENT;
const mode = process.env.NODE_ENV;

if (mode === 'production' && ravenDNS) {
  Raven
    .config(ravenDNS)
    .install();
}

// Get the DOM Element that will host our React application.
const urlWithoutProtocol = DOMAIN_URL.split('://')[1];

function renderApp() {
  const container = document.querySelector('#app');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  const history = syncHistoryWithStore(browserHistory, store);
  const renderRoutes = routes(store);

  const routerParams = {
    routes: renderRoutes,
    history,
  };

  if (location.pathname === '/search') {
    const siteUrl = parseQuery(location.search).q
      .split(':')
      .filter(item => item.includes(urlWithoutProtocol))[0]
      .replace('+', '');

    let path = siteUrl.replace(`//${urlWithoutProtocol}`, '/');
    if (path.includes('&')) {
      const index = path.indexOf('&');
      path = path.slice(0, index);
    }

    routerParams.location = path;
  } else {
    routerParams.location = location.pathname;
  }

  createHistoryListener(history);

  // убираем хэш оставленный от входа через oauth
  if (location.hash) {
    history.push(location.pathname);
  }

  match(routerParams, (err, redirect, renderProps) => {
    render(
      <Provider store={store}>
        <Geolocation>
          <Router history={history} {...renderProps} />
        </Geolocation>
      </Provider>, container);
  });
}

// The following is needed so that we can hot reload our App.
if (process.env.NODE_ENV === 'development' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js');
  // Any changes to our routes will cause a hotload re-render.
  module.hot.accept('./routes', renderApp);
  // Any changes to reducers will cause to re-render
  module.hot.accept('./reducers', renderApp);
}

renderApp();
