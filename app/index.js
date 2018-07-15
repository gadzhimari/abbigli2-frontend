/* @flow */

import React from 'react';
import { render } from 'react-dom';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import match from 'react-router/lib/match';

import { Provider } from 'react-redux';
import 'babel-polyfill';

import './lib/raven';

import Geolocation from './HOC/Geolocation';

import getRoutes from './routes';
import store from './store/store';

import parseQuery from './lib/parse-query';
import { googleSetPage } from './lib/analitics';
import { syncLocationWithStore } from './ducks/Location';

import { DOMAIN_URL } from './config';

const urlWithoutProtocol = DOMAIN_URL.split('://')[1];

function renderApp() {
  const container = document.querySelector('#app');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  const routes = getRoutes(store);

  const routerParams = {
    routes,
    history: browserHistory
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

  // Слушатели изменений браузерной истории
  browserHistory.listen(googleSetPage);
  browserHistory.listen(syncLocationWithStore);

  // убираем хэш оставленный от входа через oauth
  if (/#.*$/.test(location.href)) {
    history.push(location.pathname);
  }

  match(routerParams, (err, redirect, renderProps) => {
    render(
      <Provider store={store}>
        <Geolocation>
          <Router history={browserHistory} {...renderProps} />
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
