import Ember from "ember";

var markerLayer = EmberLeaflet.MarkerLayer.extend(EmberLeaflet.DraggableMixin, EmberLeaflet.PopupMixin, {
  // events: ['click'],
  dragend: function() {
    debugger;
  }
});

var marker = EmberLeaflet.MarkerCollectionLayer.extend({
  itemLayerClass: markerLayer,

  content: function() {
    var lat = this.get('controller.geolocator.latitude');
    var lon = this.get('controller.geolocator.longitude');

    window.moc = this;
    return [{
      location: L.latLng(lat, lon)
    }];
  }.property('controller.geolocator.latitude', 'controller.geolocator.longitude'),

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
    window.mec = this;
    return L.latLng(
      this.get('controller.geolocator.latitude'),
      this.get('controller.geolocator.longitude')
    );
  }.property('controller.geolocator.latitude', 'controller.geolocator.longitude'),

  events: ['click'],
});
