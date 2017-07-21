function Tile(x, y, lit) {

  this.x = x;
  this.y = y;

  this.lit = lit;
}

Tile.prototype.clickedBy = function(x, y) {

  var x1 = this.x * size;
  var x2 = x1 + size;

  var y1 = this.y * size;
  var y2 = y1 + size;

  return !(x < x1 || x > x2 || y < y1 || y > y2);
};
