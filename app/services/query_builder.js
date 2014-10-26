export default Ember.Object.extend({

  baseSearchURL: 'https://pro2.wallapop.com/shnm-portlet/api/v1/item.json/search7',

  productsURL: function(startItem, filters) {
    var params = [];

    if (filters) {
      filters.categories && params.push('categoryIds=' + filters.categories.join(","));

      filters.price && params.push('salePriceSegments=' + [filters.price.min, filters.price.max].join("_"));

      filters.distance && params.push('distanceSegments=' + [filters.distance.min, filters.distance.max].join("_"));
    }

    startItem && params.push('start =' + startItem);

    return [this.baseSearchURL, params.join("&")].join("?");
  },

  bootstrapURL: function() {
    return 'https://pro2.wallapop.com/shnm-portlet/api/v1/application.json/appStart';
  }
});
