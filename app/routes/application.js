import Ember from "ember";

export default Ember.Route.extend({
  beforeModel: function() {
    return Ember.RSVP.all([this.get('fetcher').bootstrap(), this.get('geolocator.geolocation')]);
  },

  setupController: function(controller, model, transition) {
    this.setFromQueryParams(controller, transition.queryParams);
  },

  setFromQueryParams: function(controller, queryParams) {
    var categories = queryParams.categories;
    var orderType = queryParams.orderType;
    var orderBy = queryParams.orderBy;

    if (categories) {
      this.get('store').all('category').forEach(function(c) {
        if (categories.split(",").contains(c.get('id'))) {
          c.set('selected', true);
        }
      });
    }

    if (orderBy && orderType) {
      this.get('store').all('order').filter(function(order) {
        return order.get('orderType') === orderType && order.get('orderBy') === orderBy;
      }).forEach(function(order) {
        order.set('selected', true);
      });
    }

    controller.set('keywords', queryParams.keywords);
    controller.set('priceMin', queryParams.priceMin);
    controller.set('priceMax', queryParams.priceMax);
  }
});
