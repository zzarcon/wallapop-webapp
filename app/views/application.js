import Ember from "ember";

function Gesture(event) {
  this.events = [event];
  this.first  = event;
  this.length = 1;
  return this;
}

Gesture.prototype.push = function(evt) {
  this.events.push(evt);
  this.last = evt;
  this.length++;
};

Gesture.prototype.isSwipe = function(){
  if (this.first.touches[0].pageX < 20) {
    return true;
  }
  return false;
};

Gesture.prototype.pageX = function(){
  return this.last.touches[0].pageX;
};

// It returns the last 5 events (max) in the gesture, which are the ones that
// give you the information for knowing the current direction/speed.
Gesture.prototype._meaningfulEvents = function(){
  return this.events.slice(Math.max(this.length - 5, 0), this.length);
};

// In pixels/second. Negative values means movement to the left. Positive to the right.
Gesture.prototype.speedX = function(){
  var lastEvents = this._meaningfulEvents();
  var initX    = lastEvents[0].touches[0].pageX;
  var initTime = lastEvents[0].timeStamp;
  var lastX    = lastEvents[lastEvents.length - 1].touches[0].pageX;
  var lastTime = lastEvents[lastEvents.length - 1].timeStamp;

  return (lastX - initX) / (lastTime - initTime) * 1000;
};

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
    this.currentGesture = new Gesture(evt.originalEvent);
  },

  touchMove: function (evt) {
    this.currentGesture.push(evt.originalEvent);
    if (this.currentGesture.isSwipe() || this.menuVisible) {
      evt.originalEvent.preventDefault();
      this.animateMenu();
    }
  },

  touchEnd: function () {
    var x = this.currentGesture.pageX();
    var speed = this.currentGesture.speedX();
    if (speed < -500) {
      this.abortExpansion();
    } else if (speed > 500 || x > this.menuWidth / 2) {
      this.completeExpansion();
    } else if (x < this.menuWidth / 2) {
      this.abortExpansion();
    } else {
      this.completeExpansion();
    }
  },

  actions: {
    toggleMenu: function() {
      this.completeExpansion(0);
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
      requestAnimationFrame(function(){
        view.ticking = false;
        var translation = Math.min(- 320 + view.currentGesture.pageX(), 0);
        view.applicationMenu.style.transform = 'translateX(' + translation + 'px)';
      });
    }
    this.ticking = true;
  },

  completeExpansion: function() {
    var x     = this.currentGesture.pageX();
    var ticks = (this.menuWidth - x) / 16; // speed is 16px/frame
    var view  = this;
    function update(){
      x = Math.min(x + 16, view.menuWidth);
      var translation = Math.min(- 320 + x, 0);
      view.applicationMenu.style.transform = 'translateX(' + translation + 'px)';
      ticks--;
      if (ticks > 0){
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
    this.menuVisible = true;
  },

  abortExpansion: function(){
    var x     = this.currentGesture.pageX();
    var ticks = x / 16; // speed is 16px/frame
    var view  = this;
    function update(){
      ticks--;
      x = Math.max(x - 16, 0);
      var translation = Math.min(- 320 + x, 0);
      view.applicationMenu.style.transform = 'translateX(' + translation + 'px)';
      if (ticks > 0){
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
    this.menuVisible = false;
  }
});
