function Lazer(x, y, velocity, alien, color) {

  this.position = createVector(x, y);
  this.velocity = velocity;

  this.color = color; // color
	this.alien = alien;  // enemy Lazer or not

  this.onScreen = true; // whether the Lazer is visible
}

/**
 * handles movement
 * handles bullseye
 * returns whether the Lazer is still hot
 */
Lazer.prototype.update = function(ships) {

  this.position.y += this.velocity;

	for (var j = 0; j < ships.length; j++) {
		// loop through all ships in fleet


		if (this.hits(ships[j]) && this.alien != ships[j].alien) {
			// bullseye!

			/* destroy Saucer */
			ships[j].intact = false;
			this.onScreen = false;
			return;
		}
	}

  this.onScreen = !(this.position.y < 0 || this.position.y > height);
};

/**
 * draws the Lazer
 */
Lazer.prototype.draw = function() {

  stroke(this.color);
  strokeWeight(5);

  point(this.position.x, this.position.y);
};

/**
 * returns whether the Lazer hits passed Saucer
 */
Lazer.prototype.hits = function(saucer) {

  var d = dist(this.position.x, this.position.y, saucer.position.x, saucer.position.y);

  return (d < saucer.size);
};
