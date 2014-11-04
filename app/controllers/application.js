import Ember from "ember";

export default Ember.ObjectController.extend({
  keywords: "",
  priceMin: null,
  priceMax: null,

  products: function(){
    return this.get('container').lookup('controller:products.index');
  }.property(),

  categories: function() {
    return this.get('store').all('category');
  }.property(),

  orders: function() {
    return this.get('store').all('order');
  }.property(),

  enabledCategoryIds: function() {
    var store = this.get('store');
    return store.all('category').filterBy('selected').mapBy('id');
  },

  actions: {
    filterProducts: function() {
      this.transitionToRoute("products", {
        queryParams: {
          categories: this.enabledCategoryIds(),
          keywords: this.get('keywords'),
          priceMin: this.get('priceMin'),
          priceMax: this.get('priceMax')
        }
      });
    }
  }

});
