import DS from "ember-data";

export default DS.Model.extend({
  title: DS.attr('string'),
  orderType: DS.attr('string'),
  orderBy: DS.attr('string')
});