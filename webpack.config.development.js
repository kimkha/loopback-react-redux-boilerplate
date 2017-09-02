'use strict';

const path = require('path');
const webpack = require('webpack');

// More options here: https://webpack.js.org/configuration/devtool/
module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './client/index',
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.DefinePlugin({
      __API_URL__: '"/api"',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
  devServer: {
    hot: true,
    inline: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
};
