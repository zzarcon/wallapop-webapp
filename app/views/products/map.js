import Ember from "ember";

var marker = EmberLeaflet.MarkerCollectionLayer.extend({
  content: function() {
    var lat = this.get('controller.latitude');
    var lon = this.get('controller.longitude');

    return [{
      location: L.latLng(lat, lon)
    }];
  }.property('controller.latitude', 'controller.longitude')
});

export default EmberLeaflet.MapView.extend({
  zoom: 15,
  options: {
    maxZoom: 19, minZoom: 0
  },
  childLayers: [EmberLeaflet.DefaultTileLayer, marker],

  center: function() {
    return L.latLng(
      this.get('controller.latitude'),
      this.get('controller.longitude')
    );
  }.property('controller.latitude', 'controller.longitude'),
});