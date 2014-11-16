import Ember from "ember";

var host = 'https://pro2.wallapop.com/shnm-portlet/api/v1/';

export default Ember.Object.extend({

  baseSearchURL: host + 'item.json/search7',

  productsURL: function(startItem, filters, order) {
    var params = [];

    if (filters) {
      filters.categories && params.push('categoryIds=' + filters.categories.join(","));

      filters.price && params.push('salePriceSegments=' + [filters.price.min || 0, filters.price.max].compact().join("_"));

      filters.distance && params.push('distanceSegments=' + [filters.distance.min || 0, filters.distance.max].join("_"));

      if (filters.geolocation && filters.geolocation.latitude && filters.geolocation.longitude) {
        var lat = 'latitude=' + filters.geolocation.latitude, lon = 'longitude=' + filters.geolocation.longitude;
        filters.geolocation && params.push(lat, lon);
      }

      filters.keywords && params.push('keywords=' + filters.keywords);
    }


    if (order) {
      params.push('orderType=', + order.get('orderBy') || 'asc');
      params.push('orderBy=', + order.get('orderType'));
    }

    startItem && params.push('start=' + startItem);

    return [this.baseSearchURL, params.join("&")].join("?");
  },

  bootstrapURL: function() {
    return host + 'application.json/appStart';
  },

  productURL: function(id) {
    return host + 'item.json/' + id;
  },

  userURL: function(id) {
    return host + 'user.json/' + id;
  }
});
