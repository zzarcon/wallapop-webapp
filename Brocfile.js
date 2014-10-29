/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('vendor/ember-backdoor/backdoor.js');
app.import('vendor/moment/moment.js');
app.import('vendor/masonry/dist/masonry.pkgd.js');
app.import('vendor/bxslider-4/jquery.bxslider.js');

app.import('vendor/bxslider-4/jquery.bxslider.css');
module.exports = app.toTree();