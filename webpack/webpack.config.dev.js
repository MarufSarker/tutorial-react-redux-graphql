var path = require('path')
var precss = require('precss')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var HTMLWebpackPlugin = require('html-webpack-plugin')

var vendors = require('./vendors')

console.log('=================================')
console.log('|| Running in Development Mode ||')
console.log('=================================')

module.exports = function(env) {
  return {
    entry: {
      'dist/bundle': path.resolve(__dirname, '..', 'src', 'index.js'),
      'dist/vendors': vendors
    },
    output: {
      path: path.resolve(__dirname, '..', 'public'),
      filename: '[name].js'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "style-loader!css-loader!postcss-loader"
      }],
    },
    postcss: function() {
      return {
        defaults: [autoprefixer, precss],
        cleaner: [autoprefixer({ browsers: ['last 2 versions'] })]
      }
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.CommonsChunkPlugin('dist/vendors', 'dist/vendors.bundle.js'),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': env
      }),
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, '..', 'node_modules/html-webpack-template/index.ejs'),
        devServer: 'http://localhost:3000',
        title: 'React Redux GraphQL',
        chunks: ['dist/vendors', 'dist/bundle'],
        filename: 'index.html',
        appMountId: 'app',
        inject: false,
        mobile: true,
        hash: false
      }),
    ]
  }
}
