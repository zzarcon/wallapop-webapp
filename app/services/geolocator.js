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
  longitude: Ember.computed.alias('geolocation.longitude')
});
