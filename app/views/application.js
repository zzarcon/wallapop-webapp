import Ember from "ember";

export default Ember.View.extend({
  elementId: 'application',
  showMenu: false,
  showFilters: false,

  removeInitLoader: function() {
    Ember.$('#init-loader').remove();
  }.on('didInsertElement'),

  touchStart: function(){
    console.log('touchStart');
  },

  touchMove: function (evt) {
    console.log('touchMove', evt);
  },

  touchEnd: function () {
    console.log('touch end!');
  },

  touchCancel: function () {
    console.log('touchCancel');
  },

  actions: {
    toggleMenu: function() {
      this.toggleProperty('showMenu');
    },

    toggleSearchFilters: function() {
      this.toggleProperty('showFilters');
    },

    filterProducts: function() {
      this.set('showFilters', false);
      this.get('controller').send('filterProducts');
    }
  }
});
