import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const isProd = plugin => (process.env.NODE_ENV === 'production' ? plugin : undefined);

const jsName = process.env.NODE_ENV === 'production'
  ? 'bundle-[hash].js'
  : 'bundle.js';

const cssName = process.env.NODE_ENV === 'production'
  ? 'style-[hash].css'
  : 'style.css';

const plugins = [
  new ExtractTextPlugin(cssName),
  isProd(new webpack.optimize.DedupePlugin()),
  isProd(new webpack.optimize.OccurrenceOrderPlugin()),
];

const alias = {
  App: path.resolve(__dirname, 'app'),
  Api: path.resolve(__dirname, 'app/api'),
  Tools: path.resolve(__dirname, 'app/tools'),
};

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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'scss-loader'),
      },
      {
        test: /\.jsx$/,
        loader: process.env.NODE_ENV !== 'production'
          ? 'babel!eslint-loader'
          : 'babel',
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
