function Lazer(angle, radius, speed) {

	/* cartesian coordinates */
  this.x = null;
  this.y = null;

	/* polar coordinates */
  this.angle = angle; // theta
  this.radius = radius; // size

  this.speed = speed; // speed

  this.onScreen = true;
}

/**
 * calculates new position
 * converts that position to cartesian coordinates
 * updates on-screen state
 */
Lazer.prototype.update = function() {

	/* change position */
  this.radius += this.speed;

	/* convert to cartesian */
  this.x = this.radius * sin(this.angle);
  this.y = this.radius * cos(this.angle);

	/* update on-screen state */
  this.onScreen = (this.radius < width);
};

/**
 * returns whether the Lazer hits asteroid
 */
Lazer.prototype.penetrates = function(asteroid) {

  var d = dist(this.x + width / 2, this.y + height / 2, asteroid.position.x, asteroid.position.y);

  return (d < asteroid.size / 2);
};

/**
 * draws the Lazer
 */
Lazer.prototype.draw = function() {

  stroke("#009900");
  strokeWeight(3);

  push(); // save translations

  translate(width / 2, height / 2);
  point(this.x, this.y);

  pop(); // revert translations
};
