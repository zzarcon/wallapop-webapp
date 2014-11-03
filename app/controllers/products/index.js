import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['categories'],
  selectedOrder: "",
  keywords: ""
});
