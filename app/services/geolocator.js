import Ember from 'ember';
import DS from 'ember-data';

export default Ember.ObjectController.extend({
  geolocation: function() {
    var promise = new Ember.RSVP.Promise(function(resolve) {
      navigator.geolocation.getCurrentPosition(function(location) {
        resolve(Ember.Object.create(location.coords));
      });
    });

    return DS.PromiseObject.create({
      promise: promise
    });
  }.property(),

  latitude: Ember.computed.alias('geolocation.latitude'),
  longitude: Ember.computed.alias('geolocation.longitude'),

  geocode: function(terms) {
    return Ember.$.get(this.searchURL(terms));
  },

  baseURL: function() {
    return 'http://nominatim.openstreetmap.org/search/';
  }.property(),

  searchURL: function(terms) {
    var encodedTerms = encodeURIComponent(terms);

    return this.get('baseURL') + encodedTerms + "?format=json";
  }
});
