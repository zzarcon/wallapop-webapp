import Ember from 'ember';

export default Ember.View.extend({
  appController: Ember.computed.alias('controller.controllers.application'),

  currentCategoriesResume: function() {
    var categories = this.get('appController._selectedCategories');
    var categoriesLength = categories.get('length');
    var orderedByText = this.get('appController.orderBy') ? ' ordered by ' + this.get('appController.orderBy') : '';
    var categoriesText = !categoriesLength ? '' : categoriesLength === 1 ? 'from ' + categories.get('firstObject.name') : 'from ' + categoriesLength + ' categories';

    if (categoriesText || orderedByText) {
      return 'Displaying products ' + categoriesText + orderedByText;
    }
  }.property('appController._selectedCategories.@each', 'appController.orderBy')

});