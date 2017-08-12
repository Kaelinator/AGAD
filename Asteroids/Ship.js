function Ship(fillColor, strokeColor) {

  this.angle = 0; // theta
  this.angleVelocity = 0; // theta velocity

  this.fillColor = fillColor; // body color
  this.strokeColor = strokeColor; // perimeter color
}

/**
 * changes angle by angleVelocity
 */
Ship.prototype.update = function() {

  this.angle += this.angleVelocity;
  this.angleVelocity *= 0.7;
};

/**
 * shoots a lazer
 * pushes it to bullets array
 */
Ship.prototype.shoot = function(bullets) {

  bullets.push(new Lazer(-this.angle + PI, 0, 5));
};

/**
 * changes the angleVelocity based upon acceleration
 */
Ship.prototype.rotate = function(acceleration) {

  this.angleVelocity += acceleration;
};

/**
 * draws the ship
 */
Ship.prototype.draw = function() {

  fill(this.fillColor);
  strokeWeight(2);
  stroke(this.strokeColor);

  push(); // save translations & rotations

  translate(width / 2, height / 2); // draw relative to the center
  rotate(this.angle); // draw relative to the angle of the ship

	/* draw triangle */
  beginShape();
  vertex(0, -30);
  vertex(15, 15);
  vertex(-15, 15);
  endShape(CLOSE);

  pop(); // revert translations & rotations
};
