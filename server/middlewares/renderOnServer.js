/* eslint-disable no-console,global-require,no-underscore-dangle,import/no-extraneous-dependencies,max-len */

import React from 'react';
import { RouterContext } from 'react-router';
import match from 'react-router/lib/match';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';

import path from 'path';
import fs from 'fs';

import store from '../../app/store';
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

module.exports = (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    const componentHTML = ReactDOM.renderToString(
      <Provider store={store} >
        <RouterContext {...renderProps} />
      </Provider>
    );

    if (redirectLocation) {
      return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    }

    if (error) {
      return res.status(500).send(error.message);
    }

    if (!renderProps) {
      return res.status(404).sendFile(path.resolve(__dirname, '../templates/404.html'));
    }

    return res.render('index', {
      markup: componentHTML,
      baseUrl: assetsUrl,
      jsUrl,
      cssUrl,
    });
  });
};
