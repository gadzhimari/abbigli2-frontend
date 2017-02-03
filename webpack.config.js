const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const isProd = plugin => (process.env.NODE_ENV === 'production' ? plugin : undefined);

const jsName = process.env.NODE_ENV === 'production'
  ? 'bundle-[hash].js'
  : 'bundle.js';

const cssName = process.env.NODE_ENV === 'production'
  ? 'style-[hash].css'
  : 'style.css';

const plugins = [
  new ExtractTextPlugin(cssName, {
    allChunks: true,
  }),
  isProd(new webpack.optimize.DedupePlugin()),
  isProd(new webpack.optimize.OccurrenceOrderPlugin()),
  isProd(new AssetsPlugin({
    filename: 'assets.json',
    path: path.join(__dirname, 'public', 'assets'),
  })),
];

const alias = {
  App: path.resolve(__dirname, 'app'),
  Api: path.resolve(__dirname, 'app/api'),
  Tools: path.resolve(__dirname, 'app/tools'),
};

const styleLoader = process.env.NODE_ENV !== 'production'
  ? [
    'style?sourceMap',
    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
    'scss',
  ]
  : ExtractTextPlugin.extract(
    'style',
    'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
    'scss',
  );

const jsLoader = process.env.NODE_ENV !== 'production'
  ? 'babel!eslint-loader'
  : 'babel';

module.exports = {
  entry: ['./app/index.jsx'],
  output: {
    filename: jsName,
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: '/assets/',
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
    alias,
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: styleLoader,
      },
      {
        test: /\.(jsx|js)$/,
        loader: jsLoader,
        exclude: [/node_modules/, /public/],
      },
    ],
  },
  debug: process.env.NODE_ENV !== 'production',
  devtool: process.env.NODE_ENV !== 'production'
    ? 'source-map'
    : null,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    port: 8050,
    publicPath: '/assets/',
    watchContentBase: true,
  },
};
