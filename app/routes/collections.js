import Ember from 'ember';

export default Ember.Router.extend({
  model: function() {
    return this.get('store').all('collection');
  }
});