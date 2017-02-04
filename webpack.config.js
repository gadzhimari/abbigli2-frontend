const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const jsName = isProd
  ? 'bundle-[hash].js'
  : 'bundle.js';

const cssName = isProd
  ? 'style-[hash].css'
  : 'style.css';

const plugins = [
  new ExtractTextPlugin(cssName, {
    allChunks: true,
  }),
];

if (isProd) {
  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.join(__dirname, 'public', 'assets'),
    })
  );
}

const alias = {
  App: path.resolve(__dirname, 'app'),
  Api: path.resolve(__dirname, 'app/api'),
  Tools: path.resolve(__dirname, 'app/tools'),
};

const styleLoader = isProd
  ? ExtractTextPlugin.extract(
    'style',
    'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
    'scss'
  )
  : [
    'style?sourceMap',
    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
    'scss',
  ];

const jsLoader = isProd
  ? 'babel'
  : 'babel!eslint-loader';

module.exports = {
  entry: ['./app/index.jsx'],
  output: {
    filename: jsName,
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: '/assets/',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
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
  devtool: isProd
    ? null
    : 'source-map',
};
