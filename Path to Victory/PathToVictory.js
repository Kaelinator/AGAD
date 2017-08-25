
var gridSize = 5;

var grid = [];
var path = []; // correct path
var steps = []; // player's path

var tileSize; // size of each Tile

var animating; // false = playing
var animationTime; // frame in the animation for the steps
var stepTime; // how long each step is shown for

var level;

var gameOver; // synchonized flag to end the game
var newLevel; // synchonized flag to create new level

function setup() {

  createCanvas(window.innerWidth, window.innerHeight);

	/* initialize values */
  level = 1;
  stepTime = 60;

	newLevel = false;
	gameOver = false;

  newPath();

  textAlign(CENTER);
  textSize(tileSize * 0.8);
}

function draw() {

  background(51);

	drawGrid();
	drawLevel();

	pollTasks();
}

function pollTasks() {

	if (animating) {

		handleAnimation();
	}

	if (newLevel) {

		nextLevel();
	}

	if (gameOver) {

		endGame();
	}
}

/**
 * handles user input
 * handles correctness & levels
 */
function mousePressed() {


  if (animating) {
		// don't allow input during animation
		return;
	}

  var clickedTile = getTile(mouseX, mouseY);

  if (clickedTile == null)
    return;

  steps.push(clickedTile); // add to inputs

  grid[clickedTile.x][clickedTile.y].lit = true; // display

	/* check for correctness */
	if (!onPath(path, steps)) {

		gameOver = true;
	}

	/* check for a new level */
	if (steps.length == path.length) {

    newLevel = true;
	}
}

/**
 * draws the grid
 */
function drawGrid() {

  strokeWeight(4);
  stroke(255);

  for (var x = 0; x < gridSize; x++) {
    for (var y = 0; y < gridSize; y++) {

      grid[x][y].draw();
    }
  }
}

/**
 * draws the current level
 */
function drawLevel() {

	noStroke();
	fill("#FF0000");
	text("Level " + level, width / 2, tileSize);
}

/**
 * animates the path to the screen
 * meant to be called every frame with the state of 0
 */
function handleAnimation() {

  animationTime++;

  var route = Math.floor(animationTime / stepTime); // what step we're on

  if (route >= path.length) {
		// done animating

    animating = false; // now playing
    resetGrid();
    return;
  }

	/* display the next step */
  var tile = path[route];
  grid[tile.x][tile.y].lit = true;
}

/**
 * returns an initialized grid
 */
function resetGrid() {

  grid = [];

  tileSize = Math.min(width / gridSize, height / gridSize);

	/* creates 2D array */
  for (var x = 0; x < gridSize; x++) {
    var col = [];
    for (var y = 0; y < gridSize; y++) {

      col.push(new Tile(x, y, false));
    }
    grid.push(col);
  }

};

/**
 * sets up for a new level
 */
function nextLevel() {

  level++;
  gridSize++;
  newPath();
  stepTime /= 1.25;
  resetGrid();
	newLevel = false;
}

/**
 * ends the game, draws game over message
 */
function endGame() {

	noLoop();
  noStroke();
  fill("#FF0000");
  text("Game Over!", width / 2, height / 2);
	gameOver = false;
}
