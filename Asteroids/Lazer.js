function Lazer(a, r, s) {

  this.x = null;
  this.y = null;

  this.a = a; // angle
  this.r = r; // radius

  this.s = s; // speed

  this.onScreen = true;
}

Lazer.prototype.update = function() {

  this.r += this.s;

  this.x = this.r * sin(this.a);
  this.y = this.r * cos(this.a);

  this.onScreen = (this.r < width);
};

Lazer.prototype.penetrates = function(asteroid) {

  var d = dist(this.x + width / 2, this.y + height / 2, asteroid.pos.x, asteroid.pos.y);

  return (d < asteroid.s / 2);
};

Lazer.prototype.draw = function() {

  stroke("#009900");
  strokeWeight(3);

  push();

  translate(width / 2, height / 2);
  point(this.x, this.y);

  pop();
};
