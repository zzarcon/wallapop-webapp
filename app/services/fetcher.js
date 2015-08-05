import Ember from 'ember';
import QueryBuilder from './query_builder';

export default Ember.Object.extend({
  fetchingProducts: false,

  setRequestHeaders: function() {
    Ember.$.ajaxSetup({
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Accept-Language", "en_US");
      }
    });
  }.on("init"),

  bootstrap: function() {
    var bootstrapURL = this.get('queryBuilder').bootstrapURL();
    var store = this.get('store');

    return new Ember.RSVP.Promise(function(resolve) {
      Ember.$.get(bootstrapURL).then(function(result) {
        result.categories.forEach(function(category) {
          store.createRecord('category', {id: category.categoryId, name: category.name});
        });

        result.collections.forEach(function(collection) {
          store.createRecord('collection', {
            id: collection.collectionId,
            title: collection.title,
            description: collection.description,
            featuredItems: collection.featuredItems,
            images: collection.images,
            inDrawer: collection.inDrawer,
            numItems: collection.numItems,
            numSold: collection.numSold
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

    return new Ember.RSVP.Promise(function(resolve) {
      var alreadyFetched = store.peekRecord('product', id);
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
    var fetcher = this;

    fetcher.set('fetchingProducts', true);
    return new Ember.RSVP.Promise(function(resolve) {
      Ember.$.get(url).then(function(result) {
        result.items.forEach(function(itemWrapper) {
          fetcher.productRecordFromItem(itemWrapper.item);
        });

        fetcher.set('fetchingProducts', false);
        resolve(result);
      });
    });
  },

  productRecordFromItem: function(item) {
    var store = this.get('store');
    var record = Ember.$.extend({id: item.itemId}, item);
    return store.peekRecord('product', item.itemId) || store.createRecord('product', record);
  },

  userRecordFromUser: function(user) {
    var store = this.get('store');
    var record = Ember.$.extend({id: user.userId}, user);
    return store.peekRecord('user', user.userId) || store.createRecord('user', record);
  },

  user: function(id) {
    var store = this.get('store');
    var url = this.get('queryBuilder').userURL(id);
    var fetcher = this;

    return new Ember.RSVP.Promise(function(resolve) {
      var alreadyFetched = store.peekRecord('user', id);
      if (alreadyFetched) {
        resolve(alreadyFetched);
      } else {
        Ember.$.get(url).then(function(result) {
          resolve(fetcher.userRecordFromUser(result));
        });
      }
    });
  },

  queryBuilder: function() {
    return this._queryBuilder || (this._queryBuilder = new QueryBuilder());
  }.property()
});
