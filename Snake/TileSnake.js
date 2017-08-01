function TileSnake(x, y) {

	this.direction = createVector(-1, 0); // traveling left

	this.body = [createVector(x, y)]; // keep track of all tiles

	this.alive = true;
}

/**
 * updates position
 */
TileSnake.prototype.update = function(food) {

	/* 'move' the head */
	var nextTile = this.body[0].copy().add(this.direction); // new tile at the head

  this.body.unshift(nextTile); // push head to the front of the body

	/* test if the snake runs into itself */
	for (var i = 0; i < this.body.length; i++) {
		if (i != 0 && checkCollision(this.body[0], this.body[i])) {
			/* dead! */

			this.alive = false;
		}
	}

	/* wrap around edges */
	if (this.body[0].x > wOs) {

		this.body[0].x = 0;
	} else if (this.body[0].x < 0) {

		this.body[0].x = wOs;
	} else if (this.body[0].y > hOs) {

		this.body[0].y = 0;
	} else if (this.body[0].y < 0) {

		this.body[0].y = hOs;
	}

	if (this.body[0].x == food.x && this.body[0].y == food.y) { // snake head was at the food
    /* snake ate food */

    return true; // "grow" (essentially don't delete the last tile)
  } else {

    this.body.splice(this.body.length - 1, 1); // delete last tile
		return false;
  }
};

TileSnake.prototype.draw = function() {

	fill(255);
	for (var j = 0; j < this.body.length; j++) {

		rect(this.body[j].x * SCL, this.body[j].y * SCL, SCL, SCL);
	}
};

/**
 * change the snake's direction
 */
TileSnake.prototype.direct = function(direction) {

	// do not allow 180s
	if (direction.x != -this.direction.x &&	direction.y != -this.direction.y)
		this.direction = direction;
};

/**
 * tests to see if tile1 & tile2
 * occupy the same tile
 */
function checkCollision(tile1, tile2) {

	return (tile1.x === tile2.x) && (tile1.y === tile2.y);
}

// if (snake[0].x > wOs || snake[0].x < 0 ||
//     snake[0].y > hOs ||  snake[0].y < 0) {
//   gameOver();
// }
