import Ember from "ember";

export default Ember.View.extend({
  elementId: 'application',
  showMenu: false,
  showFilters: false,

  actions: {
    toggleMenu: function() {
      // debugger;
      this.toggleProperty('showMenu');
    },

    toggleSearchFilters: function() {
      // debugger;
      this.toggleProperty('showFilters');
    }
  }
});