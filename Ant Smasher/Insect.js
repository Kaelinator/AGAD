function Insect(x, type) {

  this.origin = x;

  this.pos = createVector(0, 0);
  this.serp = random(3) + 3; // serpentine distance

  this.type = type; // false = ant, true = bee
  this.squashed = false;

  this.r = 50;
}

Insect.prototype.draw = function() {

  stroke(255);
  strokeWeight(3);
  fill(this.type ? "#00FFFF" : "#FF4444");
  ellipse(this.pos.x, this.pos.y, this.r);
};

Insect.prototype.update = function() {

  this.pos.y += speed;

  this.pos.x = cos(this.pos.y * (0.005 * this.serp) + this.serp * 10) * (width / this.serp) + this.origin;
}

Insect.prototype.squashedBy = function(x, y) {

  var d = dist(x, y, this.pos.x, this.pos.y);

  return (d < this.r);
};
