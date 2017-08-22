
var blocks = []; // keep track of falling Blocks
var totalClicks; // calculate accuracy
var score;

function setup() {

  createCanvas(300, 500);
  textAlign(CENTER);

  score = 0;
	totalClicks = 0;
}

function draw() {
  background(51);

  rain();

  handleBlocks();

  drawHUD();
}

/**
 * handle user input
 */
function mousePressed() {

  for (var i = blocks.length - 1; i >= 0; i--) {
		// loop through all blocks

    if (blocks[i].isClicked(mouseX, mouseY)) {
			// check for click

      blocks.splice(i, 1);
      score++;
    }
  }

	totalClicks++;
}

function handleBlocks() {

	for (var i = blocks.length - 1; i >= 0; i--) {
		// loop through all blocks

    if (blocks[i].onScreen()) {
			// only if the block is on-screen

			/* draw & update */
      blocks[i].update();
      blocks[i].draw();
    } else {

			/* a block was missed */
      endGame();
    }
  }
}

/**
 * attempts to push a new block to the array
 */
function rain() {

	if (frameCount % 10 === 0) { // every 1/6th of a second
    if (random() < map(score, 0, 250, 0.25, 0.99)) { // dictate the chance
			// push a block

			/* build a new block */
			var x = random(width / 2) + width / 4;
			var velocity = random(3) + 3;
			var size = random(40) + 30;

      blocks.push(new Block(x, velocity, size, randomColor()));
    }
  }
}

/**
 * draws the score & accuracy
 */
function drawHUD() {

	/* draw score */
	textSize(50);
	noStroke();
	text(score, width / 2, 50);

	/* draw accuracy */
	textSize(25);
	var accuracy = (score / +((totalClicks === 0) ? 1 : totalClicks));
	text(Math.round(accuracy * 100) + "%", width / 2, 100);
}

/**
 * ends the loop, draws game over message
 */
function endGame() {

  noLoop();

  fill(255);
  noStroke();

  textSize(50);
  text("Game Over!", width / 2, height / 2);
}

/**
 * returns a random color
 */
function randomColor() {
  return color(random(255), random(255), random(255));
}
