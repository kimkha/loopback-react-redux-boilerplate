'use strict';

const path = require('path');
const webpack = require('webpack');

// More options here: https://webpack.js.org/configuration/devtool/
module.exports = {
  entry: [
    './client/index',
  ],
  output: {
    path: path.join(__dirname, '.build/dist'),
    filename: 'bundle.js',
    publicPath: '/.build',
  },
  plugins: [
    new webpack.DefinePlugin({
      __API_URL__: '"/api"',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
      include: [
        path.join(__dirname, 'client'),
        path.join(__dirname, 'common/logic'),
      ],
    }, {
      test: /\.json$/,
      use: ['json-loader'],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
  },
  node: {
    fs: 'empty',
  },
};
