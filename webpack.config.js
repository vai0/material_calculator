var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = ['@material/animation', '@material/ripple', 'material-components-web', '@material/auto-init'];

module.exports = {
  entry: {
    bundle: './src/js/index.js'
    // vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader",
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader",
          options: {
            includePaths: glob.sync('node_modules').map((d) => path.join(__dirname, d))
          }
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }]
      },
      {
        test: /\.(woff2|woff)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: './fonts/[name].[ext]',
            limit: 30000,
            mimetype: 'application/font-woff',
          },
        }
      },
      {
        test: /\.(svg|png|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: './images/[name].[ext]',
            limit: 30000
          }
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src/js'),
      path.resolve('./src'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
