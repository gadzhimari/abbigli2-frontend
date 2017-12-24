/* eslint-disable no-console,global-require,no-underscore-dangle,import/no-extraneous-dependencies,max-len */

import React from 'react';
import { RouterContext } from 'react-router';
import match from 'react-router/lib/match';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';

import path from 'path';

import routes from '../../app/routes';
import mustAddNofollow from '../lib/mustAddNofollow';
import { nofollow } from '../lib/etc/meta';

module.exports = (req, res) => {
  const store = req.redux;
  const renderRoutes = routes(store, req.cookies.id_token, true);

  match({ routes: renderRoutes, location: req.newPath || req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    }

    if (error) {
      return res.status(500).send(error.message);
    }

    if (!renderProps) {
      return res.status(404).sendFile(path.resolve(__dirname, '../templates/404.html'));
    }

    const componentHTML = ReactDOM.renderToString(
      <Provider store={store} >
        <RouterContext {...renderProps} />
      </Provider>);

    const helmetStatic = Helmet.renderStatic();

    const seo = {
      title: helmetStatic.title.toString(),
      meta: helmetStatic.meta.toString(),
    };

    if (mustAddNofollow(req)) {
      seo.meta = `${nofollow}${seo.meta}`;
    }

    res.render('index', {
      markup: componentHTML,
      seo,
    });
  });
};
