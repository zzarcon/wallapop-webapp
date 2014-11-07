import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'products/show',
  elementId: 'product',

  //FUCKING METAMORPHS
  sliderHTML: function() {
    var images = this.get('controller.images');
    if (Ember.isEmpty(images)) {
      return;
    }

    var html = '<ul class="bxslider">';
    images.forEach(function(img) {
      html += '<li><img class="product-img" src="' + img.bigURL + '"></li>';
    });
    return html + '</ul>';
  }.property(),

  setup: function() {
    $('.bxslider').bxSlider();
  }.on('didInsertElement')
});
