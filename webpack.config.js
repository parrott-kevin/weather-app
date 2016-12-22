const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, 'public/dist')
const APP_DIR = path.resolve(__dirname, 'public/src')

var config = {
  entry: {
    app: path.resolve(APP_DIR, 'indexRedux.jsx'),
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'redux-thunk',
      'redux-logger',
      'whatwg-fetch']
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [APP_DIR],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader',
          fallbackLoader: 'style-loader'
        })
      }
    ]
  },
  watch: true,
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    }),
    new ExtractTextPlugin('styles.css')
  ]
}

module.exports = config
