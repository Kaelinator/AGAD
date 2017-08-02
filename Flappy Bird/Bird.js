function Bird(x, y, radius) {

  this.x = x;
  this.y = y;

  this.radius = radius;

  this.velocity = 0; // Y-velocity
}

/**
 * handles velocity & position
 */
Bird.prototype.update = function() {

  this.velocity += GRAVITY;

  this.y += this.velocity;
};

/**
 * changes velocity based upon f
 */
Bird.prototype.hop = function(f) {

  this.velocity = 0;
  this.velocity += f;
};

/**
 * returns whether this bird collides with pipe
 */
Bird.prototype.collidesWith = function(pipe) {

  if (pipe.x - this.x <= this.radius &&
		pipe.x - this.x >= -this.radius) { // if player is within X-range of pipe

    var upperHole = pipe.hole - pipe.w / 2;
    var lowerHole = pipe.hole + pipe.w / 2;

    return (this.y - this.radius < upperHole || this.y + this.radius > lowerHole);
  }

  return false;

};

/**
 * draws bird
 */
Bird.prototype.draw = function() {

  stroke(40);
  strokeWeight(3);
  fill(255);
  ellipse(this.x, this.y, this.radius * 2);
};
