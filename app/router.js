import Ember from 'ember';

var Router = Ember.Router.extend({
  location: WallapopWebappENV.locationType
});

Router.map(function() {
  this.route('products');
  this.route('about');
});

export default Router;
