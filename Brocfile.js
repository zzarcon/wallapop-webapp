/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('vendor/ember-backdoor/backdoor.js');
app.import('vendor/moment/moment.js');
app.import('vendor/masonry/dist/masonry.pkgd.js');
app.import('vendor/bxslider-4/jquery.bxslider.js');

app.import('vendor/bxslider-4/jquery.bxslider.css');

//Ember LeafLeft
app.import('vendor/leaflet-dist/leaflet.css');
app.import('vendor/leaflet.markercluster/dist/MarkerCluster.css');
app.import('vendor/leaflet.markercluster/dist/MarkerCluster.Default.css');

app.import('vendor/leaflet-dist/leaflet-src.js');
app.import('vendor/leaflet.markercluster/dist/leaflet.markercluster-src.js');
app.import('vendor/ember-leaflet/dist/ember-leaflet.js');

module.exports = app.toTree();