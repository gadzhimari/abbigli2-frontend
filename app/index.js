/* @flow */

import React from 'react';
import { render } from 'react-dom';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import match from 'react-router/lib/match';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './store';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'babel-polyfill';

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');

function routerError(error) {
  // TODO: Error handling.
  console.error('==> 😭  React Router match failed.'); // eslint-disable-line no-console
  if (error) { console.error(error); } // eslint-disable-line no-console
}

function renderApp() {
  // render(appFactory(), container);
  //
  // As we are using dynamic react-router routes we have to use the following
  // asynchronous routing mechanism supported by the `match` function.
  // @see https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
  match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
    if (error) {
      routerError(error);
    } else if (redirectLocation) {
      return;
    } else if (!renderProps) {
      routerError();
    }

    // Preact's default behaviour is to append to the container, rather than
    // replace existing content like in React.  The Preact Compat is supposed
    // to emulate React's behaviour however it seems to be having problems
    // with this dynamic routing configuration, therefore we manually clear
    // out our container before doing any rendering.
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    const store = configureStore();
    const history = syncHistoryWithStore(browserHistory, store);

    render(
      // We need to explicly render the Router component here instead of have
      // this embedded within a shared App type of component as we use different
      // router base components for client vs server rendering.
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>,
      container
    );
  });
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
