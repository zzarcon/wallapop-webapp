import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  microName: DS.attr('string'),
  location: DS.attr(),
  statsUser: DS.attr(), // favoritesCount, receivedReviewsCount, selledCount, sellingCount, sendReviewsCount
  userId: DS.attr(),
  userVerification: DS.attr('object'),
  image: DS.attr(),
  smallImage: Ember.computed.alias('image.smallURL'),
  mediumImage: Ember.computed.alias('image.mediumURL'),
  defaultStatValue: 0,
  sellingCount : function() {
    return this.get('statsUser.sellingCount') || 0;
  }.property('statsUser.sellingCount'),
  selledCount : function() {
    return this.get('statsUser.selledCount') || 0;
  }.property('statsUser.selledCount'),
  receivedReviewsCount : function() {
    return this.get('statsUser.receivedReviewsCount') || 0;
  }.property('statsUser.receivedReviewsCount'),
  isEmailVerified: Ember.computed.equal('userVerification.emailVerifiedStatus', 30),
  isCellPhoneVerified: Ember.computed.equal('userVerification.mobileVerifiedStatus', 30),
  isFacebookVerified: Ember.computed.equal('userVerification.facebookVerifiedStatus', 30),
  isGooglePlusVerified: Ember.computed.equal('userVerification.googlePlusVerifiedStatus', 30)
});