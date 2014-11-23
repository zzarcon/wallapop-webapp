/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('bower_components/ember-backdoor/backdoor.js');
app.import('bower_components/bxslider-4/jquery.bxslider.js');

app.import('bower_components/bxslider-4/jquery.bxslider.css');

//Ember LeafLeft
app.import('bower_components/leaflet-dist/leaflet.css');
app.import('bower_components/leaflet.markercluster/dist/MarkerCluster.css');
app.import('bower_components/leaflet.markercluster/dist/MarkerCluster.Default.css');

app.import('bower_components/leaflet-dist/leaflet-src.js');
app.import('bower_components/leaflet.markercluster/dist/leaflet.markercluster-src.js');
app.import('bower_components/ember-leaflet/dist/ember-leaflet.js');

module.exports = app.toTree();
