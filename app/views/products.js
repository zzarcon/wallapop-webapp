import Ember from 'ember';
import AppStatus from "../app-status";

export default Ember.View.extend({
  elementId: "products",

  bindToScroll: function() {
    Ember.$("#application").on('scroll', this.scroll.bind(this));
  }.on('didInsertElement'),

  unbindFromScroll: function() {
    Ember.$("#application").off('scroll', this.scroll.bind(this));
  }.on('willDestroy'),

  scroll: function() {
    if (AppStatus.get('currentRouteName') !== "products.index") {
      return;
    }

    var $app = Ember.$("#application");

    if ($app.scrollTop() + Ember.$(window).height() === $app.prop('scrollHeight')) {
      this.get('controller').send('loadMore');
    }
  }
});
