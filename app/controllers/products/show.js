import Ember from 'ember';

export default Ember.ObjectController.extend({
  location: Ember.computed.alias('sellerUser.location'),
  latitude: Ember.computed.alias('location.approximatedLatitude'),
  longitude: Ember.computed.alias('location.approximatedLongitude')
});