import Ember from "ember";
/**
 * Products filter view
 */
export default Ember.View.extend({
  templateName: 'search-filter',
  classNames: ['search-filter'],
  classNameBindings: ['visibleWhen:visible'],
  selectedCategories: Ember.computed.alias('controller._selectedCategories'),
  priceMin: Ember.computed.alias('controller.priceMin'),
  priceMax: Ember.computed.alias('controller.priceMax'),
  orderBy: Ember.computed.alias('controller.orderBy'),
  orderType: Ember.computed.alias('controller.orderType'),

  categoriesTitle: function() {
    var categories = this.get('selectedCategories');
    var text = categories.get('length') === 1 ? categories.get('firstObject.name') : categories.get('length');

    return 'Categories - ' + (text || '');
  }.property('selectedCategories.@each'),

  distanceTitle: function() {
    return ["Distance", this.get('controller.selectedDistance.title')].join(" - ");
  }.property('controller.selectedDistance'),

  pricesTitle: function() {
    var priceMin = this.get('priceMin') ? 'From ' + this.get('priceMin') : null;
    var priceMax = this.get('priceMax') ? ' to ' + this.get('priceMax') : null;

    var prices = [priceMin, priceMax].compact();

    var pricesToShow = prices.length > 0 ? prices.join("") : null;

    return ["Price", pricesToShow].compact().join(" - ");
  }.property('priceMin', 'priceMax'),

  orderTitle: function() {
    return ['Order by', this.get('controller.order.title')].compact().join(" - ");
  }.property('controller.order')
});
