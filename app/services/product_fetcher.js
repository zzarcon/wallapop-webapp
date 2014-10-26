import Ember from 'ember';
import DS from 'ember-data';
import QueryBuilder from './query_builder';

export default Ember.Object.extend({
  categories: function() {
    var fetcher = this;
    var bootstrapURL = this.get('queryBuilder').bootstrapURL();
    var store = this.get('store');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.get(bootstrapURL).then(function(result) {
        result.categories.forEach(function(category) {
          store.createRecord('category', {id: category.categoryId, name: category.name});
        });

        resolve({categories: store.all('category')});
      });
    });
  },

  queryBuilder: function() {
    return this._queryBuilder || (this._queryBuilder = new QueryBuilder());
  }.property()
});
