import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  ud: DS.attr('string'),
  description: DS.attr('string'),
  mainImage: DS.attr('object'),
  salePrice: DS.attr('number'),
  categories: DS.attr('array'),
  image: DS.attr(),
  sellerUser: DS.attr(),

  smallImage: Ember.computed.alias('mainImage.smallURL'),
  mediumImage: Ember.computed.alias('mainImage.mediumURL')
});
