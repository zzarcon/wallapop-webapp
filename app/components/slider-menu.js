import Ember from 'ember';
import Gesture from "wallapop-webapp/utils/gesture";

export default Ember.Component.extend({
  position: 'left',
  progress: 0,
  minSpeed: 0.04,

  // Initializers
  setTouchEventListeners: function() {
    this.width = this.element.offsetWidth;
    this.progressObserver();
    var applicationNode = document.querySelector('#application');
    var self = this;

    function handleTouchMove(evt){
      evt.preventDefault();
      self.gesture.push(evt);
      Ember.run.scheduleOnce('actions', self, self.updateProgress);
    }

    function handleTouchEnd(){
      applicationNode.removeEventListener('touchmove', handleTouchMove, true);
      applicationNode.removeEventListener('touchend', handleTouchEnd, true);
      Ember.run.scheduleOnce('actions', self, self.completeExpansion);
    }

    function handleTouchStart(evt){
      var gesture = new Gesture(evt);
      if (self.mustFollow(gesture)) {
        self.gesture = gesture;
        self.menuOffset = self.get('expanded') ? self.width : 0;
        applicationNode.addEventListener('touchmove', handleTouchMove, true);
        applicationNode.addEventListener('touchend', handleTouchEnd, true);
      }
    }

    applicationNode.addEventListener('touchstart', handleTouchStart, true);
  }.on('didInsertElement'),

  // Computed properties
  expanded: function(){
    return this.get('progress') >= 1;
  }.property('progress'),

  collapsed: function(){
    return this.get('progress') <= 0;
  }.property('progress'),

  // Private methods
  mustFollow: function(gesture){
    return this.get('expanded') || this.position === 'left' && gesture.initPageX() < 20;
  },

  updateProgress: function(){
    var borderOffset = Math.max(0, this.menuOffset - this.gesture.initPageX());
    var progress = Math.min((this.gesture.pageX() + borderOffset) / this.width, 1);
    this.set('progress', progress);
  },

  completeExpansion: function(){
    if (this.get('collapsed') || this.get('expanded')) {
      return;
    }
    var progress = this.get('progress');
    var gestureSpeed = this.gesture.speedX();
    var newProgress;

    if (gestureSpeed < -500 || gestureSpeed <= 500 && progress < 0.5) {
      newProgress = Math.max(progress - this.minSpeed, 0);
      this.set('progress', newProgress);
    } else {
      newProgress = Math.min(progress + this.minSpeed, 1);
      this.set('progress', newProgress);
    }
    if (newProgress > 0 && newProgress < 1) {
      Ember.run.next(this, this.completeExpansion);
    }
  },

  progressObserver: function(){
    var translate = (this.get('progress') - 1) * this.width;
    this.element.style.transform  = 'translateX(' + translate + 'px)';
  }.observes('progress')
});
