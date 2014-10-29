import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'products/show',
  elementId: 'product',

  //FUCKING METAMORPHS
  sliderHTML: function() {
    var html = '<ul class="bxslider">';
    this.get('controller.images').forEach(function(img) {
      html += '<li><img class="product-img" src="' + img.bigURL + '"></li>';
      // html += '<li><div class="product-img" style="background-image: url(' + img.bigURL + ');"></div></li>';
    });
    return html + '</ul>';
  }.property(),

  setup: function() {
    $('.bxslider').bxSlider();
  }.on('didInsertElement')
});