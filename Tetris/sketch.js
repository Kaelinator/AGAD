
const WIDTH = 10;
const HEIGHT = 20;

const DIMENSION = 20;

var focusBlock; // falling block
var score;
var grid; // screen

function setup() {

  createCanvas(WIDTH * DIMENSION, HEIGHT * DIMENSION);

  grid = initGrid();
  score = 0;

  pushBlock();
  frameRate(6);

  textAlign(CENTER);
}

function draw() {
  background(51);

	drawAll();

	handleFocusBlock();
}

/**
 * draws grid and score
 */
function drawAll() {

	/* draw grid */
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      grid[i][j].draw();
    }
  }

	/* draw score */
  textSize(20);
  fill("#FF0000");
  text(score, width / 2, height);
}

/**
 * updates focus Block
 * increments score
 * check if the game is over
 */
function handleFocusBlock() {

	if (frameCount % 2 === 0) { // every other frame

		focusBlock.update(true); // move & draw
		score++;
	}

	focusBlock.update(false); // don't move, but draw

	if (focusBlock.isGrounded()) { // block may no longer move

		if (focusBlock.yOffset < 1) { // too high
			/* end game */

			noLoop();
			fill("#FF0000");
			noStroke();
			textSize(40);
			text("You lose!", width / 2, height / 2);
			textSize(25);
			text("Press f5 to restart!", width / 2, height / 2 + 20);
		}

		focusBlock.paint(true); // draw and move
		checkCompleted();
		pushBlock();
	}
}

/**
 * creates new, random, falling block
 */
function pushBlock() {

  focusBlock = new Block(0, 0, random(SHAPES));
}

/**
 * delete row [index]
 * shift all above rows down by 1
 */
function shiftRows(index) {

	// swap rows with columns, e.g.;
	// X X X
	// X X X 		 X X X X X
	// X X X --> X X X X X
	// X X X		 X X X X X
	// X X X
  var rows = grid[0].map(function(col, i) {
    return grid.map(function(row) {
      return row[i];
    });
  });

	/* loop through all rows, from index to top */
  for (var i = index; i > 0; i--) {
    rows[i] = rows[i-1]; 	// exchange current row for the row above
    for (var j = 0; j < WIDTH; j++) {
      rows[i][j].y++; 		// update the y values
    }
  }
  rows[0] = newRow(0); // push a new row

	// set the grid back, swapping columns with rows
	// 							 X X X
	// X X X X X		 X X X
	// X X X X X --> X X X
	// X X X X X		 X X X
	//							 X X X
  grid = rows[0].map(function(col, i) {
    return rows.map(function(row) {
      return row[i];
    });
  });

  checkCompleted(); // if there is another complete row
}

/**
 * creates a new row at index
 */
function newRow(index) {

  var row = []; // returning row

	// loop through row
  for (var i = 0; i < WIDTH; i++) {

    row.push(new Tile(i, index, false));
  }

  return row;
}

/**
 * check for completed rows
 */
function checkCompleted() {

	// swap rows with columns, e.g.;
	// X X X
	// X X X 		 X X X X X
	// X X X --> X X X X X
	// X X X		 X X X X X
	// X X X
  var rows = grid[0].map(function(col, i) {

    return grid.map(function(row) {
      return row[i];
    });
  });

	// loop through each row
  y: for (var i = 0; i < HEIGHT; i++) {
    x: for (var j = 0; j < WIDTH; j++) {
      if (!rows[i][j].occupied) // if any tile is unoccupied
        continue y; // skip to the next row
    }
		// all tiles in row are occupied

    shiftRows(i); // shift the rows
    break; // don't loop anymore
  }
}

/**
 * handle input
 */
function keyPressed() {

  switch (keyCode) {

    case LEFT_ARROW:
      focusBlock.move(-1, 0);
      break;

    case RIGHT_ARROW:
      focusBlock.move(1, 0);
      break;

    case UP_ARROW:
      focusBlock.rotate(1);
      break;
  }

}

/**
 * create empty grid
 */
function initGrid() {

  var tileGrid = [];

  for (var i = 0; i < WIDTH; i++) {
    tileGrid[i] = []; // assembling 2D array
    for (var j = 0; j < HEIGHT; j++) {

      tileGrid[i][j] = new Tile(i, j, false); // empty tile
    }
  }

  return tileGrid;
}
