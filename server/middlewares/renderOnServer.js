/* eslint-disable no-console,global-require,no-underscore-dangle,import/no-extraneous-dependencies,max-len */

import React from 'react';
import { RouterContext } from 'react-router';
import match from 'react-router/lib/match';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import helmet from 'react-helmet';

import path from 'path';
import fs from 'fs';

import configureStore from '../../app/store';
import routes from '../../app/routes';

const isProd = process.env.NODE_ENV === 'production';

const assetsUrl = isProd ? '' : 'http://localhost:8080';
let jsUrl;
let cssUrl;

if (isProd) {
  const ClientBundleAssets = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../public/assets/assets.json'), 'utf8')
  );

  jsUrl = ClientBundleAssets.main.js;
  cssUrl = ClientBundleAssets.main.css;
} else {
  jsUrl = '/public/assets/bundle.js';
  cssUrl = '/public/assets/style.css';
}

const commonCss = fs.readFileSync(path.resolve(__dirname, '../criticalCSS/common.html'), 'utf8');

module.exports = (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    }

    if (error) {
      return res.status(500).send(error.message);
    }

    if (!renderProps) {
      return res.status(404).sendFile(path.resolve(__dirname, '../templates/404.html'));
    }
    const store = configureStore();
    const root = renderProps.routes[0].component.WrappedComponent;

    root.fetchData({ store, token: req.cookies.id_token })
      .then(() => {
        const componentHTML = ReactDOM.renderToString(
          <Provider store={store} >
            <RouterContext {...renderProps} />
          </Provider>
        );
        const helmetStatic = helmet.renderStatic();
        const seo = {
          title: helmetStatic.title.toString(),
          meta: helmetStatic.meta.toString(),
        };

        res.render('index', {
          markup: componentHTML,
          baseUrl: assetsUrl,
          jsUrl,
          cssUrl,
          store: encodeURI(JSON.stringify(store.getState())),
          seo,
          commonCss,
        });
      });
  });
};
