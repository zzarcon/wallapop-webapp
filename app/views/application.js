import Ember from "ember";

export default Ember.View.extend({
  elementId: 'application',
  showMenu: false,
  showFilters: false,

  removeInitLoader: function() {
    Ember.$('#init-loader').remove();
  }.on('didInsertElement'),

  measureViewport: function () {
    this.width = this.$().width();
    this.applicationMenu = this.$('#application-menu')[0];
    this.menuContent     = this.$('#application-menu .menu-content')[0];
  }.on('didInsertElement'),

  touchStart: function(evt){
    var x = evt.originalEvent.touches[0].pageX;
    if (x < 5) {
      console.log('movement started near the left side of the screen');
    } else if (this.width - x < 5) {
      console.log('movement started near the right side of the screen');
    } else {
      return;
    }
    this.startX = x;
  },

  touchMove: function (evt) {
    var x = evt.originalEvent.touches[0].pageX;
    if (this.startX < 10) {
      this._displaceLeftMenuTo(x);
    } else if (this.width - this.startX < 10){
      this._displaceRightMenuTo(x);
    }
  },

  touchEnd: function () {
    if (this.translation < 0 ){
      this._collapseLeftMenu();
    }
    this.startX = null;
  },

  touchCancel: function () {
    console.log('touchCancel');
    this._collapseLeftMenu();
    this.startX = null;
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
  },

  // private

  _displaceLeftMenuTo: function (x) {
    var opacity = x / 320;
    this.translation = Math.min(- 320 + x, 0);

    this.applicationMenu.style.opacity = opacity;
    this.menuContent.style.transform = 'translateX(' + this.translation + 'px)';
  },

  _displaceRightMenuTo: function (x) {
    console.log('displace right menu to: ', x);
  },

  _collapseLeftMenu: function(){
    this._displaceLeftMenuTo(0); // TODO: Animate collapse
  }
});
