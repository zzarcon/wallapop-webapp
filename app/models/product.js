import Ember from 'ember';

export default Ember.Object.extend({
  bigImage: Ember.computed.alias('mainImage.bigURL'),
  smallImage: Ember.computed.alias('mainImage.smallURL')
});