function Rocket(x, y, s) {

  this.x = x;
  this.y = y;

  this.xV = null;
  this.speed = 5;

  this.size = s;
}

Rocket.prototype.update = function() {

  this.xV *= 0.7;
  this.x += this.xV;
};

Rocket.prototype.collidesWith = function(w) {

  var rL = this.x - this.size / 2; // rocket's left bound
  var rR = this.x + this.size / 2; // rocket's right bound

  return (rL < w.leftBound() || rR > w.rightBound());
};

Rocket.prototype.draw = function() {

  fill(255);
  stroke("#00FFEE");
  strokeWeight(3);

  var halfSize = this.size / 2;
  var h = Math.sqrt(Math.pow(this.size, 2) - Math.pow(halfSize, 2));

  beginShape();
  vertex(this.x, this.y);
  vertex(this.x - halfSize, this.y + h);
  vertex(this.x + halfSize, this.y + h);
  endShape(CLOSE);
};

Rocket.prototype.move = function(m) {

  this.xV += (m * this.speed);
};
