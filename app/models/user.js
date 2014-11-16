import Ember from 'ember';
import DS from 'ember-data';

var verificationValue = 30;
var equal = Ember.computed.equal;

export default DS.Model.extend({
  microName: DS.attr('string'),
  location: DS.attr(),
  statsUser: DS.attr(), // favoritesCount, receivedReviewsCount, selledCount, sellingCount, sendReviewsCount
  userId: DS.attr(),
  userVerification: DS.attr('object'),
  image: DS.attr(),

  mediumImage: Ember.computed.alias('image.mediumURL'),
  isEmailVerified: equal('userVerification.emailVerifiedStatus', verificationValue),
  isCellPhoneVerified: equal('userVerification.mobileVerifiedStatus', verificationValue),
  isFacebookVerified: equal('userVerification.facebookVerifiedStatus', verificationValue),
  isGooglePlusVerified: equal('userVerification.googlePlusVerifiedStatus', verificationValue),

  smallImage: function() {
    return this.get('image.smallURL') || "assets/images/default-profile-image.png";
  }.property('image.smallURL'),

  sellingCount : function() {
    return this.get('statsUser.sellingCount') || 0;
  }.property('statsUser.sellingCount'),

  selledCount : function() {
    return this.get('statsUser.selledCount') || 0;
  }.property('statsUser.selledCount'),

  receivedReviewsCount : function() {
    return this.get('statsUser.receivedReviewsCount') || 0;
  }.property('statsUser.receivedReviewsCount')
});