import Ember from 'ember';
import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  salePrice: DS.attr('number'),
  remove: DS.attr('boolean'),
  banned: DS.attr('boolean'),
  url: DS.attr('string'),
  actionsAllowed: DS.attr('object'),
  _categories: DS.attr('object'),

  // Relations
  //
  categories: DS.hasMany('categories')
});
