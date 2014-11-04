import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['categories', 'keywords', 'priceMin', 'priceMax', 'orderBy', 'orderType'],
  selectedOrder: "",
  keywords: ""
});
