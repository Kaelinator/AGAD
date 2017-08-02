function Pipe(x, hole, width, color) {

  this.x = x;
  this.hole = hole; // middle point in gap

  this.width = width;
  this.color = color;

  this.passed = false; // whether the bird has passed it or not
}

/**
 * handle velocity
 */
Pipe.prototype.update = function() {

  this.x -= SPEED;
};

/**
 * draw the pipe
 */
Pipe.prototype.draw = function() {

  rectMode(CORNERS);
  stroke(40);
  strokeWeight(2);
  fill(this.color);
  rect(this.x, 0, this.x + 10, this.hole - (this.widthidth / 2));
  rect(this.x, height, this.x + 10, this.hole + (this.width / 2));
};

/**
 * check if bird has made it through
 */
Pipe.prototype.isPassed = function(x) {

  this.passed = this.x < x;
  return this.x < x;
};
