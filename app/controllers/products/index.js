import Ember from 'ember';
import DS from 'ember-data';
import queryParams from '../../query-params';

var params = {};
queryParams.forEach(function(paramName) {
  params[paramName] = "";
});

export default Ember.ArrayController.extend(params, {
  needs: ['application'],
  queryParams: queryParams,
  hasSearchParams: false,

  _latitude: Ember.computed.alias('geolocation.latitude'),
  _longitude: Ember.computed.alias('geolocation.longitude'),

  isLoading: Ember.computed.alias('fetcher.fetchingProducts'),

  geolocation: function() {
    var promise = new Ember.RSVP.Promise(function(resolve) {
      navigator.geolocation.getCurrentPosition(function(location) {
        resolve(location.coords);
      });
    });

    return DS.PromiseObject.create({
      promise: promise
    });
  }.property(),

  actions: {
    resetFilters: function() {
      this.set('hasSearchParams', false);

      //Reset app params
      this.get('controllers.application').resetSearchParams();

      //Reset URL params
      queryParams.forEach(function(paramName) {
        this.set(paramName, '');
      }, this);
    }
  }
});