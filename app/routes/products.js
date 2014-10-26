import Ember from 'ember';
import ProductFetcher from '../services/product_fetcher';

export default Ember.Route.extend({
  model: function() {
    return this.get('store').all('product');
  },

  productFetcher: function() {
    this._productFetcher = this._productFetcher || ProductFetcher.create({store: this.get('store')});
    return this._productFetcher;
  }.property(),


  beforeModel: function() {
    var fetcher = this.get('productFetcher');
    return fetcher.products();
  },

  actions: {
    loadMore: function() {
      var start = this.get('controller.length');
      if (!this.get('controller.loadingMore')) {
        this.set('controller.loadingMore', true);
        this.get('productFetcher').products(start).then(function(records) {
          this.set('controller.loadingMore', false);
        }.bind(this));
      }
    }
  }
});
