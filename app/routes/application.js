import Ember from "ember";

//TODO Put this in config
L.Icon.Default.imagePath = 'assets/images';

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
    var distance = queryParams.distance;

    if (categories) {
      this.get('store').all('category').forEach(function(c) {
        if (categories.split(",").contains(c.get('id'))) {
          c.set('selected', true);
        }
      });
    }

    if (distance) {
      this.get('store').all('distance').filter(function(d) {
        return distance === d.get('distance');
      }).forEach(function(d) {
        d.set('selected', true);
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
