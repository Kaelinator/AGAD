
const GRAVITY = 0.3;
const SPEED = 1;

var bird; // player
var score;

var pipes = [];

function setup() {

  createCanvas(500, 500);
  bird = new Bird(50, height / 2, 15); // initialize bird on the left, in the middle

  score = 0;

  textAlign(CENTER);
  textSize(40);
}

function draw() {

  background(51);

	/* handle bird */
  bird.update();
  bird.draw();

	/* push a new pipe every 120 frames */
  if (frameCount % 120 === 0) {
    pipes.push(new Pipe(width, random(height / 2) + height / 4, 200, color(score % 255, random(255), random(255))));
  }

	handlePipes();

	/* draw score */
  noStroke();
  text(score, 50, height - 20);
}

/**
 * updates, draws, and checks collision for pipes
 */
function handlePipes() {

	for (var i = 0; i < pipes.length; i++) {

		pipes[i].update();
		pipes[i].draw();

		if (bird.collidesWith(pipes[i])) { // if the player hits a pipe

			endGame();
		} else if (!pipes[i].passed) { // if we haven't passed the pipe yet

			if (pipes[i].isPassed(bird.x)) // check to see if we pass it
				score++;
		}
	}
}

/**
 * handle user input
 */
function mousePressed() {

  bird.hop(-8);
}

/**
 * ends the game, displays message
 */
function endGame() {

	endGame();
	noLoop();
	noStroke();
	textSize(50);
	text("You lose!", width / 2, height / 2);
	textSize(40);
	text("Press f5 to restart!", width / 2, height / 2 + 30);
}
