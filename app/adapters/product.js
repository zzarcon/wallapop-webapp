import Ember from "ember";
import DS from "ember-data";

export default DS.RESTAdapter.extend({
  host: "https://pro2.wallapop.com",
  namespace: "shnm-portlet/api/v1/item.json/search7",

  find: function() {

  },

  findAll: function(store) {
    return new Ember.RSVP.Promise(function(resolve) {
      var uri = this.urlPrefix();

      Ember.$.get(uri).then(function(data) {
        var id, item;

        data.items.forEach(function(i) {
          item = i;
          id = item.itemId;

          if (!store.getById('product', id)) {
            store.createRecord('product', {
              id: id
            });
          }
        });
      });
    }.bind(this));
  },

  _createProduct: function(store, data) {

  }
});