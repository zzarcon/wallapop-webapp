/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {});

  app.import('bower_components/bxslider-4/dist/jquery.bxslider.js');
  app.import('bower_components/bxslider-4/dist/jquery.bxslider.css');

  //Ember LeafLeft
  app.import('bower_components/leaflet-dist/leaflet.css');
  app.import('bower_components/leaflet.markercluster/dist/MarkerCluster.css');
  app.import('bower_components/leaflet.markercluster/dist/MarkerCluster.Default.css');

  app.import('bower_components/leaflet-dist/leaflet-src.js');
  app.import('bower_components/leaflet.markercluster/dist/leaflet.markercluster-src.js');
  app.import('bower_components/ember-leaflet/dist/ember-leaflet.js');

  return app.toTree();
};