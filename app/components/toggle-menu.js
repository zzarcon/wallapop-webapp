import Ember from 'ember';

export default Ember.Component.extend({
  defaultSpeed: 0.06,
  classNames: ['toggle-menu'],

  topBarStyle: function() {
    var progress = this.get('progress');
    var rotation = progress * 45;
    var translateX = progress * 5
    var translateY = translateX;
    return 'transform: rotate(' + rotation + 'deg) translate(' + translateX + 'px, ' + translateY + 'px);' +
      '-webkit-transform: rotate(' + rotation + 'deg) translate(' + translateX + 'px, ' + translateY + 'px)';;
  }.property('progress'),

  middleBarStyle: function() {
    return 'opacity: ' + (1 - this.get('progress'));
  }.property('progress'),

  bottomBarStyle: function() {
    var progress = this.get('progress');
    var rotation = progress * -45;
    var translateX = progress * 7;
    var translateY = progress * -8;
    return 'transform: rotate(' + rotation + 'deg) translate(' + translateX + 'px, ' + translateY + 'px);',
      '-webkit-transform: rotate(' + rotation + 'deg) translate(' + translateX + 'px, ' + translateY + 'px);';
  }.property('progress'),

  click: function(){
    var progress = this.get('progress');
    this.delta = progress === 0 ? this.defaultSpeed : -this.defaultSpeed;
    requestAnimationFrame(this.animateProgress.bind(this));
  },

  animateProgress: function() {
    var progress = this.get('progress');
    progress = Math.min(Math.max(progress + this.delta, 0), 1)
    this.set('progress', progress);
    if (progress !== 0 && progress !== 1) {
      requestAnimationFrame(this.animateProgress.bind(this));
    }
  }
});
