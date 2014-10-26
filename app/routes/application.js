import Ember from "ember";
import Fetcher from "../services/product_fetcher";

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get('fetcher').categories();
  },

  fetcher: function() {
    this._fetcher = this._fetcher || Fetcher.create({store: this.get('store')});
    return this._fetcher;
  }.property(),
});
