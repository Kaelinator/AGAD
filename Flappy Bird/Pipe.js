function Pipe(x, hole, w, c) {

  this.x = x;
  this.hole = hole;

  this.w = w;
  this.c = c;

  this.passed = false;
}

Pipe.prototype.update = function() {

  this.x -= SPEED;

};

Pipe.prototype.draw = function() {

  rectMode(CORNERS);
  stroke(40);
  strokeWeight(2);
  fill(this.c);
  rect(this.x, 0, this.x + 10, this.hole - (this.w / 2));
  rect(this.x, height, this.x + 10, this.hole + (this.w / 2));
};

Pipe.prototype.isPassed = function(x) {
  
  this.passed = this.x < x;
  return this.x < x;
};
