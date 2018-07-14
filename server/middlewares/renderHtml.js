/* eslint-disable consistent-return */

import React from 'react';
import { RouterContext } from 'react-router';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';

import path from 'path';

import mustAddNofollow from '../lib/mustAddNofollow';
import { nofollow } from '../lib/etc/meta';
import prepareState from '../lib/prepareState';

module.exports = (req, res) => {
  const store = req.redux;
  const { error, redirectLocation, renderProps } = req.renderProps;
  const state = store.getState();

  if (redirectLocation) {
    return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
  }

  if (error) {
    return res.status(500).send(error.message);
  }

  if (!renderProps) {
    return res.status(404).sendFile(path.resolve(__dirname, '../templates/404.html'));
  }

  if (state.NetworkErrors.status !== null) {
    res.status(state.NetworkErrors.status);
  }

  const markup = ReactDOM.renderToString(
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

  const initialState = prepareState(state);

  return res.render('index', {
    markup,
    store: encodeURI(JSON.stringify(initialState)),
    seo,
    canonical: `${process.env.DOMAIN_URL}${req.path}`,
  });
};
