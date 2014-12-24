import Ember from 'ember';

function updadateStyle(){
  var visibility = this.get('visibility');
  this.element.style.opacity = visibility;
  this.element.style['z-index'] = visibility > 0 ? 99 : -1;
}

export default Ember.Component.extend({
  updateStyle: function() {
    Ember.run.scheduleOnce('afterRender', this, updadateStyle);
  }.observes('visibility')
});
