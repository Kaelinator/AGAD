
function Tile(x, y, o) {

  this.x = x;
  this.y = y;

  this.occupied = o;
}

Tile.prototype.mayMove = function(x, y) {

  if (!this.occupied)
    return true;

  var dX = this.x + x; // destination X
  var dY = this.y + y; // destination Y

  if (typeof grid[dX] == 'undefined' || typeof grid[dX][dY] == 'undefined')
    return false;

  return (dX >= 0 && dX < WIDTH) && (dY >= 0 && dY < HEIGHT) && !grid[dX][dY].occupied;
};

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
