import Ember from 'ember';
import Product from '../models/product';
import QueryBuilder from '../services/query_builder';

export default Ember.Route.extend({
  model: function() {
    if (!this.get('controller.length')) {
      return this.loadRecords();
    }
  },

  queryBuilder: function() {
    return this._queryBuilder || (this._queryBuilder = new QueryBuilder());
  }.property(),

  loadRecords: function(s) {
    var start = this.get('controller.length') || 0;
    var route = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.get(route.get('queryBuilder').productsURL(start)).then(function(result) {
        var parsedItems = result.items.map(function(item) {
          return Product.create(item.item);
        });

        resolve(parsedItems);
      }).fail(reject);
    });
  },

  actions: {
    loadMore: function() {
      if (!this.get('controller.loadingMore')) {
        this.set('controller.loadingMore', true);
        this.loadRecords().then(function(records) {
          this.get('controller').pushObjects(records);
          this.set('controller.loadingMore', false);
        }.bind(this));
      }
    }
  }
});
