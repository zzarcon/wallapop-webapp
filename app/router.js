import Ember from 'ember';

var Router = Ember.Router.extend({
  location: WallapopWebappENV.locationType
});

Router.map(function() {
  this.resource('products', function() {
    this.route('show', {path: '/:productId'});
  });
  this.route('about');
});

export default Router;
