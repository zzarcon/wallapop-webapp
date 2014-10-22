import Ember from 'ember';
import Product from '../models/product';

export default Ember.Route.extend({
  model: function() {
    if (!this.get('controller.length')) {
      return this.loadRecords();
    }
  },

  queryURL: function(start) {
    return 'https://pro2.wallapop.com/shnm-portlet/api/v1/item.json/search7?start=' + start;
  },

  loadRecords: function(s) {
    var start = this.get('controller.length') || 0;
    var route = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.get(route.queryURL(start)).then(function(result) {
        var parsedItems = result.items.map(function(item) {
          return Product.create(item.item);
        });

        resolve(parsedItems);
      }).fail(reject);
    });
  },

  actions: {
    loadMore: function() {
      if (!this.loadingMore) {
        this.loadingMore = true;
        this.loadRecords().then(function(records) {
          this.get('controller').pushObjects(records);
          this.loadingMore = false;
        }.bind(this));
      }
    }
  }
});
