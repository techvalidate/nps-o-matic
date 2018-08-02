const { environment } = require('@rails/webpacker');
const webpack = require('webpack');

module.exports = environment;

environment.plugins.set(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    jquery: 'jquery'
  })
);