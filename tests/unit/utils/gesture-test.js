import Gesture from 'wallapop-webapp/utils/gesture';

var firstEvent, secondEvent, thirdEvent;

module('Gesture', {
  setup: function(){
    firstEvent  = { touches: [{pageX: 100, pageY: 250}], timeStamp: 1419263004600 };
    secondEvent = { touches: [{pageX: 110, pageY: 270}], timeStamp: 1419263004610 };
    thirdEvent  = { touches: [{pageX: 120, pageY: 290}], timeStamp: 1419263004620 };
  }
});

test('The `length` property returns the number of captured events', function() {
  var gesture = new Gesture('event');
  gesture.push('other event');
  equal(gesture.length, 2, 'This gesture contains 2 events');
});

test('The `last` property contains the last captured event', function() {
  var gesture = new Gesture('event');
  gesture.push('other event');
  equal(gesture.last, 'other event');
});

test('The `first` property contains the first captured event', function() {
  var gesture = new Gesture('event');
  gesture.push('other event');
  equal(gesture.first, 'event');
});

test('The `events` property contains all the captured events', function() {
  var gesture = new Gesture('event');
  gesture.push('other event');
  deepEqual(gesture.events, ['event', 'other event']);
});

test('The `pageX` method returns the pageX of the last event', function() {
  var gesture = new Gesture(firstEvent);
  gesture.push(secondEvent);
  equal(gesture.pageX(), 110);
});

test('The `initPageX` method returns the pageX of the first event', function() {
  var gesture = new Gesture(firstEvent);
  gesture.push(secondEvent);
  equal(gesture.initPageX(), 100);
});

test('The `speedX` method returns the speed of the gesture in the X axis', function() {
  var gesture = new Gesture(firstEvent);
  gesture.push(secondEvent);
  gesture.push(thirdEvent);
  equal(gesture.speedX(), 1000);
});
