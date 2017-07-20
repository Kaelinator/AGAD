function Ball(x, y, s, c, v) {

  this.pos = createVector(x, y);
  this.vel = createVector(0, v);

  this.s = s; // size
  this.c = c; // color

  this.onScreen = true;
}

Ball.prototype.draw = function() {

  stroke(255);
  strokeWeight(3);
  fill(this.c);

  ellipse(this.pos.x, this.pos.y, this.s);
};

Ball.prototype.update = function() {

  this.pos.y += this.vel.y;

  this.onScreen = (this.pos.y < height);
};

Ball.prototype.caughtBy = function(b) {

  var x1 = b.x - HALF_B_SIZE;
  var x2 = b.x + HALF_B_SIZE;

  var y2 = b.y + HALF_B_SIZE;

  return !(this.pos.x < x1 || this.pos.x > x2 ||
    this.pos.y < b.y || this.pos.y > y2);
};
