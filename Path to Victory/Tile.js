function Tile(x, y, lit) {

  this.x = x;
  this.y = y;

  this.lit = lit;
}

/**
 * draws the Tile
 */
Tile.prototype.draw = function() {

	fill((this.lit) ? 200 : 51);

	rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
};

/**
 * returns whether or not passed x & y
 * land within this Tile
 */
Tile.prototype.clickedBy = function(x, y) {

	/* calculate bounds */
  var leftX = this.x * tileSize;
  var rightX = leftX + tileSize;

  var topY = this.y * tileSize;
  var bottomY = topY + tileSize;

  return !(x < leftX || x > rightX || y < topY || y > bottomY);
};

/**
 * returns clicked tile
 */
function getTile(mouseX, mouseY) {

	for (var x = 0; x < gridSize; x++) {

		for (var y = 0; y < gridSize; y++) {
			// loop through all tiles

			if (grid[x][y].clickedBy(mouseX, mouseY)) {

				return grid[x][y];
			}
		}
	}

	return null;
}
