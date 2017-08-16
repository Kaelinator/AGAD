function Insect(x, type) {

  this.origin = x; // from what point to oscillate

  this.position = createVector(0, 0);
  this.serpentine = random(3) + 3; // serpentine distance

  this.type = type; // false = ant, true = bee
  this.squashed = false; // bug state

  this.radius = 50; // size of bug
}

/**
 * draws the insect based upon type
 */
Insect.prototype.draw = function() {

  stroke(255);
  strokeWeight(3);
  fill(this.type ? "#00FFFF" : "#FF4444");
  ellipse(this.position.x, this.position.y, this.radius);
};

/**
 * forces bugs along their path
 */
Insect.prototype.update = function() {

  this.position.y += speed;

  this.position.x = cos(this.position.y * (0.005 * this.serpentine) + this.serpentine * 10) * (width / this.serpentine) + this.origin;
}

/**
 * returns whether or not x & y are within the bug
 */
Insect.prototype.squashedBy = function(x, y) {

  var d = dist(x, y, this.position.x, this.position.y);

  return (d < this.radius);
};
