import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var fetcher = this.get('productFetcher');
    return fetcher.product(params.productId);
  }
});
