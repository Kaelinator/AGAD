
var SHAPES = ["I", "L", "J", "Z", "S", "T", "O"];

function Block(xOff, yOff, shape) {

  this.shape = shape;
  this.size = -1;
  this.tiles = this.createTiles();

  this.xOff = xOff;
  this.yOff = yOff;
  this.initOffset();
}

Block.prototype.update = function(move) {

  if (!this.size)
    this.tiles = createTiles();

  if (move)
    this.move(0, 1);

  this.paint(true);
};

Block.prototype.paint = function(paint) {

  for (var i = 0; i < this.tiles.length; i++) {

    var gridX = (i % this.size) + this.xOff;
    var gridY = Math.floor(i / this.size) + this.yOff;

    if (this.tiles[i].occupied &&
      typeof grid[gridX] != 'undefined' &&
      typeof grid[gridX][gridY] != 'undefined')
      grid[gridX][gridY].occupied = paint;
  }
};

Block.prototype.isGrounded = function() {

  this.paint(false);

  /* check boundaries */
  for (var i = 0; i < this.tiles.length; i++)
    if (!this.tiles[i].mayMove(0, 1))
      return true;

  return false;
};

Block.prototype.rotate = function(dir) {

  this.paint(false);

  var rotated = [];

  var loops = (dir > 0) ? 1 : 3;

  var index = 0;
  for (var i = 0; i < loops; i++)
    for (var j = 0; j < this.tiles.length; j++) {

      if (j % 4 === 0)
        index += 3;
        else
        index += 4;

      var tile = this.tiles[index % this.tiles.length];

      var nX = ((j % this.size) + this.xOff);
      var nY = (Math.floor(j / this.size) + this.yOff);

      var dX = tile.x - nX; // Delta X
      var dY = tile.y - nY; // Delta Y

      /* check boundaries */
      if (!tile.mayMove(dX, dY))
        return true;

      rotated[j] = new Tile(nX, nY, tile.occupied);
    }

  this.tiles = rotated;
};

Block.prototype.move = function(x, y) {

  this.paint(false);

  /* check boundaries */
  for (var i = 0; i < this.tiles.length; i++)
    if (!this.tiles[i].mayMove(x, y))
      return;

  /* move tiles */
  for (var j = 0; j < this.tiles.length; j++)
    this.tiles[j].move(x, y);

  this.xOff += x;
  this.yOff += y;
};

Block.prototype.initOffset = function() {
  this.move(this.xOff, this.yOff);
};

Block.prototype.createTiles = function() {

  var t = [];

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

  this.size = Math.sqrt(t.length);

  for (var i = 0; i < t.length; i++)
    t[i] = new Tile(
      (i % this.size),
      Math.floor(i / this.size),
      (t[i] === 0) ? false : true
    );

  return t;
};
