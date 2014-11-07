import Ember from "ember";

export default Ember.View.extend({
  templateName: "application-menu",
  classNames: ['application-menu'],
  classNameBindings: ['visibleWhen:visible'],
  showCategories: false,

  hide: function() {
    this.set('visibleWhen', false);
    this.set('showCategories', false);
  },

  actions: {
    hideMenu: function() {
      this.hide();
    },

    toggleCategories: function() {
      this.toggleProperty('showCategories');
    },

    openCollections: function() {
      this.get('controller').transitionToRoute('collections');
      this.hide();
    },

    openCategory: function(id) {
      this.get('controller').transitionToRoute("products", {
        queryParams: {categories: id}
      });
      this.hide();
    }
  }
});