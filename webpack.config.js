const webpack = require('webpack')
const path = require('path')

const BUILD_DIR = path.resolve(__dirname, 'public/dist')
const APP_DIR = path.resolve(__dirname, 'public/src')

var config = {
  entry: {
    app: path.resolve(APP_DIR, 'index.jsx'),
    vendor: ['react', 'react-dom']
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
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ]
}

module.exports = config
