require('babel-polyfill');
const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const ManifestAssetPlugin = new CopyWebpackPlugin([
  { from: 'src/assets/manifest.json', to: 'manifest.json' },
]);
const IconAssetPlugin = new CopyWebpackPlugin([
  { from: 'src/images/icon-192x192.png', to: 'icon-192x192.png' },
]);

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  target: 'web',
  output: {
    path: path.resolve('public/build'),
    filename: 'index_bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /config\.json$/,
        loader: 'special-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'url-loader',
      },

      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  plugins: [HtmlWebpackPluginConfig, ManifestAssetPlugin, IconAssetPlugin],
};
