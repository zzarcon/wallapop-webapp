import Ember from "ember";

export default Ember.View.extend({
  elementId: 'application',
  showMenu: false,
  showFilters: false,

  removeInitLoader: function() {
    Ember.$('#init-loader').remove();
  }.on('didInsertElement'),

  measureViewport: function () {
    this.viewportWidth   = this.element.offsetWidth;
    this.applicationMenu = this.element.querySelector('#application-menu');
    this.menuWidth       = this.applicationMenu.offsetWidth;
  }.on('didInsertElement'),

  touchStart: function(evt){
    var x = evt.originalEvent.touches[0].pageX;
    if (x < 20 || (this.currentX && this.currentX > 0)) {
      this.startX = x;
    }
  },

  touchMove: function (evt) {
    if (this.startX){
      evt.preventDefault();
      this.currentX = evt.originalEvent.touches[0].pageX;
      this.requestTick();
    }
  },

  touchEnd: function () {
    if (this.startX) {
      if (this.currentX > this.menuWidth / 2) {
        this.completeExpansion(this.currentX);
      } else {
        this.abortExpansion(this.currentX);
        this.currentX = null;
      }
      this.startX = null;
    }
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
  requestTick: function(){
    if (!this.ticking) {
      var view = this;
      requestAnimationFrame(function(){
        view.ticking = false;
        var translation = Math.min(- 320 + view.currentX, 0);
        view.applicationMenu.style.transform = 'translateX(' + translation + 'px)';
      });
    }
    this.ticking = true;
  },

  completeExpansion: function(currentX){
    var ticks = (this.menuWidth - currentX) / 16; // speed is 16px/frame
    var view  = this;
    function update(){
      currentX = Math.min(currentX + 16, view.menuWidth)
      var translation = Math.min(- 320 + currentX, 0);
      view.applicationMenu.style.transform = 'translateX(' + translation + 'px)';
      ticks--;
      if (ticks > 0){
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  },

  abortExpansion: function(currentX){
    var ticks = currentX / 16; // speed is 16px/frame
    var view  = this;
    function update(){
      ticks--;
      currentX = Math.max(currentX - 16, 0)
      var translation = Math.min(- 320 + currentX, 0);
      view.applicationMenu.style.transform = 'translateX(' + translation + 'px)';
      if (ticks > 0){
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }
});
