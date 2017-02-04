/* eslint-disable no-console,global-require,no-underscore-dangle,import/no-extraneous-dependencies,max-len */

import React from 'react';
import { RouterContext } from 'react-router';
import match from 'react-router/lib/match';
import ReactDOM from 'react-dom/server';
import routes from 'App/modules/routes';

module.exports = (req, res) => {
  console.log(res.locals.webpackStats.toJson());

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    const componentHTML = ReactDOM.renderToString(
      <RouterContext {...renderProps} />
    );

    if (redirectLocation) {
      return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    }

    if (error) {
      return res.status(500).send(error.message);
    }

    if (!renderProps) {
      return res.status(404).send('Not found');
    }

    return res.render('index', {
      markup: componentHTML,
    });
  });
};
