import Ember from 'ember';
import DS from "ember-data";

export default Ember.ArrayController.extend({
  queryParams: ['keywords'],
  keywords: "bwm",

  model: function() {
    var url = "https://pro2.wallapop.com/shnm-portlet/api/v1/item.json/search7?latitude=41.3693073&longitude=2.0781752&keywords=" +
              this.get('keywords') +
              "&categoryIds=12800&salePriceSegments=0_&distanceSegments=0_&resultTypes=Item&filterByFavouriteCategories=false";

    return DS.PromiseArray.create({
      promise: new Ember.RSVP.Promise(function(resolve) {
        Ember.$.get(url).then(function(data) {
          resolve(data.items);
        });
      })
    });
  }.property('keywords')
});