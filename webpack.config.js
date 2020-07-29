var path = require('path');

module.exports = {
  entry: './js/entry.js',
  mode: 'production',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
}
