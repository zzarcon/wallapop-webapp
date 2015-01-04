import Ember from "ember";

export default Ember.View.extend({
  templateName: "application-menu",
  classNames: ['application-menu'],
  showCategories: false,

  hide: function() {
    this.set('showCategories', false);
    this.get('context').send('hideMenu');
  },

  actions: {
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
