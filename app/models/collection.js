import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  featureItems: DS.attr(),
  images: DS.attr('object'),
  inDrawer: DS.attr('boolean'),
  numItems: DS.attr('number'),
  numSold: DS.attr('number'),

  listImage: Ember.computed.alias('images.listImage.bigURL')
});