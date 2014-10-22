import Ember from 'ember';
import Product from '../models/product';

export default Ember.Route.extend({
  model: function() {

    var route = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.get(this.queryURL()).then(function(result) {
        var parsedItems = result.items.map(function(item) {
          return Product.create(item.item);
        });

        resolve(parsedItems);
      }).fail(reject);
    });
  },

  queryURL: function() {
    return 'https://pro2.wallapop.com/shnm-portlet/api/v1/item.json/search7'
  }
});
