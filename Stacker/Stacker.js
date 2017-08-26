
const DIMENSIONS = { width: 540, height: 720 };

const WIDTH = 7; // how many cells can fit
const STARTING_WIDTH = 3; // base cell count

/* highest stack */
const MID_HEIGHT = Math.floor(DIMENSIONS.height / (DIMENSIONS.width / WIDTH) / 2);

var grid = []; // the stack

var score;
var playing; // false = game over

function setup() {

  createCanvas(DIMENSIONS.width, DIMENSIONS.height);

	/* intialize values */
	initializeGrid();
	score = 0;
	playing = true;

	frameRate(5); // speed of the game
  textAlign(CENTER);
  textSize(50);
}

function draw() {

  background(51);

  handleGrid();

	drawScore();

  drawGameOver();
}

/**
 * handles user input
 */
function keyPressed() {

  if (keyCode != 32)
		return;

  var y = grid.length - 1; // height of the stack
  var cellCount = grid[y].stop(grid[y - 1]); // how many cells are still stackable

  if (cellCount < 1) {
		// no more stackable cells

    endGame();
    return;
  }

  frameRate(5 + score); // increase difficulty

  if (++y > MID_HEIGHT) {
		// too high to see new stacks

    for (var i = 0; i < y; i++) {
			// translate stack down

      grid[i].y--;
    }
  }

  score = y;

  grid.push(new Row((y > MID_HEIGHT) ? MID_HEIGHT : y, cellCount)); // push new Row
}

/**
 * updates & draws Rows
 */
function handleGrid() {

  var size = width / WIDTH; // size of each cell

  fill("#FF0000");
  stroke(255);
  strokeWeight(3);

  for (var y = 0; y < grid.length; y++) {
		// loop through Rows

    if (grid[y].dynamic) {
			// only update if the Row is in focus

			grid[y].update();
		}

    grid[y].draw(size);
  }
}

/**
 * draws the score
 */
function drawScore() {

	noStroke();
  fill("#FFFF00");
  text(score, width / 2, 70);
}

/**
 * ends the game
 */
function endGame() {

  noLoop();

  playing = false;
}

/**
 * draws game over message
 */
function drawGameOver() {

	if (!playing) {

    noStroke();
    fill("#FFFF00");
    textSize(90);
    text("Game Over!", width / 2, height / 2);
    textSize(50);
  }
}

/**
 * resets the grid
 */
function initializeGrid() {

  grid = [];

  grid.push(new Row(0, STARTING_WIDTH));
}
