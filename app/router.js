import Ember from 'ember';

var Router = Ember.Router.extend({
  location: WallapopWebappENV.locationType
});

Router.map(function() {
  this.resource('products', function() {
    this.route('show', {path: '/:productId'});
  });
  this.resource('collections', function() {
    this.route('show', {path: '/:collectionId'})
  });
  this.route('user', {path: 'user/:userId'});
});

export default Router;
