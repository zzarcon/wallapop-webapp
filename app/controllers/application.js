import Ember from "ember";
import AppStatus from "../app-status";

export default Ember.ObjectController.extend({
  setupFilters: function() {
    this.set('content', {});
    this.get('filterNames').forEach(function(filterName) {
      this.get(filterName) || this.set(filterName, null);
    }.bind(this));
  }.on('init'),

  filterNames: function() {
    return "keywords priceMin priceMax orderBy orderType categories".split(" ");
  }.property(),

  products: function(){
    return this.get('container').lookup('controller:products.index');
  }.property(),

  allCategories: function() {
    return this.get('store').all('category');
  }.property(),

  orders: function() {
    return this.get('store').all('order');
  }.property(),

  categories: Ember.computed.mapBy('_selectedCategories', 'id'),

  _categories: function() {
    return this.get('store').all('category');
  }.property(),

  _selectedCategories: Ember.computed.filterBy('_categories', 'selected'),

  currentRouteNameDidChange: function() {
    AppStatus.set('currentRouteName', this.get('currentRouteName'));
  }.observes('currentRouteName'),

  actions: {
    selectOrder: function(order) {
      this.get('store').all('order').forEach(function(ord) {
        ord.set('selected', false);
      });

      order.set('selected', true);
      this.set('orderBy', order.get('orderBy'));
      this.set('orderType', order.get('orderType'));
    },

    filterProducts: function() {
      var queryParams = {};

      this.get('filterNames').forEach(function(paramToCheck) {
        var param = this.get(paramToCheck);
        if (param && (!param.length || param.length > 0)) {
          queryParams[paramToCheck] = this.get(paramToCheck);
        }
      }.bind(this));

      this.transitionToRoute("products", {
        queryParams: queryParams
      });
    }
  }

});
