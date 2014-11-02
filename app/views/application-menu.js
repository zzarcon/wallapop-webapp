import Ember from "ember";

export default Ember.View.extend({
  templateName: "application-menu",
  classNames: ['application-menu'],
  classNameBindings: ['visibleWhen:visible'],
  showCategories: false,

  hide: function() {
    this.set('visibleWhen', false);
  },

  actions: {
    hideMenu: function() {
      this.hide();
    },

    toggleCategories: function() {
      this.toggleProperty('showCategories');
    },

    openCategory: function(id) {
      this.get('controller').transitionToRoute("products", {
        queryParams: {categories: id}
      });
      this.hide();
    }
  }
});