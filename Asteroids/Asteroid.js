function Asteroid(x, y, size, color) {

  this.position = createVector(x, y);

  this.size = size; // radius
  this.color = color;
}

/**
 * directs asteroid toward ship
 * checks collision with ship
 */
Asteroid.prototype.update = function() {

  var path = createVector(width / 2, height / 2).sub(this.position); // figure out path
  path.setMag(5 - log(this.size)); // change magnitude based upon size of asteroid

  this.position.add(path); // change position based upon path

	/* check collision with ship */
  var d = dist(this.position.x, this.position.y, width / 2, height / 2);

  if (d < this.size / 2) {
		// distance is greater than the raidus

    endGame();
  }
};

/**
 * draws asteroid
 */
Asteroid.prototype.draw = function() {

  fill(51);
  stroke(this.color);
  strokeWeight(5);

  ellipse(this.position.x, this.position.y, this.size);
};
