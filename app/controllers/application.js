import Ember from "ember";
import AppStatus from "../app-status";
import queryParams from '../query-params';

export default Ember.ObjectController.extend({
  applicationMenuExpandedRatio: 0,
  menuExpansionSpeed: 0.053333,

  setupFilters: function() {
    this.set('content', {});
    queryParams.forEach(function(filterName) {
      this.get(filterName) || this.set(filterName, null);
    }.bind(this));
  }.on('init'),

  products: function(){
    return this.get('container').lookup('controller:products.index');
  }.property(),

  allCategories: function() {
    return this.get('store').all('category');
  }.property(),

  orders: function() {
    return this.get('store').all('order');
  }.property(),

  distances: function() {
    return this.get('store').all('distance');
  }.property(),

  categories: Ember.computed.mapBy('_selectedCategories', 'id'),

  _categories: function() {
    return this.get('store').all('category');
  }.property(),

  _selectedCategories: Ember.computed.filterBy('_categories', 'selected'),

  currentRouteNameDidChange: function() {
    AppStatus.set('currentRouteName', this.get('currentRouteName'));
  }.observes('currentRouteName'),

  resetSearchParams: function() {
    var params = queryParams.copy().removeObject("categories");
    this.get('store').all('category').setEach('selected', false);

    params.forEach(function(paramName) {
      this.set(paramName, '');
    }, this);
  },

  actions: {
    toggleCategories: function() {
      this.toggleProperty('showCategories');
    },

    openCollections: function() {
      this.transitionToRoute('collections');
      this.hideMenu();
    },

    openCategory: function(id) {
      this.transitionToRoute("products", { queryParams: {categories: id }});
      this.hideMenu();
    },

    selectCategory: function(category) {
      category.toggleProperty('selected');
    },

    selectOrder: function(order) {
      this.get('store').all('order').setEach('selected', false);
      order.set('selected', true);
      this.set('order', order);
      this.set('orderBy', order.get('orderBy'));
      this.set('orderType', order.get('orderType'));
    },

    selectDistance: function(distance) {
      this.get('store').all('distance').setEach('selected', false);
      distance.set('selected', true);
      this.set('selectedDistance', distance);
      this.set('distance', distance.get('distance'));
    },

    filterProducts: function() {
      var params = {};

      queryParams.forEach(function(paramToCheck) {
        var param = this.get(paramToCheck);
        if (param && (param.length === undefined || param.length > 0)) {
          params[paramToCheck] = this.get(paramToCheck);
        }
      }.bind(this));

      this.transitionToRoute("products", { queryParams: params });
    }
  },

  // Private
  hideMenu: function(){
    this.set('showCategories', false);
    function reduceMenuExpansion(){
      var newExpansion = Math.max(this.get('applicationMenuExpandedRatio') - this.menuExpansionSpeed, 0);
      this.set('applicationMenuExpandedRatio', newExpansion);
      if (newExpansion > 0) {
        requestAnimationFrame(reduceMenuExpansion.bind(this));
      }
    }
    requestAnimationFrame(reduceMenuExpansion.bind(this));
  }
});
