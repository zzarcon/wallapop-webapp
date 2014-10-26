import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  mainImage: DS.attr('array'),
  salePrice: DS.attr('number')
});
