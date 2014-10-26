import Ember from 'ember';

export default Ember.ObjectController.extend({
  mec: function() {
    window.mec = this;
    console.log('init');
  }.on('init')
});
