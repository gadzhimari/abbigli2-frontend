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
const aboutCss = fs.readFileSync(path.resolve(__dirname, '../criticalCSS/about.html'), 'utf8');
const blogsCss = fs.readFileSync(path.resolve(__dirname, '../criticalCSS/blogs.html'), 'utf8');
const eventsCss = fs.readFileSync(path.resolve(__dirname, '../criticalCSS/events.html'), 'utf8');
const faqCss = fs.readFileSync(path.resolve(__dirname, '../criticalCSS/faq.html'), 'utf8');
const newpostCss = fs.readFileSync(path.resolve(__dirname, '../criticalCSS/newposts.html'), 'utf8');
const createCss = fs.readFileSync(path.resolve(__dirname, '../criticalCSS/create.html'), 'utf8');
const sectionsCss = fs.readFileSync(path.resolve(__dirname, '../criticalCSS/sections.html'), 'utf8');

const linksToCss = {
  blogs: blogsCss,
  events: eventsCss,
  'page/faq': faqCss,
  'page/about': aboutCss,
  'new-products': newpostCss,
  'nearest-products': newpostCss,
  'popular-products': newpostCss,
  'set-the-mood': newpostCss,
  'post/new': createCss,
  'sections/:section': sectionsCss,
  'sections/:section/:tag': sectionsCss,
  'tags/:tags(/:page)': sectionsCss,
};

module.exports = (req, res) => {
  const store = configureStore();
  const renderRoutes = routes(store, req.cookies.id_token);

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
      pageCss: linksToCss[renderProps.routes[1].path] || '',
    });
  });
};
