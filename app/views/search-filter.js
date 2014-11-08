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

  pricesTitle: function() {
    var priceMin = this.get('priceMin') ? ' From ' + this.get('priceMin') : '';
    var priceMax = this.get('priceMax') ? ' to ' + this.get('priceMax') : '';

    return "Price -" + priceMin + priceMax;
  }.property('priceMin', 'priceMax'),

  orderTitle: function() {
    var orderBy = this.get('orderBy') ? this.get('orderBy') : '';
    var orderType = this.get('orderType') ? ' ' + this.get('orderType') : '';

    return 'Order by - ' + orderBy + orderType;
  }.property('orderBy')
});