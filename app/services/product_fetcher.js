import Ember from 'ember';
import QueryBuilder from './query_builder';

export default Ember.Object.extend({
  bootstrap: function() {
    var bootstrapURL = this.get('queryBuilder').bootstrapURL();
    var store = this.get('store');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.get(bootstrapURL).then(function(result) {
        result.categories.forEach(function(category) {
          store.createRecord('category', {id: category.categoryId, name: category.name});
        });

        result.collections.forEach(function(collection) {
          store.createRecord('collection', {
            id: collection.collectionId,
            title: collection.title,
            description: collection.description
          });
        });

        result.resultFacet.orders.forEach(function(order) {
          store.createRecord('order', {
            title: order.title,
            orderType: order.orderType,
            orderBy: order.orderBy
          });
        });

        resolve(result);
      });
    });
  },

  product: function(id) {
    var store = this.get('store');
    var url = this.get('queryBuilder').productURL(id);
    var fetcher = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      var alreadyFetched = store.getById('product', id);
      if (alreadyFetched) {
        resolve(alreadyFetched);
      } else {
        Ember.$.get(url).then(function(result) {
          resolve(fetcher.productRecordFromItem(result));
        });
      }
    });
  },

  products: function(start, filters) {
    var url = this.get('queryBuilder').productsURL(start, filters);
    var store = this.get('store');
    var fetcher = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.get(url).then(function(result) {
        result.items.forEach(function(itemWrapper) {
          fetcher.productRecordFromItem(itemWrapper.item);
        });

        resolve(result);
      });
    });
  },

  productRecordFromItem: function(item) {
    var store = this.get('store');
    var record = $.extend({id: item.itemId}, item);
    return store.getById('product', item.itemId) || store.createRecord('product', record);
  },

  queryBuilder: function() {
    return this._queryBuilder || (this._queryBuilder = new QueryBuilder());
  }.property()
});
