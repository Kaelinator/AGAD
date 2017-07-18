function Block(x, yVel, s, c) {

  this.pos = createVector(x, -50);
  this.yVel = yVel;

  this.s = s; // size
  this.c = c; // color
}

Block.prototype.update = function() {

  this.pos.y += this.yVel;
};

Block.prototype.isClicked = function(x, y) {

  var xM = this.pos.x + this.s;
  var yM = this.pos.y + this.s;

  return !(x < this.pos.x || x > xM || y < this.pos.y || y > yM);
};

Block.prototype.draw = function() {

  stroke(255);
  strokeWeight(3);

  fill(this.c);

  rect(this.pos.x, this.pos.y, this.s, this.s);
};
