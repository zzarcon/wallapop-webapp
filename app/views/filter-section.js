import Ember from "ember";

export default Ember.View.extend({
  layoutName: 'filter-section',
  classNames: ['filter-section'],
  classNameBindings: ['visible'],

  visible: false,

  setInputFocus: function() {
    if (this.get('visible')) {
      this.$('.search-query').focus();
    }
  }.observes('visible'),

  actions: {
    toggleVisibility: function() {
      this.toggleProperty('visible');
    }
  }
});