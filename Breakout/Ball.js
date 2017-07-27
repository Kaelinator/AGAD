function Ball(x, y, xVelocity, yVelocity, radius) {

	this.position = createVector(x, y);
	this.velocity = createVector(xVelocity, yVelocity);

	this.radius = radius;
}

Ball.prototype.draw = function() {

  fill("#999");
  ellipse(this.position.x, this.position.y, this.radius * 2);
};

Ball.prototype.update = function(blocks, staticBlocks, paddle) {

	this.position.add(this.velocity); // move

	/* check on-screen block collisions */
	var rebound = null; // store data returned
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].intact) { // if it's not on-screen

			rebound = this.collidesWith(blocks[i]);

      if (rebound.collision) {

        blocks[i].intact = false; // remove from screen
				score++;
        break; // no more looping
      }
    }
	}

	/* check paddle collision */
	if (rebound == null || !rebound.collision)
		rebound = ball.collidesWith(paddle);

	/* check static block collisions */
	if (rebound == null || !rebound.collision)
		for (var j = 0; j < staticBlocks.length; j++) {

			rebound = this.collidesWith(staticBlocks[j]);
		}

	if (rebound != null && rebound.collision) {
		// rebound the ball

		this.velocity.x *= rebound.velocityChange.x;
		this.velocity.y *= rebound.velocityChange.y;
	} else {
		// check window collision

		if (this.position.x < 0 || this.position.x > width) // hit left or right
			this.velocity.x *= -1;

		if (this.position.y < 0) // hit top
			this.velocity.y *= -1;
		else if (this.position.y > width) // passed bottom
			endGame(false);
	}
};

/**
	* returns Rebound object
	*/
Ball.prototype.collidesWith = function(block) {

	/* ball's next position */
	var nextPosition = createVector(this.position.x + this.velocity.x,
		this.position.y + this.velocity.y);

	/* check y plane */
	var upperYBlock = block.position.y; // block's top-most side
	var upperYBound = block.position.y - this.radius; // block's top-most bound

	var lowerYBlock = block.position.y + block.height; // block's bottom-most side
	var lowerYBound = block.position.y + block.height + this.radius; // block's bottom-most bound

	/* calculate rebound */
	var withinTopBound = (nextPosition.y >= upperYBound) && (nextPosition.y <= upperYBlock);
	var withinBottomBound = (nextPosition.y <= lowerYBound) && (nextPosition.y >= lowerYBlock);

	/* collides on Y */
	var yBound = (nextPosition.y >= upperYBound) && (nextPosition.y <= lowerYBound);

	/* check x plane */
	var leftXBlock = block.position.x; // block's left-most side
	var leftXBound = block.position.x - this.radius; // block's left-most bound

	var rightXBlock = block.position.x + block.width; // block's right-most side
	var rightXBound = block.position.x + block.width + this.radius; // block's right-most bound

	/* calculate rebound */
	var withinLeftBound = (nextPosition.x >= leftXBound) && (nextPosition.x <= leftXBlock);
	var withinRightBound = (nextPosition.x <= rightXBound) && (nextPosition.x >= rightXBlock);

	/* collides on X */
	var xBound = (nextPosition.x >= leftXBound) && (nextPosition.x <= rightXBound);

	var xChange = 1; // rebound X
	var yChange = 1; // rebound Y

	var collided = (xBound && yBound);

	if (collided) {
		/* collision! */

		xChange = (withinLeftBound || withinRightBound) ? -1 : 1;
		yChange = (withinTopBound || withinBottomBound) ? -1 : 1;

		this.velocity.mult(1.0175); // speed up
	}

	return {
		collision: collided,
		velocityChange: createVector(xChange, yChange)
	};
};
