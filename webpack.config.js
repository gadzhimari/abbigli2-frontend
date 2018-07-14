require('dotenv').config();

const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const LessListPlugin = require('less-plugin-lists');
const LessFunctionPlugin = require('less-plugin-functions');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');


const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'testing';
const isTestOrProd = isProd || isTest;

function inRoot(relPath) {
  return path.resolve(__dirname, relPath);
}

const jsName = isTestOrProd
  ? 'bundle-[hash].js'
  : 'bundle.js';

const cssName = isTestOrProd
  ? 'style-[hash].css'
  : 'style.css';

const plugins = [
  new ExtractTextPlugin({
    filename: cssName,
    allChunks: true,
  }),
  new webpack.LoaderOptionsPlugin({
    test: /\.styl$/,
    stylus: {
      import: path.resolve(__dirname, './app/containers/App/variables.styl'),
    },
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      LOCATION: JSON.stringify(process.env.LOCATION),
      SENTRY_DNS_CLIENT: JSON.stringify(process.env.SENTRY_DNS_CLIENT),
      DOMAIN_URL: JSON.stringify(process.env.DOMAIN_URL),
      THUMBS_URL: JSON.stringify(process.env.THUMBS_URL),
    },
  })
  // new MomentLocalesPlugin({
  //   localesToKeep: ['ru'],
  // })
];

if (isTestOrProd) {
  plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.join(__dirname, 'public', 'assets'),
    }),
    new webpack.optimize.UglifyJsPlugin(),
    // new LodashModuleReplacementPlugin()
  );
} else {
  plugins.push(
    new BundleAnalyzerPlugin()
  );
}

if (isProd) {
  plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );
}

const alias = {
  App: path.resolve(__dirname, 'app'),
  API: path.resolve(__dirname, 'app/api'),
  Tools: path.resolve(__dirname, 'app/tools'),
  'preact-redux': 'react-redux',
  config: inRoot('app/config'),
  components: inRoot('app/components'),
  containers: inRoot('app/containers'),
  reducers: inRoot('app/reducers'),
  ducks: inRoot('app/ducks'),
  actions: inRoot('app/actions'),
  utils: inRoot('app/utils'),
};

const styleLoader = isTestOrProd
  ? ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'postcss-loader', 'stylus-loader'],
  })
  : ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader?sourceMap', 'postcss-loader', 'stylus-loader?sourceMap'],
  });

const jsLoader = 'babel-loader';
const publicPath = isTestOrProd ? '/assets/' : '/public/assets';

module.exports = {
  entry: ['./app/index.js'],
  output: {
    filename: jsName,
    path: path.resolve(__dirname, 'public/assets'),
    publicPath,
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
        test: /\.styl$/,
        loader: styleLoader,
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }, 'postcss-loader', {
            loader: 'less-loader',
            options: {
              paths: [
                path.resolve(__dirname, 'app/containers/App/base'),
              ],
              sourceMap: true,
              plugins: [
                new LessListPlugin(),
                new LessFunctionPlugin(),
              ]
            },
          }],
        }),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!postcss-loader',
        }),
      },
      {
        test: /\.(jsx|js)$/,
        loader: jsLoader,
        exclude: [/node_modules/, /public/],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico|eot|svg|ttf|woff|woff2|otf)$/,
        loader: 'url-loader',
        query: {
          limit: 15000,
          emitFile: true,
        },
      },
    ],
  },
  devtool: isTestOrProd ? false : 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
