function Ball(x, y, angle, radius, speed) {

  this.position = createVector(x, y);

  this.angle = angle;
  this.radius = radius;

  this.speed = speed;

  this.color = randomColor();
}

/**
 * draws the Ball
 */
Ball.prototype.draw = function() {

  stroke(this.color);
  strokeWeight(20);

  push();

	/* draw relative to ball */
  translate(width / 2, height);
  point(this.position.x, this.position.y);

  pop();
};

/**
 * returns whether or not the Ball collides with bucket
 */
Ball.prototype.collidesWith = function(bucket) {

	/* calculate Ball's position */
  var x = this.position.x + width / 2;
  var y = this.position.y + height;

	/* calculate bucket's position */
  var xBound = bucket.x + BUCKET_SIZE;
  var yBound = bucket.y + BUCKET_SIZE;

  return !(x < bucket.x || x > xBound || y < bucket.y || y > yBound);
};

/**
 * returns whether the Ball is offscreen
 */
Ball.prototype.offScreen = function() {

	/* calculate Ball's position */
  var x = this.position.x + width / 2;
  var y = this.position.y + height;

  return (x < 0 || x > width || y < 0 || y > height);
};

/**
 * provides motion to the ball
 */
Ball.prototype.update = function() {

  this.radius += this.speed;

  this.position.x = this.radius * sin(this.angle);
  this.position.y = this.radius * cos(this.angle);
};

/**
 * returns a random color
 */
function randomColor() {

  return color(0, random(155) + 100, random(155) + 100);
}
