import Ember from 'ember';
import ProductFetcher from '../../services/product_fetcher';

export default Ember.Route.extend({
  model: function(params) {
    var fetcher = this.get('productFetcher');
    return fetcher.product(params.productId);
  },

  productFetcher: function() {
    this._productFetcher = this._productFetcher || ProductFetcher.create({store: this.get('store')});
    return this._productFetcher;
  }.property(),
});
