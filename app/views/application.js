import Ember from "ember";
import Gesture from "wallapop-webapp/utils/gesture";

export default Ember.View.extend({
  elementId: 'application',
  menuVisible: false,
  showFilters: false,

  removeInitLoader: function() {
    Ember.$('#init-loader').remove();
  }.on('didInsertElement'),

  measureViewport: function () {
    this.viewportWidth      = this.element.offsetWidth;
    this.applicationMenu    = this.element.querySelector('#application-menu');
    this.applicationOverlay = this.element.querySelector('#application-overlay');
    this.menuWidth          = this.applicationMenu.offsetWidth;
  }.on('didInsertElement'),

  touchStart: function(evt){
    this.gesture = new Gesture(evt.originalEvent);
  },

  touchMove: function (evt) {
    this.gesture.push(evt.originalEvent);
    if (this.gesture.initPageX() < 20 || this.get('menuVisible')) {
      evt.originalEvent.preventDefault();
      this.animateMenu();
    }
  },

  touchEnd: function () {
    if (!this.gesture.isSwipe() || this.gesture.initPageX() >= 20 && !this.get('menuVisible')) {
      return;
    }
    var x = this.gesture.pageX();
    var speed = this.gesture.speedX();
    if (speed < -500) {
      this.collapseMenu();
    } else if (speed > 500 || x > this.menuWidth / 2) {
      this.expandMenu();
    } else if (x < this.menuWidth / 2) {
      this.collapseMenu();
    } else {
      this.expandMenu();
    }
  },

  actions: {
    toggleMenu: function() {
      if (this.get('menuVisible')) {
        this.collapseMenu(this.menuWidth);
      } else {
        this.expandMenu(0);
      }
    },

    toggleSearchFilters: function() {
      this.toggleProperty('showFilters');
    },

    filterProducts: function() {
      this.set('showFilters', false);
      this.get('controller').send('filterProducts');
    }
  },

  // Private
  animateMenu: function(){
    if (!this.ticking) {
      var view = this;
      var menuOffset = this.get('menuVisible') ? this.menuWidth : 0;
      var borderOffset = Math.max(0, menuOffset - this.gesture.initPageX());
      requestAnimationFrame(function(){
        view.ticking = false;
        var translation = Math.min(- 320 + view.gesture.pageX() + borderOffset, 0);
        var opacity     = translation / view.menuWidth + 1;
        view.applicationMenu.style.transform  = 'translateX(' + translation + 'px)';
        view.applicationOverlay.style.opacity = opacity;
      });
    }
    this.ticking = true;
  },

  expandMenu: function(x = this.gesture.pageX()) {
    var ticks = (this.menuWidth - x) / 16; // speed is 16px/frame
    var view  = this;
    function update(){
      x = Math.min(x + 16, view.menuWidth);
      var translation = Math.min(- view.menuWidth + x, 0);
      var opacity     = translation / view.menuWidth + 1;
      view.applicationMenu.style.transform  = 'translateX(' + translation + 'px)';
      view.applicationOverlay.style.opacity = opacity;
      ticks--;
      if (ticks > 0){
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
    this.set('menuVisible', true);
  },

  collapseMenu: function(x = this.gesture.pageX()){
    var ticks = x / 16; // speed is 16px/frame
    var view  = this;
    function update(){
      ticks--;
      x = Math.max(x - 16, 0);
      var translation = Math.min(- view.menuWidth + x, 0);
      var opacity     = translation / view.menuWidth + 1;
      view.applicationMenu.style.transform  = 'translateX(' + translation + 'px)';
      view.applicationOverlay.style.opacity = opacity;
      if (ticks > 0){
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
    this.set('menuVisible', false);
  }
});
