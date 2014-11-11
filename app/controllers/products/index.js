import Ember from 'ember';
import queryParams from '../../query-params';

export default Ember.ArrayController.extend({
  needs: ['application'],
  queryParams: queryParams,

  categories: "",
  keywords: "",
  priceMin: "",
  priceMax: "",
  orderBy: "",
  orderType: "",
  latitude: "",
  longitude: "",

  hasSearchParams: false,

  _latitude: Ember.computed.alias('geolocation.latitude'),
  _longitude: Ember.computed.alias('geolocation.longitude'),

  geolocation: function() {
    var controller = this;

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