
var bugs = [];

var score;
var totalClicks; // how many times the user has clicked (for accuracy)
var playing; // aids with asychronous endGame() function

var speed; // speed at which the bugs travel
var bugChance; // chance of a new bug being pushed

function setup() {

  createCanvas(400, 600);

  score = 0;
	totalClicks = 0;
  playing = true;

	speed = 3;
	bugChance = 0.4;

  textSize(30);
}

function draw() {

  background(51);

	handleBugs();
	attemptNewBug(frameCount);

	handleDifficulty(frameCount, score);

	drawScore();
	gameOver(playing);
}

/**
 * handles user input
 * squashes bugs
 */
function mousePressed() {

  for (var i = 0; i < bugs.length; i++) {

		// update bug's state
    bugs[i].squashed = bugs[i].squashedBy(mouseX, mouseY);

		// if the bug is good, end the game
    if (bugs[i].squashed && bugs[i].type)
			endGame();
  }

	totalClicks++;
}

/**
 * updates and draws bugs
 * handles off-screen bugs
 * handles bugs array
 */
function handleBugs() {

	for (var i = bugs.length - 1; i >= 0; i--) {

		/* update & draw */
    bugs[i].update();
    bugs[i].draw();

    if (bugs[i].position.y > height && !bugs[i].type) {
			// if the bug is off the screen and it's a bad bug

			endGame();
		}

    if (bugs[i].squashed) {
			// remove from bugs array

      bugs.splice(i, 1);
      score++;
    }
  }
}

/**
 * attempts to push a new bug
 */
function attemptNewBug(frame) {

	if (frame % 60 === 0) { // every second

		if (random() < bugChance) { // probability of a new bug

			var x = random(width / 2) + width / 4; // only in the middle
			var type = (random() > 0.8); // good or bad bug
			bugs.push(new Insect(x, type));
		}
	}
}

/**
 * variables pertaining to difficulty
 * is set based upon frame and score
 */
function handleDifficulty(frame, score) {

	if (frame % 60 === 0) {
		// update once every second

		bugChance = map(score, 0, 500, 0.4, 0.999);
		speed = map(score, 0, 500, 3, 30);
	}
}

/**
 * draws game over message
 */
function gameOver(playing) {

	if (!playing) {
		// only if the game has ended

		fill(255);
		noStroke();
		textSize(60);
		textAlign(CENTER);


		text("Game Over!", width / 2, height / 2);

		// prevent division by zero
		totalClicks = (totalClicks === 0) ? 1 : totalClicks;

		var accuracy = Math.round(score / totalClicks * 100);
		textSize(30);
		text("Squash accuracy: " + accuracy + "%",
			width / 2, height / 2 + 70);
		textAlign(LEFT);
		textSize(30);
  }
}

/**
 * draws the score
 */
function drawScore() {

  /* draw score */
  fill(255);
  noStroke();
  text(score, 10, 40);
}

/**
 * stops the loop, triggers game over
 */
function endGame() {

  playing = false;
  noLoop();
}
