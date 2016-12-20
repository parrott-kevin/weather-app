const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, 'public/dist')
const APP_DIR = path.resolve(__dirname, 'public/src')

var config = {
  entry: {
    app: path.resolve(APP_DIR, 'index.jsx'),
    vendor: ['babel-polyfill', 'react', 'react-dom', 'whatwg-fetch']
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
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: true
    //   }
    // })
  ]
}

module.exports = config
