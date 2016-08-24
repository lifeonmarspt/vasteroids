var path = require('path');

module.exports = {
  entry: './js/entry.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: { presets: ['es2015'] }
      }
    ]
  }
}
