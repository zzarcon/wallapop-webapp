import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  microName: DS.attr('string'),
  location: DS.attr(),
  statsUser: DS.attr(),
  userId: DS.attr(),
  userVerification: DS.attr('object'),
  image: DS.attr(),
  smallImage: Ember.computed.alias('image.smallURL'),
  mediumImage: Ember.computed.alias('image.mediumURL')
});
