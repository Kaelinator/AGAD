
const SIZE = 175; // size of Tiles

var pattern = []; // order of Tiles
var tiles = [];
var input = []; // order of user's input Tiles

var time;
var dIndex; // index of Tile which is being focused on during demonstration

var score; // "level"

var demonstrating; // whether or not Simon is demonstrating
var playing; // whether the game is still going or over

function setup() {
  createCanvas(500, 500);

  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {


      var col = randomTileColor(i, j);
      var brightCol = brightenCol(col);

			var x = i * SIZE + SIZE;
			var y = j * SIZE + SIZE;

      tiles.push(new Tile(x, y, SIZE, col, brightCol));
    }
  }

  playing = true;
  score = -1;
  newTile();

  textAlign(CENTER);
}

function draw() {
  background(51);

  handleTiles();
	handleDemonstration();

  drawScore();

  if (!playing)
		drawGameEnd();
}

/**
 * handle user input
 * checks for mistakes
 * handles new Tile
 */
function mousePressed() {

  if (demonstrating) // user may not click during demonstration
    return;

  var t = getTile(tiles, mouseX, mouseY); // find the tile clicked

  if (t != -1) // if it exists, push it to the input array
    input.push(t);

	/* check for mistake */
  for (var i = 0; i < input.length; i++) {
    if (input[i] != pattern[i])
      endGame();
  }

	/* push a new tile */
  if (input.length === pattern.length) // if user reached the end of pattern
    newTile();
}

/**
 * selects random tile to push to the pattern array
 * resets user input
 * handles states, time, dIndex, and score
 */
function newTile() {

  pattern.push(Math.floor(random() * tiles.length));

	demonstrating = true; // set state

	var negativeInput = (-input[input.length - 1]) ? -input[input.length - 1] : 1; // find 1's complement
	dIndex = negativeInput - 1; // set demonstration to 2's complement index of last input
	time = 0; // reset time

	input = []; // reset user input

	score++;
}

/**
 * ends the game
 */
function endGame() {

  playing = false;
  noLoop();
}

/**
 * draws game over message
 */
function drawGameEnd() {

  textSize(50);
  fill(255);
  text("Game Over!", width / 2, height - 20);
}

/**
 * draws score at the bottom center
 */
function drawScore() {

	textSize(30);
	fill(255);
	text(score, width / 2, height - 50);
}

/**
 * handles drawing of tiles
 */
function handleTiles() {

	for (var i = 0; i < tiles.length; i++) {

    if (demonstrating && dIndex > -1) {

      tiles[i].draw(i === pattern[dIndex]); // draw the dIndex Tile bigger
    } else if (demonstrating) {

			tiles[i].draw(i === (-dIndex - 1)); // draw
		} else {

      tiles[i].draw(i === input[input.length - 1]); // draw latest selected Tile bigger
    }
  }
}

/**
 * tracks time
 * handles dIndex and state
 */
function handleDemonstration() {

	time++;

  if (demonstrating && time % 60 === 0) { // demonstrate next Tile

		if (dIndex > -1) {

			dIndex++; // continue demonstration
		} else if (dIndex === (-tiles.length - 1)) {

			dIndex = 0; // begin demonstration
		} else {

			dIndex = (-tiles.length - 1); // pause in between last input and beggining demonstration
		}
	}

  if (dIndex >= pattern.length) {
		// entire pattern has been demonstrated

    demonstrating = false;
  }
}

/**
 * returns random color slightly darkened
 */
function randomTileColor(i, j) {

	var r = (i % 2 === 0) ? 0 : random(155) + 50;
	var g = (j % 2 === 0) ? 0 : random(155) + 50;
	var b = random(155) + 50;

	return color(r, g, b);
}

/**
 * returns brightened version of col
 */
function brightenCol(col) {

	return color(red(col) + 50, green(col) + 50, blue(col) + 50);
}
