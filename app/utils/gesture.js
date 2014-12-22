// Constructor.
//
// A gesture is an abstraction over a user's touch iteraction in time.
// It contains a collection of touch events and some utility methods to analyze
// the movement, its direction, speed and other parameters.
//
function Gesture(event) {
  this.events = [event];
  this.first  = event;
  this.last   = event;
  this.length = 1;
  return this;
}

Gesture.prototype.push = function(evt) {
  this.events.push(evt);
  this.last = evt;
  this.length++;
};

Gesture.prototype.isSwipe = function(){
  if (this.first.touches[0].pageX < 20) {
    return true;
  }
  return false;
};

Gesture.prototype.pageX = function(){
  return this.last.touches[0].pageX;
};

Gesture.prototype.initPageX = function(){
  return this.first.touches[0].pageX;
};

// It returns the last 5 events (max) in the gesture, which are the ones that
// give you the information for knowing the current direction/speed.
Gesture.prototype._meaningfulEvents = function(){
  return this.events.slice(Math.max(this.length - 5, 0), this.length);
};

// In pixels/second. Negative values means movement to the left. Positive to the right.
Gesture.prototype.speedX = function(){
  var lastEvents = this._meaningfulEvents();
  var initX    = lastEvents[0].touches[0].pageX;
  var initTime = lastEvents[0].timeStamp;
  var lastX    = lastEvents[lastEvents.length - 1].touches[0].pageX;
  var lastTime = lastEvents[lastEvents.length - 1].timeStamp;

  return (lastX - initX) / (lastTime - initTime) * 1000;
};

export default Gesture;
