function Ball(x, y, a, r, s) {

  this.pos = createVector(x, y);

  this.a = a; // angle
  this.r = r; // radius

  this.s = s; // speed

  this.c = rCol();
}

Ball.prototype.draw = function() {

  stroke(this.c);
  strokeWeight(20);

  push();

  translate(width / 2, height);
  point(this.pos.x, this.pos.y);

  pop();
};

Ball.prototype.collidesWith = function(b) {

  var x = this.pos.x + width / 2;
  var y = this.pos.y + height;

  var xB = b.x + B_SIZE;
  var yB = b.y + B_SIZE;

  return !(x < b.x || x > xB || y < b.y || y > yB);
};

Ball.prototype.offScreen = function() {

  var x = this.pos.x + width / 2;
  var y = this.pos.y + height;

  return (x < 0 || x > width || y < 0 || y > height);
};

Ball.prototype.update = function() {

  this.r += this.s;

  this.pos.x = this.r * sin(this.a);
  this.pos.y = this.r * cos(this.a);
};

function rCol() {

  return color(0, random(155) + 100, random(155) + 100);
}
