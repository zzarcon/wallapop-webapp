import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  selected: DS.attr('boolean', {defaultValue: false})
});