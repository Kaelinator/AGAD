
var SHAPES = ["I", "L", "J", "Z", "S", "T", "O"];

function Block(xOffset, yOffset, shape) {

  this.shape = shape; // type of block
  this.size = -1; // dimension of shape
  this.tiles = this.createTiles(); // initialize block

	/* offsets from the top left */
  this.xOffset = xOffset;
  this.yOffset = yOffset;

  this.initOffset();
}

/**
 * move tile if (move == true)
 * paints tiles
 */
Block.prototype.update = function(move) {

  if (!this.size)
    this.tiles = createTiles();

  if (move)
    this.move(0, 1);

  this.paint(true);
};

/**
 * draws all tiles which make up the Block
 */
Block.prototype.paint = function(paint) {

  for (var i = 0; i < this.tiles.length; i++) { // loop through tiles

		/* convert to cartesian */
    var gridX = (i % this.size) + this.xOffset;
    var gridY = Math.floor(i / this.size) + this.yOffset;

    if (this.tiles[i].occupied &&
      typeof grid[gridX] != 'undefined' &&
      typeof grid[gridX][gridY] != 'undefined') {

				grid[gridX][gridY].occupied = paint; // watch out for edge cases
				grid[gridX][gridY].draw();
			}

	}
};

/**
 * return if the player is able to control the piece
 */
Block.prototype.isGrounded = function() {

  this.paint(false); // draw, but don't move

  /* check boundaries */
  for (var i = 0; i < this.tiles.length; i++)
    if (!this.tiles[i].mayMove(0, 1)) // only if they may move
      return true;

  return false;
};

/**
 * rotates the piece
 */
Block.prototype.rotate = function(direction) {

  this.paint(false); // draw, but don't move

  var rotated = []; // returning array

  var loops = (direction > 0) ? 1 : 3; // UP_ARROW v.s. DOWN_ARROW

  var index = 0;
  for (var i = 0; i < loops; i++)
    for (var j = 0; j < this.tiles.length; j++) { // loop through tiles

      if (j % 4 === 0) // matches the pattern for rotating
        index += 3;
      else
        index += 4;

      var tile = this.tiles[index % this.tiles.length]; // loop's tile

			/* calculate rotate based upon offset */
      var actualX = ((j % this.size) + this.xOffset);
      var actualY = (Math.floor(j / this.size) + this.yOffset);

			/* distance to move required by rotate */
      var deltaX = tile.x - actualX;
      var deltaY = tile.y - actualY;

      /* check boundaries */
      if (!tile.mayMove(deltaX, deltaY))
        return true;

      rotated[j] = new Tile(actualX, actualY, tile.occupied);
    }

  this.tiles = rotated; // set tiles array
};

/**
 * attempts to move a block
 */
Block.prototype.move = function(x, y) {

  this.paint(false);

  /* check boundaries */
  for (var i = 0; i < this.tiles.length; i++)
    if (!this.tiles[i].mayMove(x, y))
      return;

  /* move tiles */
  for (var j = 0; j < this.tiles.length; j++)
    this.tiles[j].move(x, y);

	/* update offsets */
  this.xOffset += x;
  this.yOffset += y;
};

/**
 * moves block initially to align with offset
 */
Block.prototype.initOffset = function() {
  this.move(this.xOffset, this.yOffset);
};

/**
 * initializes tiles array to fit a shape
 */
Block.prototype.createTiles = function() {

  var t = []; // returning array

  switch (this.shape) {

    case "I":
      t = [
        0, 1, 0, 0,
        0, 1, 0, 0,
        0, 1, 0, 0,
        0, 1, 0, 0,
      ];
      break;

    case "L":
      t =  [
        0, 0, 0, 0,
        0, 1, 0, 0,
        0, 1, 0, 0,
        0, 1, 1, 0,
      ];
      break;

    case "J":
      t =  [
        0, 0, 0, 0,
        0, 0, 1, 0,
        0, 0, 1, 0,
        0, 1, 1, 0,
      ];
      break;

    case "Z":
      t =  [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 1, 1, 0,
        0, 0, 1, 1,
      ];
      break;

    case "S":
      t =  [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 1, 1,
        0, 1, 1, 0,
      ];
      break;

    case "T":
      t =  [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 1, 0,
        0, 1, 1, 1,
      ];
      break;

    case "O":
      t =  [
        0, 0, 0, 0,
        0, 1, 1, 0,
        0, 1, 1, 0,
        0, 0, 0, 0,
      ];
      break;

  }

  this.size = Math.sqrt(t.length); // find side length

  for (var i = 0; i < t.length; i++) {

		var xOff = (i % this.size);
		var yOff = Math.floor(i / this.size);
		var lit = (t[i] != 0);

		t[i] = new Tile(xOff, yOff, lit); // push new tile
	}

  return t;
};
