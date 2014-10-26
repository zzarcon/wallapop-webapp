import Ember from 'ember';
import DS from 'ember-data';
import QueryBuilder from './query_builder';

export default Ember.Object.extend({
  bootstrap: function() {
    var fetcher = this;
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

  products: function(start, filters) {
    var fetcher = this;
    var url = this.get('queryBuilder').productsURL(start, filters);
    var store = this.get('store');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.get(url).then(function(result) {
        result.items.forEach(function(itemWrapper) {
          var item = itemWrapper.item;
          var record = $.extend({id: item.itemId}, item);
          store.getById('product', item.itemId) || store.createRecord('product', record);
        });

        resolve(result);
      });
    });
  },

  queryBuilder: function() {
    return this._queryBuilder || (this._queryBuilder = new QueryBuilder());
  }.property()
});
