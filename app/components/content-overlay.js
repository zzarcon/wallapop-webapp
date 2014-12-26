import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['style'],
  style: function() {
    var opacity = this.get('opacity');
    var zIndex = opacity > 0 ? 99 : -1;
    return 'opacity: ' + opacity + '; z-index: ' + zIndex + ';';
  }.property('opacity')
});
