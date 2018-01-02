const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const DIST_DIR = path.resolve(__dirname, 'public', 'dist')
const SRC_DIR = path.resolve(__dirname, 'public', 'src')

process.traceDeprecation = true

const baseConfig = {
  entry: {
    app: path.resolve(SRC_DIR, 'index.jsx'),
    vendor: [
      'babel-polyfill',
      'whatwg-fetch',
      'react',
      'react-dom',
      'prop-types',
      'redux',
      'react-redux',
      'redux-thunk',
      'redux-logger',
      'react-select'
    ]
  },
  output: {
    filename: '[hash].[name].js',
    path: DIST_DIR,
    publicPath: '/',
    sourceMapFilename: '[file].map'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: SRC_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'mimetype=image/svg+xml'
          }
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'API_PORT': 8000
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity
    }),
    new ExtractTextPlugin('[contenthash].styles.css'),
    // Provides access to jquery as global with the following aliases
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),
    new HtmlWebpackPlugin({
      template: './public/src/index.ejs'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}

const developmentBuild = baseConfig => {
  return Object.assign({}, baseConfig, {
    devServer: {
      contentBase: path.resolve(__dirname, 'public/dist'),
      port: 8000,
      proxy: {
        '/api': {
          target: 'http://localhost:9000'
        }
      },
      historyApiFallback: true,
      noInfo: false,
      stats: 'minimal'
    }
  })
}

const productionBuild = baseConfig => {
  const plugins = [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false,
        unused: true,
        dead_code: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  ]

  return Object.assign({}, baseConfig, { devtool: 'source-map', plugins })
}

const build = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return developmentBuild(baseConfig)
    case 'production':
      return productionBuild(baseConfig)
    default:
      return developmentBuild(baseConfig)
  }
}

module.exports = build
