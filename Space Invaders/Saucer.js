function Saucer(x, y, size, shape, color, alien) {

  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);

  this.size = size;
  this.shape = shape;
  this.color = color;
  this.alien = alien; // enemy Saucer or not

  this.cooldown = 30; // intermittent between Lazer

  this.intact = true; // whether the Saucer is destroyed or not
	this.onScreen = true; // whether the Saucer is visible

  this.lazers = []; // on-screen lazers
}

/**
 * updates position, velocity, & acceleration
 * upates lazers
 */
Saucer.prototype.update = function(allShips) {

	/* handle movement */
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
	this.position.x = constrain(this.position.x, 0, width);

  this.acceleration = createVector(0, 0); // reset acceleration
  this.velocity.mult(0.7); // friction

	/* handle lazers */
  for (var i = this.lazers.length - 1; i >= 0; i--) {
		// loop through all lazers

    if (this.lazers[i].onScreen) {

			/* draw & update */
      this.lazers[i].update(allShips);
      this.lazers[i].draw();
    } else {

      this.lazers.splice(i, 1); // remove lazer from array
      continue;
    }
  }

	// update on-screen property
	this.onScreen = (this.position.y + this.size < height);

  this.cooldown++;
};

/**
 * draws the Saucer
 */
Saucer.prototype.draw = function() {

  stroke(255);
  strokeWeight(3);
  fill(this.color);

  var step = TWO_PI / this.shape; // distance between vertices

  beginShape();

  for (var i = PI; i < TWO_PI + PI; i += step) {
		// loop through vertices

		/*
		 * find vertices along an imaginary circle
		 * using polar coordinates
		 */
		var x = (sin(i) * this.size) + this.position.x;
		var y = (cos(i) * this.size) + this.position.y;
		vertex(x, y);
	}

  endShape(CLOSE);
};

/**
 * fires the Saucer's lazer
 */
Saucer.prototype.shoot = function() {

  if (this.cooldown > COOLDOWN) {
		// fire at will

		/* fire up lazer */
		var x = this.position.x;
		var	y = this.position.y;
		var trajectory = (this.alien) ? 3 : -3; // player aims up, alien aims down
		var lazer = new Lazer(x, y, trajectory, this.alien, randomColor());

    this.lazers.push(lazer);
    this.cooldown = 0; // reset cooldown
  }
};

/**
 * moves the Saucer
 */
Saucer.prototype.move = function(x, y) {

  this.acceleration = createVector(x, y);
};
