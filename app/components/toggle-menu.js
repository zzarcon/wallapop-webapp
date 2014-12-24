import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['toggle-menu'],

  topBarStyle: function() {
    var progress = this.get('progress');
    var rotation = progress * 45;
    var translateX = progress * 5
    var translateY = translateX;
    return 'transform: rotate(' + rotation + 'deg) translate(' + translateX + 'px, ' + translateY + 'px)';
  }.property('progress'),

  middleBarStyle: function() {
    return 'opacity: ' + (1 - this.get('progress'));
  }.property('progress'),

  bottomBarStyle: function() {
    var progress = this.get('progress');
    var rotation = progress * -45;
    var translateX = progress * 7;
    var translateY = progress * -8;
    return 'transform: rotate(' + rotation + 'deg) translate(' + translateX + 'px, ' + translateY + 'px)';
  }.property('progress'),

  click: function(){
    var progress = this.get('progress');
    var delta = progress === 0 ? 0.05 : -0.05;
    this.animateProgress(delta);
  },

  animateProgress: function(delta) {
    var progress = this.get('progress');
    progress = Math.min(Math.max(progress + delta, 0), 1)
    this.set('progress', progress);
    if (progress !== 0 && progress !== 1) {
      Ember.run.next(this, 'animateProgress', delta);
    }
  }
});
