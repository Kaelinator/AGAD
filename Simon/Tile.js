function Tile(x, y, size, col, brightCol) {

  this.x = x;
  this.y = y;

  this.size = size;

  this.col = col; // color
  this.brightCol = brightCol; // bright color
}

/**
 * draws Tile
 * lit = false: small & dark
 * lit = true: big & bright
 */
Tile.prototype.draw = function(lit) {

  noStroke();
  fill((lit) ? this.brightCol : this.col);

  ellipse(this.x, this.y, (lit) ? this.size * 1.2 : this.size);
};

/**
 * returns whether x, y is within Tile's bounds
 */
Tile.prototype.inBounds = function(x, y) {

  var d = dist(x, y, this.x, this.y);

  return (d < this.size / 2);
};

/**
 * returns index of clicked Tile from within tiles array
 * returns -1 if no Tile was clicked
 */
function getTile(tiles, x, y) {

  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].inBounds(x, y)) {
      return i;
    }
  }

  return -1;
}
