function Tile(x, y, s, c, bC) {

  this.x = x;
  this.y = y;

  this.s = s; // size

  this.c = c; // color
  this.bC = bC; // bright color
}

Tile.prototype.draw = function(lit) {

  noStroke();
  fill((lit) ? this.bC : this.c);

  ellipse(this.x, this.y, (lit) ? this.s * 1.2 : this.s);
};

Tile.prototype.inBounds = function(x, y) {

  var d = dist(x, y, this.x, this.y);

  return (d < this.s / 2);
};

function getTile(tiles, x, y) {

  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].inBounds(x, y)) {
      return i;
    }
  }

  return -1;
}
