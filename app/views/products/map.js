import Ember from "ember";

//TODO Put this in config
L.Icon.Default.imagePath = 'images/';

export default EmberLeaflet.MapView.extend({
  location: Ember.computed.alias('controller.sellerUser.location'),
  zoom: 15,
  options: {
    maxZoom: 19, minZoom: 0
  },

  center: function() {
    return L.latLng(
      this.get('location.approximatedLatitude'),
      this.get('location.approximatedLongitude')
    );
  }.property('location.approximatedLatitude', 'location.approximatedLongitude'),
});