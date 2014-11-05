import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['categories', 'keywords', 'priceMin', 'priceMax', 'orderBy', 'orderType', 'latitude', 'longitude'],
  selectedOrder: "",
  keywords: "",

  _latitude: Ember.computed.alias('geolocation.latitude'),
  _longitude: Ember.computed.alias('geolocation.longitude'),
  _geolocation: function() {
    var controller = this;
    var promise = new Ember.RSVP.Promise(function(resolve) {
      navigator.geolocation.getCurrentPosition(function(location) {
        debugger;
        resolve(location.coords);
      });
    });

    return DS.PromiseObject.create({promise: promise});
  }.property(),

  setCoordinates: function() {
    navigator.geolocation.getCurrentPosition(function(location) {
      this.set('latitude', location.coords.latitude);
      this.set('longitude', location.coords.longitude);
    }.bind(this));
  }.on('init')
});
