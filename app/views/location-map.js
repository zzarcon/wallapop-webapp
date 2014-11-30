import Ember from "ember";

var latitude = 40.40464929880566;
var longitude = -3.704059234675413;

var markerLayer = EmberLeaflet.MarkerLayer.extend(EmberLeaflet.DraggableMixin, EmberLeaflet.PopupMixin, {
  // events: ['click'],
  dragend: function() {
    debugger;
  }
});
var marker = EmberLeaflet.MarkerCollectionLayer.extend({
  itemLayerClass: markerLayer,

  content: function() {
    var lat = this.get('controller.latitude');
    var lon = this.get('controller.longitude');

    return [{
      location: L.latLng(latitude, longitude)
    }];
  }.property('controller.latitude', 'controller.longitude'),

  events: ['click'],
  // click: function() {console.log('event!s')}
});

export default EmberLeaflet.MapView.extend({
  zoom: 15,
  options: {
    maxZoom: 19, minZoom: 0
  },
  childLayers: [EmberLeaflet.DefaultTileLayer, marker],

  center: function() {
    return L.latLng(
      latitude,
      longitude
    );
  }.property('controller.latitude', 'controller.longitude'),
  events: ['click'],
  // click: function() {console.log('event!s')}
});