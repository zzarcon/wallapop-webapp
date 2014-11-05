import Ember from 'ember';
import AppStatus from "../app-status";

export default Ember.View.extend({
  elementId: "products",

  bindToScroll: function() {
    $("#application").on('scroll', this.scroll.bind(this));
  }.on('didInsertElement'),

  unbindFromScroll: function() {
    $("#application").off('scroll', this.scroll.bind(this));
  }.on('willDestroy'),

  scroll: function() {
    if (AppStatus.get('currentRouteName') !== "products.index") {
      return;
    }

    var $app = $("#application");

    if ($app.scrollTop() + $(window).height() === $app.prop('scrollHeight')) {
      this.get('controller').send('loadMore');
    }
  }
});
