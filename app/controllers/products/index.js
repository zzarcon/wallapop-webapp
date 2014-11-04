import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['categories', 'keywords', 'priceMin', 'priceMax'],
  selectedOrder: "",
  keywords: ""
});
