function Tile(x, y, o) {

  this.x = x;
  this.y = y;

  this.occupied = o;
}

/**
 * return whether a tile may move to another tile
 */
Tile.prototype.mayMove = function(x, y) {

  if (!this.occupied) // empty tiles can't move
    return true;

  var dX = this.x + x; // destination X
  var dY = this.y + y; // destination Y

  if (typeof grid[dX] == 'undefined' ||
		typeof grid[dX][dY] == 'undefined') // if the destination is out of bound
    return false; // restrict movement

  return ((dX >= 0 && dX < WIDTH) && // double check destination is in bounds
		(dY >= 0 && dY < HEIGHT) && !grid[dX][dY].occupied); // be sure destination is not already occupied
};

/**
 * execute a movement
 */
Tile.prototype.move = function(x, y) {

  this.x += x;
  this.y += y;
};

Tile.prototype.draw = function() {

  if (!this.occupied)
    return;

  stroke(0);
  strokeWeight(1);
  fill(255);
  rect(this.x * DIMENSION, this.y * DIMENSION, DIMENSION, DIMENSION);
};
