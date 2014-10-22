import Ember from 'ember';

export default Ember.View.extend({
  elementId: "products",

  bindToScroll: function() {
    $(window).on('scroll', this.scroll.bind(this));
  }.on('didInsertElement'),

  unbindFromScroll: function() {
    $(window).off('scroll', this.scroll.bind(this));
  }.on('willDestroy'),

  scroll: function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
      this.get('controller').send('loadMore');
    }
  }
});
