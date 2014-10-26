export default Ember.Object.extend({
  productsURL: function(startItem) {
    return 'https://pro2.wallapop.com/shnm-portlet/api/v1/item.json/search7?start=' + startItem;
  },

  bootstrapURL: function() {
    return 'https://pro2.wallapop.com/shnm-portlet/api/v1/application.json/appStart';
  }
});
