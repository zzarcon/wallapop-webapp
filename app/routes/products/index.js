import Ember from 'ember';
import queryParams from '../../query-params';

var params = {};
queryParams.forEach(function(paramName) {
  params[paramName] = {refreshModel: true};
});

export default Ember.Route.extend({
  queryParams: params,

  model: function() {
    return this.get('store').all('product');
  },

  beforeModel: function(transition) {
    var fetcher = this.get('fetcher');
    var queryParams = transition.queryParams;
    var filters = {
      categories: queryParams.categories && queryParams.categories.split(","),
      keywords: queryParams.keywords,
      price: {min: queryParams.priceMin, max: queryParams.priceMax},
      geolocation: {latitude: queryParams.latitude, longitude: queryParams.longitude}
    };

    this.set('filters', filters);
    this.get('store').unloadAll('product');

    return fetcher.products(null, filters);
  },

  setupController: function(controller, model, transition) {
    var hasQueryParams = Object.keys(transition.queryParams).length;
    controller.set('hasSearchParams', hasQueryParams);

    return this._super.apply(this, arguments);
  },

  actions: {
    loadMore: function() {
      var start = this.get('controller.length');

      if (!this.get('controller.loadingMore')) {
        this.set('controller.loadingMore', true);
        this.get('fetcher').products(start, this.get('filters')).then(function() {
          this.set('controller.loadingMore', false);
        }.bind(this));
      }
    }
  }
});