import Ember from "ember";
import Fetcher from "../services/product_fetcher";

export default Ember.Route.extend({
  beforeModel: function(transition) {
    return this.get('fetcher').bootstrap();
  },

  setupController: function(controller, model, transition) {
    this.setFromQueryParams(controller, transition.queryParams);
  },

  fetcher: function() {
    this._fetcher = this._fetcher || Fetcher.create({store: this.get('store')});
    return this._fetcher;
  }.property(),

  setFromQueryParams: function(controller, queryParams) {
    this.get('store').all('category').forEach(function(c) {
      if (queryParams.categories.split(",").contains(c.get('id'))) {
        c.set('selected', true);
      }
    });

    controller.set('keywords', queryParams.keywords);
    controller.set('priceMin', queryParams.priceMin);
    controller.set('priceMax', queryParams.priceMax);
  }
});
