import Ember from 'ember';

export default Ember.View.extend({
  elementId: "products",

  bindToScroll: function() {
    $("#application").on('scroll', this.scroll.bind(this));
  }.on('didInsertElement'),

  unbindFromScroll: function() {
    $("#application").off('scroll', this.scroll.bind(this));
  }.on('willDestroy'),

  setupMasonry: function() {
    // this.$('#container').masonry({
    //   columnWidth: 60,
    //   itemSelector: '.item',
    //   gutter: 10
    // });
  }.on('didInsertElement'),

  scroll: function() {
    var $app = $("#application");

    if($app.scrollTop() + $(window).height() == $app.prop('scrollHeight')) {
      this.get('controller').send('loadMore');
    }
  }
});
