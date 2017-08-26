function Row(y, cellCount) {

  this.velocity = 1; // X-velocity
  this.y = y;

  this.cellCount = cellCount; // how many cells are avaliable

  this.cells = [];

  this.dynamic = true; // false = static

  this.initializeRow(cellCount);
}

Row.prototype.update = function() {

  if (this.velocity > 0) {
    /* moving to the right */

    for (var x = WIDTH - 1; x >= 0; x--) {

      if (!this.cells[x]) // no need to update
				continue;

			if (x < WIDTH - 1) {

				this.cells[x] = false;
				this.cells[x + 1] = true;
			} else {

				this.reverse();
				break;
			}
    }
  } else {
    /* moving to the left */

    for (var x = 0; x < WIDTH; x++) {

      if (!this.cells[x]) // no need to update
				continue;

			if (x > 0) {

				this.cells[x] = false;
				this.cells[x - 1] = true;
			} else {

				this.reverse();
				break;
			}
    }
  }
};

/**
 * draws each cell
 */
Row.prototype.draw = function(size) {

  for (var x = 0; x < WIDTH; x++) {

    if (this.cells[x]) // if the cell is occupied
      rect(x * size, height - ((this.y + 1) * size), size, size);
  }
};

/**
 * freezes the Row
 * returns how many cells have a base
 */
Row.prototype.stop = function(previousRow) {

  if (previousRow) {

    var cellCount = 0; // remaining cells
    for (var x = 0; x < WIDTH; x++) {

      if (this.cells[x] && previousRow.cells[x]) {
				// cells have a base on which to reside

        this.cells[x] = true;
        cellCount++;
      } else {
				// no base, no cell

        this.cells[x] = false;
      }
    }

    this.dynamic = false;
    return cellCount;
  } else {
		// first row to be placed

    this.dynamic = false;
    return this.cellCount;
  }

};

/**
 * bounces the Row into reverse
 */
Row.prototype.reverse = function() {

  this.velocity *= -1;
  this.update();
};

/**
 * pushes the correct number of cells to the Row
 */
Row.prototype.initializeRow = function(c) {

  for (var x = 0; x < WIDTH; x++) {

    this.cells.push((x < c));
  }
};
