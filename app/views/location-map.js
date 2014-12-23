var markerLayer = EmberLeaflet.MarkerLayer.extend(EmberLeaflet.DraggableMixin, EmberLeaflet.PopupMixin, {
  dragend: function() {
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
  center: L.latLng(51.507351, -0.127758),
  zoom: 15,
  options: {
    maxZoom: 19, minZoom: 0
  },

  childLayers: [EmberLeaflet.DefaultTileLayer, marker],

  updateCenter: function(){
    var center = L.latLng(
      this.get('controller.geolocator.latitude'),
      this.get('controller.geolocator.longitude')
    );
    this.set('center', center);
  }.observes('controller.geolocator.latitude', 'controller.geolocator.longitude'),

  events: ['click'],
});
