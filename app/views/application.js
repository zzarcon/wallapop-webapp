import Ember from "ember";

export default Ember.View.extend({
  elementId: 'application',
  showMenu: false,
  showFilters: false,

  removeInitLoader: function() {
    $('#init-loader').remove();
  }.on('didInsertElement'),

  actions: {
    toggleMenu: function() {
      // debugger;
      this.toggleProperty('showMenu');
    },

    toggleSearchFilters: function() {
      // debugger;
      this.toggleProperty('showFilters');
    },

    filterProducts: function() {
      this.set('showFilters', false);
      this.get('controller').send('filterProducts');
    }
  }
});
