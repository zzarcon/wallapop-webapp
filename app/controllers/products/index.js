import Ember from 'ember';
import queryParams from '../../query-params';

var params = {};
queryParams.forEach(function(paramName) {
  params[paramName] = "";
});

export default Ember.ArrayController.extend(params, {
  needs: ['application'],
  queryParams: queryParams,
  hasSearchParams: false,
  loadingMore: false,

  isLoading: function() {
    return !this.get('loadingMore') && this.get('fetcher.fetchingProducts');
  }.property('fetcher.fetchingProducts', 'loadingMore'),

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
