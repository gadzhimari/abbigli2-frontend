/* eslint-disable no-console,global-require,no-underscore-dangle,import/no-extraneous-dependencies,max-len */
require('babel-core/register');

const express = require('express');
const path = require('path');

const renderOnServer = require('./server/middlewares/renderOnServer');

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);
const webpackMiddlewareInstance = webpackMiddleware(compiler, {
  serverSideRender: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
});

const app = express();

app.use(express.static('./public'));

app.set('views', path.join(__dirname, 'server/templates'));

app.set('view engine', 'ejs');

app.use(webpackMiddlewareInstance);

app.use(renderOnServer);

app.listen(3000, () => {
  console.log('server listening on port 3000');
});

