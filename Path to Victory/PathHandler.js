
/**
 * returns a randomly generated path
 * from the bottom left Tile
 * to the top row of Tiles
 */
function generatePath(gridSize) {

	var path = []; // returning path

	path.push(new Tile(0, gridSize - 1, true)); // bottom left tile begins the path

  while (path[path.length - 1].y != 0) {
		// as long as the path hasn't reached the top of the screen

    var pool = []; // available Tiles to push to the path
    var previous = path[path.length - 1]; // previous Tile

		/* find potential next steps */
		var relativeTiles = getRelativeTiles(previous);

		/* rule out incompetent Tiles */
		for (var i = 0; i < relativeTiles.length; i++) {

			if (validateTile(relativeTiles[i], path, gridSize)) {

				pool.push(relativeTiles[i]);
			}
		}

    path.push(random(pool)); // choose a tile
  }

	return path;
}

/**
 * validates Tiles -
 * Tiles must not be off the grid,
 * and must not be already in the array
 */
function validateTile(tile, path, gridSize) {

	if ((tile.x >= 0 && tile.x < gridSize) &&
			(tile.y >= 0 && tile.y < gridSize)) {
			// tile is in-bounds

			/* tile is not already in the path */
			return !arrIncludes(path, tile);
		}

	return false;
}

/**
 * returns Tiles relative to passed Tile
 */
function getRelativeTiles(tile) {

	var west = new Tile(tile.x - 1, tile.y, true);
	var east = new Tile(tile.x + 1, tile.y, true);
	var north = new Tile(tile.x, tile.y - 1, true);

	return [west, east, north];
}

/**
 * returns whether the passed tile
 * is included within passed pool
 */
function arrIncludes(pool, tile) {

  var t = JSON.stringify(tile);
  for (var i = 0; i < pool.length; i++)
    if (JSON.stringify(pool[i]) === t) // all properties match
      return true;

  return false;
}

/**
 * returns whether the user's input (steps) matches
 * the passed path thus far
 */
function onPath(path, steps) {

  for (var i = 0; i < steps.length; i++)
    if (path[i].x != steps[i].x || path[i].y != steps[i].y)
      return false;

  return true;
}

/**
 * initialized a new path
 */
function newPath() {

  resetGrid();
  animating = true; // animating
  animationTime = 0;
  path = generatePath(gridSize);
  steps = [];
}
