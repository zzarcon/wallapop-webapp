import Ember from "ember";

export default Ember.View.extend({
  templateName: 'search-filter',
  classNames: ['search-filter'],
  classNameBindings: ['visibleWhen:visible'],
});