import Ember from "ember";

export default Ember.View.extend({
  elementId: 'application',
  showFilters: false,

  removeInitLoader: function() {
    Ember.$('#init-loader').remove();
  }.on('didInsertElement'),

  actions: {
    toggleSearchFilters: function() {
      this.toggleProperty('showFilters');
    },

    filterProducts: function() {
      this.set('showFilters', false);
      this.get('controller').send('filterProducts');
    }
  }
});
